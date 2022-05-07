import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    background: theme.palette.secondary.main,
    minWidth: "20rem",
    margin: "0 0.5rem",
    width: "100%",
    padding: "1rem",
  },
}));

export default useStyles;
