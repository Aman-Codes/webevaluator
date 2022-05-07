import React from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";

const About = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <div className={classes.about_div}>
          <div className={classes.about_size}>
            <h5 className={classes.h5}>About Webulator</h5>
            <p className={classes.about_text}>
              This is an advanced web crawling tool that will not only discover
              active URLs within the website but also provide information about
              SSL certificate compliance, Cookie checker, ADA compliance,
              Security-related checks, SEO and the complete analysis of the
              website.
            </p>
            <h5 className={classes.h5}>How Do We Achieve This</h5>
            <p className={classes.about_text}>
              We have created all the functionalities and almost all the scripts
              from scratch. Each sub-section of the tool is developed
              individually and then integrated into one. The tool is built using
              a combination of tech-stacks like - NodeJs, Python, Golang
              Javascript, React Js, and few standard frameworks from official
              directories which are all open-sourced and are liable for
              commercial use.
            </p>
            <h5 className={classes.h5}>Our Team</h5>
            <p className={classes.about_text}>
              We are a team of enthusiastic developers currently pursuing
              enginerring from Indian Institute of Technology (Indian School of
              Mines) Dhanbad
            </p>
            <ul className={classes.ul}>
              <li>Aman Dwivedi</li>
              <li>Harsh Mishra</li>
              <li>Jai Gupta</li>
              <li>Yash Vardhan</li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
