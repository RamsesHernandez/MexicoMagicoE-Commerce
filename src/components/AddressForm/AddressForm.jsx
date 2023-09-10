import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider, set } from 'react-hook-form';
import FormInput from '../CustomTextField/CustomTextField';
import { Link } from 'react-router-dom'

import { commerce } from '../../lib/commerce';

import usetStyles from './stylesAddressForm'

const AdrresForm = ({ checkoutToken, next }) => {

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map (([code, name]) => ({id:code, label:name}));
  const subdivisions = Object.entries(shippingSubdivisions).map (([code, name]) => ({id:code, label:name}));
  const options = shippingOptions.map((sO) => ({ id:sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));


  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);


  return (
    <>
      <Typography variant='h6' gutterBottom>Domicilio de Entrega</Typography>
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput name='firstName' label='Nombre'/>
            <FormInput name='lastName' label='Apellido'/>
            <FormInput name='address' label='Domicilio'/>
            <FormInput name='email' label='Correo Electronico'/>
            <FormInput name='city' label='Ciudad'/>
            <FormInput name='zipCode' label='Codigo Postal'/>
            <Grid item xs={12} sm={6}>
              <InputLabel>Pais de Envio</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Supdivicion de Envio</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => set.shippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivisions) => (
                  <MenuItem key={subdivisions.id} value={subdivisions.id}>
                  {subdivisions.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Opciones de Envio</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => set.shippingOption(e.target.value)}>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style = {{ display:'flex', justifyContent:'space-between'}}>
            <Button component={Link} to="/cart" variant="outlined">Regresar al carrito</Button>
            <Button type="submit" variant="contained" color="primary">Siguiente</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AdrresForm
