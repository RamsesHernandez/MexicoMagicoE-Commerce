import React from 'react'
import { Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import commerce from '@chec/commerce.js';

import useStyles from './stylesConfirmationForm'

const ConfirmationForm = ({ order, error} ) => {

  const classes = useStyles();
  const a = order;
  console.log (a);
  return (
    <>
      <div>
        <Typography variant="h5">Gracias por su compra</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Orden ref: 42424564</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Regresar al inicio</Button>
    </>

  )
}

export default ConfirmationForm
