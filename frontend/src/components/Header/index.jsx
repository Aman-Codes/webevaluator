import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import { useTranslation } from "react-i18next";
import ColorModeContext from "shared/ColorModeContext";
import GitHubIcon from "@material-ui/icons/GitHub";
import useStyles from "./styles";

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolBar}>
        <Link
          to={{
            pathname: "/",
          }}
          className={classes.link}
        >
          <Typography className={classes.title} variant="body1">
            {t("header.title")}
          </Typography>
        </Link>

        <div className={classes.middleSection}>
          <HomeIcon color="primary" />
          <Link to="/" className={classes.link}>
            <Typography variant="body1">&nbsp;{t("header.home")}</Typography>
          </Link>
          <InfoIcon color="primary" />
          <Link to="/about" className={classes.link}>
            <Typography variant="body1">&nbsp;{t("header.about")}</Typography>
          </Link>
        </div>

        <div className={classes.rightSection}>
          <div className={classes.iconContainer}>
            {theme.palette.mode === "dark" ? (
              <Brightness4Icon onClick={colorMode.toggleColorMode} />
            ) : (
              <Brightness7Icon onClick={colorMode.toggleColorMode} />
            )}
          </div>
          <div className={classes.iconContainer}>
            <a
              href="https://github.com/Aman-Codes/webevaluator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon color="primary" />
            </a>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
