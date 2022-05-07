import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

const Footer = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div>{t("footer.copyrightNotice")}</div>
      <div>
        <a href="/terms" className={classes.anchor}>
          {t("footer.terms")}
        </a>
        <a href="/about" className={classes.anchor}>
          {t("footer.about")}
        </a>
        <a
          href="https://github.com/Aman-Codes/webevaluator"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.anchor}
        >
          {t("footer.github")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
