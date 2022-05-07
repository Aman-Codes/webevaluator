import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    fontFamily: "Roboto",
    boxShadow:
      "0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13)",
  },
  toolBar: {
    height: "4.9rem",
    display: "flex",
    justifyContent: "space-between",
    background: theme.palette.header,
    padding: theme.spacing(0, 7.5),
    "& *": {
      color: theme.palette.text.tertiary,
    },
    "& nav": {
      flexGrow: 1,
      marginLeft: theme.spacing(15),
    },
  },
  link: {
    textDecoration: "none",
  },
  title: {
    fontSize: "1.625rem",
    fontWeight: 600,
    color: theme.palette.highlightText,
  },
  rightSection: {
    display: "flex",
    justifyContent: "space-between",
    "& div": {
      marginRight: "0.5rem",
    },
    "& a": {
      textDecoration: "none",
    },
  },
  iconContainer: {
    height: "max-content",
    paddingTop: "0.4rem",
  },
  middleSection: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    "& a": {
      margin: "0 2rem 0 0.25rem",
    },
    "& a:hover p": {
      color: theme.palette.highlightText,
    },
    "& a:hover svg path": {
      stroke: theme.palette.highlightText,
      fill: theme.palette.highlightText,
    },
  },
}));

export default useStyles;
