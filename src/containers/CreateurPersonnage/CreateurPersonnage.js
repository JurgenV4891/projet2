import React, { Component } from "react";
import TitreH1 from "../../components/Titres/TitreH1";
import Bouton from "../../components/Bouton/Bouton.js";
import Personnage from "./Personnage/Personnage";
import Armes from "./Armes/Armes";
import axios from "axios";

class CreateurPersonnage extends Component {
  state = {
    personnage: {
      image: 1,
      force: 0,
      agilite: 0,
      intelligence: 0,
      arme: null,
    },
    nbPointsDisponibles: 7,
    armes: null,
    loading: false,
    nom: "",
  };

  componentDidMount = () => {
    this.setState({ loading: true }); // au lancement de cette fonction, je met le loading à true, donc le chargement des data à débuter
    axios
      .get(
        "https://creaperso-b9eca-default-rtdb.europe-west1.firebasedatabase.app/armes.json"
      )
      .then((reponse) => {
        const armesArray = Object.values(reponse.data);
        this.setState({ armes: armesArray, loading: false });
        // console.log(armesArray);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  handleImagePrecedente = () => {
    this.setState((oldState) => {
      const newPersonnage = { ...oldState.personnage };
      if (oldState.personnage.image <= 1) newPersonnage.image = 3;
      else newPersonnage.image--;
      return { personnage: newPersonnage };
    });
  };

  handleImageSuivante = () => {
    this.setState((oldState) => {
      const newPersonnage = { ...oldState.personnage };
      if (oldState.personnage.image >= 3) newPersonnage.image = 1;
      else newPersonnage.image++;
      return { personnage: newPersonnage };
    });
  };

  handleEnleverPoint = (carac) => {
    this.setState((oldState, props) => {
      if (oldState.personnage[carac] <= 0 || oldState.nbPointsDisponibles >= 7)
        return null;
      const newPointCarac = oldState.personnage[carac] - 1;
      const newPerso = { ...oldState.personnage };
      const newNbPointsDisponible = oldState.nbPointsDisponibles + 1;
      newPerso[carac] = newPointCarac;
      return {
        personnage: newPerso,
        nbPointsDisponibles: newNbPointsDisponible,
        armes: ["epee", "fleau", "arc", "hache"],
      };
    });
  };

  handleAjouterPoint = (carac) => {
    this.setState((oldState, props) => {
      if (oldState.personnage[carac] >= 6 || oldState.nbPointsDisponibles <= 0)
        return null; //  Est-ce que j'ai pas déjà mis 5 points sur la caractéristique donnée? et ai-je encore des points disponibles? si c'est le cas, je sors de cette fonction
      const newPointCarac = oldState.personnage[carac] + 1; // sinon ajouter un point de plus sur la caractéristique demandée
      const newPerso = { ...oldState.personnage }; // je duplique mon personnage
      const newNbPointsDisponible = oldState.nbPointsDisponibles - 1; // je duplique le nb de points dispo en révisant sa valeur de 1
      newPerso[carac] = newPointCarac; // je mets dans mon perso mon nouveau nb de points
      return {
        personnage: newPerso,
        nbPointsDisponibles: newNbPointsDisponible,
      }; // enfin , je fais la fusion dans mon state en y mettant les nouvelles valeurs que nous avons parametrer juste au-dessus. Pour terminer, je fais l'inverse pour enlever des points!
    });
  };

  handleChangeArmePersonnage = (arme) => {
    const newPerso = { ...this.state.personnage };
    newPerso.arme = arme;
    this.setState({ personnage: newPerso });
  };

  handleReinitialisation = () => {
    this.setState({
      personnage: {
        image: 1,
        force: 0,
        agilite: 0,
        intelligence: 0,
        arme: null,
      },
      nbPointsDisponibles: 7,
      armes: ["epee", "fleau", "arc", "hache"],
    });
  };
  handleValidation = () => {
    this.setState({ loading: true });
    const player = {
      perso: { ...this.state.personnage },
      nom: this.state.nom,
    };
    axios
      .post(
        "https://creaperso-b9eca-default-rtdb.europe-west1.firebasedatabase.app/persos.json",
        player
      )
      .then((reponse) => {
        console.log(reponse);
        this.setState({ loading: false });
        this.handleReinitialisation();
        this.props.refresh();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
        this.handleReinitialisation();
      });
  };

  render() {
    return (
      <div className="container">
        <TitreH1>Création de personnage</TitreH1>
        {this.state.loading && <div>Chargement...</div>}
        <div className="form-group">
          <label htmlFor="inputName">Nom :</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={this.state.nom}
            onChange={(event) => this.setState({ nom: event.target.value })}
          />
        </div>
        {/* ci-dessous, je récupère toutes les informations de mon state  */}
        <Personnage
          {...this.state.personnage}
          precedente={this.handleImagePrecedente}
          suivante={this.handleImageSuivante}
          nbPointsDisponibles={this.state.nbPointsDisponibles}
          enleverPoint={this.handleEnleverPoint}
          ajouterPoint={this.handleAjouterPoint}
        />
        {this.state.armes && (
          <Armes
            listeArmes={this.state.armes}
            changeArme={this.handleChangeArmePersonnage}
            currentArme={this.state.personnage.arme}
          />
        )}
        <div className="row no-gutters">
          <Bouton
            typeBtn="btn-danger"
            css="col-6"
            clic={this.handleReinitialisation}
          >
            Réinitialiser
          </Bouton>
          <Bouton
            typeBtn="btn-success"
            css="col-6"
            clic={this.handleValidation}
          >
            Créer
          </Bouton>
        </div>
      </div>
    );
  }
}

export default CreateurPersonnage;
