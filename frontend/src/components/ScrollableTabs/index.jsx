import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "components/Table";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
}));

const ScrollableTabs = ({ mapping }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="#0000008a"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          {Object.keys(mapping).map((key, i) => (
            <Tab label={mapping[key].title} {...a11yProps(i)} key={i} />
          ))}
        </Tabs>
      </AppBar>

      {Object.keys(mapping).map((key, i) => (
        <TabPanel value={value} index={i} key={i}>
          <Table
            rows={mapping[key].rows}
            columns={mapping[key].columns}
            uniqueId={mapping[key].uniqueId}
          />
        </TabPanel>
      ))}
    </div>
  );
};

export default ScrollableTabs;
