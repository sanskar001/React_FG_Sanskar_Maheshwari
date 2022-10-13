import React from "react";
import classes from "./PersonalInput.module.css";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { MdErrorOutline } from "react-icons/md";

// INPUT VALIDATION REGULAR EXPRESSION
const CUSTOMER_NAME_REGEX = /^[a-zA-Z\s]+$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const PersonalInputs = (props) => {
  const customerNameChangeHandler = (event) => {
    props.onAddPersonalInput({
      name: "customerName",
      value: event.target.value,
      isValid: CUSTOMER_NAME_REGEX.test(event.target.value.trim()),
    });
  };

  const emailChangeHandler = (event) => {
    props.onAddPersonalInput({
      name: "email",
      value: event.target.value,
      isValid: EMAIL_REGEX.test(event.target.value.trim()),
    });
  };

  const phoneNumberChangeHandler = (value) => {
    props.onAddPersonalInput({
      name: "phoneNumber",
      value: value,
      isValid: value?.length > 0 && isPossiblePhoneNumber(value),
    });
  };

  // Personal input error handling
  const customerNameHasError =
    !props.customerNameInput.isValid && props.isFormTouched;

  const emailHasError = !props.emailInput.isValid && props.isFormTouched;

  const phoneNumberHasError =
    !props.phoneNumberInput.isValid && props.isFormTouched;

  return (
    <div className={classes.personal_inputs}>
      <div>
        <label htmlFor="customerName">Customer Name</label>
        <input
          id="customerName"
          type="text"
          placeholder="Eg. jhon snow"
          autoComplete="off"
          value={props.customerNameInput.value}
          onChange={customerNameChangeHandler}
        />
        {customerNameHasError && (
          <p className={classes.error}>
            <MdErrorOutline size={20} /> Please enter valid customer name, does
            not include special characters
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Eg. abc@gmail.com"
          autoComplete="off"
          value={props.emailInput.value}
          onChange={emailChangeHandler}
        />
        {emailHasError && (
          <p className={classes.error}>
            <MdErrorOutline size={20} /> Please enter valid email address
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <PhoneInput
          className={classes.phone_number_input}
          placeholder="Enter phone number"
          value={props.phoneNumberInput.value}
          onChange={phoneNumberChangeHandler}
          defaultCountry="IN"
          limitMaxLength={true}
        />
        {phoneNumberHasError && (
          <p className={classes.error}>
            <MdErrorOutline size={20} /> Please enter valid phone number
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInputs;
