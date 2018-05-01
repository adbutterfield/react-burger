import React from 'react';
import PropTypes from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from '../../../components/ui/Button/Button';
import './CustomerInfoForm.css';

const customerInfoForm = (props) => (
  <Form className="customer-info-form">
    <Input type="text" name="name" placeholder="Name" onChange={props.onFormFieldUpdate} value={props.name} />
    <Input type="text" name="street" placeholder="Street" onChange={props.onFormFieldUpdate} value={props.street} />
    <Input type="text" name="postalCode" placeholder="Postal Code" onChange={props.onFormFieldUpdate} value={props.postalCode} />
    <Input type="text" name="email" placeholder="Email" onChange={props.onFormFieldUpdate} value={props.email} />
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
