import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './stylesEmptyCart'


const EmptyCart = () => {

  const classes = useStyles();

  return (

        <Typography variant="subtitle1">No tienes articulos en tu carrito, añade algunos.
          <Link to='/' className={classes.Link}>Añade algo al carro.</Link>
        </Typography>

  )
}

export default EmptyCart
