import React, { useState } from "react";
import './DemandeForm.css';

const DemandeForm = () => {
return (
    <div>
      
      <div className={"form-container active"}>
        <form className="demande-form">
          <label>Type de mission:</label>
          <select className="input">
            <option value="mission1">Mission 1</option>
            <option value="mission2">Mission 2</option>
            <option value="mission3">Mission 3</option>
          </select>

          <label>Motif de déplacement:</label>
          <textarea className="input-motif" rows="2"></textarea>

          <label>Moyen de transport:</label>
          <select className="input">
            <option value="vehicule">Véhicule</option>
            <option value="vehicule-personnel">Véhicule personnel</option>
          </select>

          <label>Agence:</label>
          <select className="input">
            <option value="">--Choisir une agence--</option>
            <option value="agence1">Agence 1</option>
            <option value="agence2">Agence 2</option>
            <option value="agence3">Agence 3</option>
          </select>

          <label>Date et heure départ:</label>
          <input type="datetime-local" className="input" />

          <label>Date et heure retour:</label>
          <input type="datetime-local" className="input" />

          <div className="button-container">
            <button className="button-s" type="submit">
              Envoyer
            </button>
            <button className="button-a" type="button">
              Annuler
            </button>
            <button className="button-e" type="button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default DemandeForm;


         

