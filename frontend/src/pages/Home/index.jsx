import React, { useState } from "react";
import Center from "components/Center";
import InputButton from "components/InputButton";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    navigate(`/report?url=${value}`);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const classes = useStyles();
  return (
    <Center className={classes.root}>
      <InputButton
        value={value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Center>
  );
};

export default Home;
