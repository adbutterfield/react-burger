import React from 'react';
import PropTypes from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from '../../../components/ui/Button/Button';
import './CustomerInfoForm.css';

const customerInfoForm = (props) => (
  <Form className="customer-info-form" onSubmit={props.placeOrder}>
    <Input type="text" name="name" label="Name" onChange={props.onFormFieldUpdate} value={props.name} required />
    <Input type="text" name="street" label="Street" onChange={props.onFormFieldUpdate} value={props.street} required />
    <Input type="text" name="postalCode" label="Postal Code" onChange={props.onFormFieldUpdate} value={props.postalCode} required />
    <Input type="text" name="email" label="Email" onChange={props.onFormFieldUpdate} value={props.email} required />
    <Button btnType="success" clickHandler={props.placeOrder}>PLACE ORDER</Button>
  </Form>
);

customerInfoForm.propTypes = {
  onFormFieldUpdate: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  placeOrder: PropTypes.func.isRequired,
};

export default customerInfoForm;
