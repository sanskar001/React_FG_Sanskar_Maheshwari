import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes.btn} ${props.className || ""}`;

  return (
    <button
      className={btnClasses}
      type={props.type || "button"}
      onClick={props.onClick}
      title={props.title || ""}
    >
      {props.children}
    </button>
  );
};

export default Button;
