import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import { Modal } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  input_div: {
    margin: "auto",
    width: "400px",
    textAlign: "right",
  },
  para: {
    color: "grey",
    textDecoration: "underline",
    opacity: "0.8",
    cursor: "pointer",
  },
  paper: {
    position: "absolute",
    left: "35%",
    top: "30%",
    width: 400,
    backgroundColor: "#b3cde0",
    padding: "20px",
    margin: "auto",
  },
  button: {
    marginTop: "20px",
  },
}));

const InputButton = ({ value, handleChange, handleSubmit }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [crawl, setCrawl] = useState(true);
  const [ssl, setSsl] = useState(true);
  const [ada, setAda] = useState(true);
  const [cookie, setCookie] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <LanguageIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="https://www.example.com"
          inputProps={{ "aria-label": "analyze website" }}
          value={value}
          onChange={handleChange}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2>Specify Custom Parameters</h2>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={crawl}
                  onChange={(event) => setCrawl(event.target.checked)}
                />
              }
              label="Crawl"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ssl}
                  onChange={(event) => setSsl(event.target.checked)}
                />
              }
              label="Check SSL Certification"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ada}
                  onChange={(event) => setAda(event.target.checked)}
                />
              }
              label="Ada Compliance"
            />
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.check}
                  checked={cookie}
                  onChange={(event) => setCookie(event.target.checked)}
                />
              }
              label="Cookie Analysis"
            />
          </FormGroup>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Save
          </Button>
        </div>
      </Modal>
      <div className={classes.input_div}>
        <div
          onClick={handleOpen}
          className={classes.input_para}
          onKeyDown={handleOpen}
          aria-hidden="true"
        >
          <p className={classes.para}>Advanced Search</p>
        </div>
      </div>
    </div>
  );
};

export default InputButton;
