import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import useStyles from './stylesFilledCart'
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

const FilledCart = ({ cart, updateCartQty, removeFromCart, emptyCart }) => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={4}>
                {cart.line_items.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <CartItem item={product} updateCartQty={updateCartQty} removeFromCart={removeFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h6">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={emptyCart}>Vaciar Carrito</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Pagar</Button>
                </div>
            </div>
        </>
    )
};

export default FilledCart;
