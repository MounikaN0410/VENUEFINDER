import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  return (
    <div>
        <center>
    <Card sx={{ maxWidth: 650 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </center>
    </div>
  );
}