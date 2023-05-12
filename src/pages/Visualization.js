import { Link, useParams } from "react-router-dom";
import "./Visualization.css";
import React, { useState } from 'react';

const mockData = {
  id: 123,
  demand: {
    state: {
      name: "En attente"
    },
    creator: {
      employee: {
        first_name: "John",
        last_name: "Doe",
        phone: "123456789",
        grade: "Grade A",
        function: "Function A",
        direction: {
          name: "Direction A"
        }
      },
      username: "johndoe"
    },
    assignee: {
      employee: {
        first_name: "Jane",
        last_name: "Doe",
        phone: "987654321",
        grade: "Grade B",
        function: "Function B",
        direction: {
          name: "Direction B"
        }
      },
      username: "janedoe"
    },
    created_at: "2022-05-10T14:48:00.000Z",
    last_modified: "2022-05-10T14:48:00.000Z"
  },
  mission_type: {
    name: "Mission type A"
  },
  trip_purpose: "Purpose A",
  use_personal_vehicle: true,
  agency: {
    name: "Agency A",
    address: "123 Street A",
    phone: "1111111111"
  },
  departing: "2022-05-11T14:00:00.000Z",
  returning: "2022-05-12T14:00:00.000Z",
  observation_manager: "Observation manager A",
  observation_HR: "Observation HR A"
};

const UserInfo = ({ title, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="user-info info-section">
      <h4 onClick={toggleOpen}>{title} {isOpen ? '▲' : '▼'}</h4>
      {isOpen && (
        <>
          <p><span className="info-label-1">Nom:</span> {user.employee.first_name} {user.employee.last_name}</p><br />
          <p><span className="info-label-1">Téléphone:</span> {user.employee.phone}</p><br />
          <p><span className="info-label-1">Email:</span> {user.username}@gmail.com</p><br />
          <p><span className="info-label-1">Grade:</span> {user.employee.grade}</p><br />
          <p><span className="info-label-1">Fonction:</span> {user.employee.function}</p><br />
          <p><span className="info-label-1">Direction:</span> {user.employee.direction.name}</p><br />
        </>
      )}
    </section>
  );
};

const Visualization = () => {
  const [demand, setDemand] = useState(mockData);

  return (
    <div className="Visualization">
      <div className="buttons">
        <button className="btn-a">Annuler</button>
        <button className="btn-v">Valider</button>
        <button className="btn-r">Refuser</button>
        <button className="btn-e">Envoyer</button>
      </div>
          
      <div className="details-container">
        <section className="demande-info info-section">
          <h2>Demande #{demand.id}</h2>
          <p><span className="info-label">état:</span>{demand.demand.state.name}</p>
          <UserInfo  title="Demandeur"  user={demand.demand.creator} />
          <UserInfo  title="Assigné" user={demand.demand.assignee} />
          <div className="sideright">
            <p><span className="info-label">Date de création:</span> {new Date(demand.demand.created_at).toLocaleDateString()}</p>
            <p><span className="info-label">Dernière modification:</span> {new Date(demand.demand.last_modified).toLocaleDateString()}</p>
          </div>
          </section>
          <section className="mission-info info-section">
          <h2>Informations sur la mission</h2>
          <p><span className="info-label">Type de mission:</span> {demand.mission_type.name}</p><br />
          <p><span className="info-label">Objectif de la mission:</span> {demand.trip_purpose}</p><br />
          <p><span className="info-label">Utilisation d'un véhicule personnel:</span> {demand.use_personal_vehicle ? 'Oui' : 'Non'}</p><br />
          <p><span className="info-label">Agence:</span> {demand.agency.name}</p><br />
          <p><span className="info-label">Adresse:</span> {demand.agency.address}</p><br />
          <p><span className="info-label">Téléphone:</span> {demand.agency.phone}</p><br />
          <p><span className="info-label">Départ:</span> {new Date(demand.departing).toLocaleString()}</p><br />
          <p><span className="info-label">Retour:</span> {new Date(demand.returning).toLocaleString()}</p><br />
          <p><span className="info-label">Observation manager:</span> {demand.observation_manager}</p><br />
          <p><span className="info-label">Observation HR:</span> {demand.observation_HR}</p><br />
          </section>
          <Link to="/" className="btn">Retour</Link>
          </div>
          </div>
      );
};

export default Visualization;






