import React from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Navbar from "./Navbar";
import Footer from "./Footer";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    maxWidth: "300px",
    margin: "0 auto",
  },
  icon: {
    fontSize: "48px",
    color: theme.palette.success.main,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const PaymentSuccess = () => {
  const classes = useStyles();
  const navigate=useNavigate()

  return (
    <>
    <Navbar/>
     <div className={classes.root}>
      <CheckCircleOutlineIcon className={classes.icon} />
      <Typography variant="h5" align="center" className={classes.title}>
        Payment Successful
      </Typography>
      <Typography variant="body1" align="center">
        Thank you for your payment. Your Booking has been Successful
      </Typography>
      <br/>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          navigate('/CustomerHome')
        }}
      >
        See more Venues or Events
      </Button>
    </div>

<div style={{marginTop:'355px'}}>

    <Footer />
    </div>
    </>
   
  );
};

export default PaymentSuccess;
