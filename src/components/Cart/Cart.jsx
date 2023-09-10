import React from 'react'
import { Container, Typography } from '@material-ui/core'
import EmptyCart from '../EmptyCart/EmptyCart'
import FilledCart from '../FilledCart/FilledCart'
import useStyles from './stylesCart'


const Cart = ({ cart, updateCartQty, removeFromCart, emptyCart }) => {

    const classes = useStyles();

    if(!cart.line_items) return 'Loading.... ';

    return (
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.tittle} variant="h4" gutterBottom>Tu Carrito</Typography>
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart cart={cart} updateCartQty={updateCartQty} removeFromCart={removeFromCart} emptyCart={emptyCart} />}
    </Container>
  )
}

export default Cart
