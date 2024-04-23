import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: 'auto',
    marginTop: 20,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: 'green',
  },
});

const VenueUpdationSuccessCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <CheckCircleIcon className={classes.icon} />
        <Typography variant="body1">
          Venue Updation Successful
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VenueUpdationSuccessCard;
