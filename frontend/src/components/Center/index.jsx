import React from "react";
import useStyles from "./styles";

const Center = ({ children, className }) => {
  const classes = useStyles();
  return <div className={`${classes.center} ${className}`}>{children}</div>;
};

export default Center;
