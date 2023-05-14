import { Link, useParams } from "react-router-dom";
import "./Visualization.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from "../Components/LoadingSpinner";
import DemandServices from "../Services/DemandServices";


const UserInfo = ({ title, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="user-info info-section">
      
      <p onClick={toggleOpen}><span className="info-label" id="user-title">{title} {isOpen ? '▲' : '▼'}</span></p>
      {isOpen && (
        <>
          <p><span className="info-label">Nom:</span> {user.employee.first_name} {user.employee.last_name}</p>
          <p><span className="info-label">Téléphone:</span> {user.employee.phone}</p>
          <p><span className="info-label">Email:</span> {user.username.email}</p>
          <p><span className="info-label">Grade:</span> {user.employee.grade}</p>
          <p><span className="info-label">Fonction:</span> {user.employee.function}</p>
          <p><span className="info-label">Direction:</span> {user.employee.direction.name}</p>
        </>
      )}
    </section>
  );
};

const Visualization = () => {
  const { demand_id } = useParams();
  const [demand, setDemand] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Actions, setActions] = useState([]);

  useEffect(() => {
    const fetchDemandDetails = async () => {
      try {
        const response = await DemandServices.getDemand(demand_id);
        setDemand(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching demand details:', error);
      }
    };
    const fetchTransitions = async () => {
      try {
        const response = await DemandServices.getTransitions(demand_id);
        setActions(response.data);
      } catch (error) {
        console.error('Error fetching transitions:', error);
      }
    };

    fetchDemandDetails();
    fetchTransitions();
  }, [demand_id]);


  const handleButtonClick = async (action) => {
    try {
      await DemandServices.triggerTransition(demand_id, action);

    } catch (error) {
      console.error(`Error triggering transition '${action}':`, error);
      // Handle the error here, for example show a notification or an alert
      alert(`Failed to trigger transition: ${error.message}`);
    }
  };


  return (
    <div className="Visualization">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
        <div className="actions-container">
          {Actions.map(action => (
            <button 
              key={action.id} 
              className="action-button"
              onClick={() => handleButtonClick(action?.action)}>
              {action.action}
            </button>
          ))}
        </div>
        <div className="details-container">
          <section className="demande-info info-section">
            <h2>Informations Demande:</h2>
            <p><span className="info-label">état:</span>{demand.demand.state.name}</p>
            <UserInfo title="Demandeur" user={demand.demand.creator} />
            <UserInfo title="Assigné" user={demand.demand.assignee} />
            <p><span className="info-label">Date de création:</span> {new Date(demand.demand.created_at).toLocaleString()}</p>
            <p><span className="info-label">Date de dernière modification:</span> {new Date(demand.demand.last_modified).toLocaleString()}</p>
          </section>
          <section className="mission-info info-section">
            <h2>Informations sur la mission:</h2>
            <p><span className="info-label">Type de mission:</span> {demand.mission_type.name}</p>
            <p><span className="info-label">Motif de déplacement:</span> {demand.trip_purpose}</p>
            <p><span className="info-label">Moyen de transport:</span> {demand.use_personal_vehicle ? "véhicule personnel" : "véhicule de service"}</p>
            <p><span className="info-label">Agence:</span> {demand.agency.name}</p>
            <p>
                <span className="info-label">Date et heure départ:</span>{' '}
                {new Date(demand.departing).toLocaleString()}
            </p>
            <p>
                <span className="info-label">Date et heure retour:</span>{' '}
                {new Date(demand.returning).toLocaleString()}
            </p>
            <p><span className="info-label">Adresse de l'agence:</span> {demand.agency.address}</p>
            <p><span className="info-label">Téléphone de l'agence:</span> {demand.agency.phone}</p>
            {demand.observation_manager && <p><span className="info-label">Observation Manager:</span> {demand.observation_manager}</p>}
            {demand.observation_HR && <p><span className="info-label">Observation HR:</span> {demand.observation_HR}</p>}
          </section>
          <Link to="/Dashboard" className="back-button">
            Retour
          </Link>
        </div>
        </>
      )}
    </div>
  );
};

export default Visualization;
