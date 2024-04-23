import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const faqData = [
  {
    question: "What types of venues are available for booking on your website?",
    answer: "We offer a wide range of venues for booking, including event spaces, conference rooms, banquet halls, wedding venues, and more. You can filter your search based on location, venue type, capacity, and other criteria."
  },
  {
    question: "How do I search for a venue on your website?",
    answer: "You can use our search bar to enter the location and venue type you're looking for, or browse through our listings and filter the results by various criteria such as capacity, price range, and availability."
  },
  // Add more FAQ data objects here
];

const FaqComponent = () => {
  const classes = useStyles();

  return (
    <div>
        <Typography variant='h4' align='center'>FAQ</Typography>
        <div className={classes.root}>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
            <Typography variant="h6" className={classes.heading}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>

    </div>

    
    
  );
};

export default FaqComponent;
