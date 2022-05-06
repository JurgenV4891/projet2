import React from "react";
import classes from "./Carac.module.css";

const carac = (props) => {
  const createElement = (n) => {
    let carre = [];
    for (let i = 0; i < n; i++) {
      carre.push(<div key={i} className={classes.points}></div>);
    }
    return carre;
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <div
        className={[classes.signe, classes.moins].join(" ")}
        onClick={props.moins}
      ></div>
      <div>{props.children}</div>
      {createElement(props.nbPoints)}
      {/* {carre} */}
      <div
        className={[classes.signe, classes.plus].join(" ")}
        onClick={props.plus}
      ></div>
    </div>
  );
};

export default carac;
