import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import Center from "components/Center";
import useStyles from "./styles";

const Loader = ({ size, message }) => {
  const classes = useStyles();
  const defaultSize = 40;
  return (
    <div>
      <Center>
        <CircularProgress
          className={classes.spinner}
          size={size || defaultSize}
        />
      </Center>
      <Typography>{message}</Typography>
    </div>
  );
};

export default Loader;
