import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    position: "fixed",
    bottom: 0,
    right: 0,
    outline: "none",
    backgroundColor: "white",
    padding: 10,
    zIndex: 2000,
  },
  media: {
    height: 180,
    textAlign: "center",
    "& > img": {
      height: "100%",
      width: "auto",
    },
  },
  content: {
    padding: 10,
  },
  actions: {
    padding: 10,
  },
}));

function CookiesNotification() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    Cookies.set("consent", "true");
    setOpen(false);
  };

  useEffect(() => {
    const consent = Cookies.get("consent");

    if (!consent) {
      setOpen(true);
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.media}>
        <img alt="Cookies" src={require("./../../icons/university.png")} />
      </div>
      <div className={classes.content}>
        <Typography variant="body1">
          We use Cookies to ensure that we give you the best experience on our
          website. Read our Privacy Policy.
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          className={classes.agreeButton}
          color="primary"
          onClick={handleClose}
          variant="contained"
        >
          I Agree
        </Button>
      </div>
    </Paper>
  );
}

export default CookiesNotification;
