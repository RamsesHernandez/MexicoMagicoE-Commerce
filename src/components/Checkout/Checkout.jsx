import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, Button, CssBaseline } from '@material-ui/core'
import AddressForm from '../AddressForm/AddressForm';
import PaymentForm from '../PaymentForm/PaymentForm';
import { Link } from 'react-router-dom';
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm';

import useStyles from './stylesCheckout'
import { commerce } from '../../lib/commerce';

const steps = ['Domicilio de Entrega', 'Detalle de Pago'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch (err) {
          console.log(err);
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />

  return (
    <>
    <CssBaseline />
    <div className={classes.toolbar} />
    <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant='h4' align='center'>Detalles de Envio y Pago</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? <ConfirmationForm /> : checkoutToken && <Form />}
        </Paper>
    </main>
    </>
  )
}


export default Checkout
