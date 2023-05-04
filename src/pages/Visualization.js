import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Visualization.css";

const Visualization = () => {
  return (
    <div className="details-container">
      <div className="missionaire-info">
        <p><strong>Nom:</strong> Kabouche Ibrahim</p><br />
        <p><strong>Téléphone:</strong> 0784210629</p><br />
        <p><strong>Email:</strong> ima.kabouche@gmail.com</p><br />
        <p><strong>Grade:</strong> A+</p><br />
      </div>
      <div className="demande-info">
        <h3>Demande #0001</h3><br />
         <p><strong>état :</strong>envoyé</p><br />
        <p><strong>Type de mission:</strong> 1</p><br />
        <p><strong>Motif de déplacement:</strong> hello world</p><br />
        <p><strong>Moyen de transport:</strong> véhicule personnel</p><br />
        <p><strong>Agence:</strong> agence local 1</p><br />
        <p><strong>Date et heure départ:</strong> 03/05/2023 8:30</p><br />
        <p><strong>Date et heure retour:</strong> 05/05/2023 9:30</p> <br />
      </div>
      <Link to="/Dashboard" className="back-button">
        Retour
      </Link>
    </div>
  );
};

export default Visualization;






