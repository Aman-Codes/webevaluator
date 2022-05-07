import React from "react";
import useStyles from "./styles";

const Container = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default Container;
