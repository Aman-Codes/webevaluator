import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: theme.palette.header,
    color: "white",
    position: "fixed",
    width: "100%",
    bottom: 0,
    display: "flex",
    justifyContent: "space-between",
    height: "4rem",
    padding: "1.5rem",
    fontFamily: "Roboto",
  },
  anchor: {
    color: theme.palette.text.secondary,
    textDecoration: "none",
    margin: "0 1rem",
  },
}));

export default useStyles;
