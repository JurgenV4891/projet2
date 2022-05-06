import axios from "axios";
import React, { Component } from "react";
import Titre from "../../components/Titres/TitreH1";
import Personnage from "./Personnage/Personnage";

class ListePersonnage extends Component {
  state = {
    personnages: null,
    loading: false,
  };

  loadData = () => {
    this.setState({ loading: true });
    axios
      .get(
        "https://creaperso-b9eca-default-rtdb.europe-west1.firebasedatabase.app/persos.json"
      )
      .then((reponse) => {
        const personnages = Object.values(reponse.data);
        this.setState({ personnages, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: true });
      });
  };

  componentDidMount = () => {
    this.loadData();
  };

  componentDidUpdate = (oldProps, oldState) => {
    if (oldProps.refresh !== this.props.refresh) {
      this.loadData();
    }
  };
  render() {
    return (
      <>
        {this.state.loading && <div> Chargement ...</div>}
        {!this.state.loading && this.state.personnages && (
          <div className="row no-gutters">
            {this.state.personnages.map((perso, indice) => {
              return (
                <div className="col-6" key={indice}>
                  <Titre>{perso.nom}</Titre>
                  <Personnage {...perso.perso} />
                </div>
              );
            })}
          </div>
        )}
      </>
      // important de faire des loading en attendant la connexion effective avec le serveur
      //   c'est sur le state personnages qu'il faut faire la fonction map=> pour parcourir le tableau personnages
    );
  }
}

export default ListePersonnage;
