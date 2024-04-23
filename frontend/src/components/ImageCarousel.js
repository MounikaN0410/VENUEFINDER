import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  button: {
    margin: '0 10px',
  },
  caption: {
    textAlign: 'center',
    marginTop: '10px',
  },
});
const images = [
  {
    src: 'https://source.unsplash.com/random/800x500',
    caption: 'Image 1',
  },
  {
    src: 'https://source.unsplash.com/random/800x501',
    caption: 'Image 2',
  },
  {
    src: 'https://source.unsplash.com/random/800x502',
    caption: 'Image 3',
  },
];

const ImageCarousel = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Paper className={classes.root}>
      <img src={images[index].src} alt={images[index].caption} className={classes.image} />
      <div>
        <Button variant="contained"  className={classes.button} onClick={handlePrev}>
          Prev
        </Button>
        <Button variant="contained" className={classes.button} onClick={handleNext}>
          Next
        </Button>
      </div>
      <Typography variant="caption" className={classes.caption}>
        {images[index].caption}
      </Typography>
    </Paper>
  );
};
export default ImageCarousel;  