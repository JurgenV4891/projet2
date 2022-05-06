import React, { Component } from "react";
import CreateurPersonnage from "./containers/CreateurPersonnage/CreateurPersonnage";
import ListePersonnage from "./containers/ListePersonnage/ListePersonnage";

class App extends Component {
  state = {
    refresh: false,
  };

  handleRefresh = () => {
    this.setState((oldState) => {
      return {
        refresh: !oldState.refresh,
        // met à jour dynamiquement le deuxième composants
      };
    });
  };

  render() {
    return (
      <>
        <CreateurPersonnage refresh={this.handleRefresh} />
        <ListePersonnage refresh={this.state.refresh} />
      </>
    );
  }
}

//  ci-dessus je crée une nouvelle app si on peut dire, pour lister les persos donc je crée un nouveau composant ListePersonnage
//  qui va me falloir créer, je l'importe et le met dans les containers car j'aurais surement besoin de state, j'ajoute les balises vides pour retourner un élément.
export default App;
