import React, { useContext, useReducer, useState } from "react";
import classes from "./FeedbackForm.module.css";
import Question from "./Question";
import Button from "../UI/Button";
import PersonalInputs from "./PersonalInputs";
import { generateUniqueId } from "../../Helper/helper";
import FeedbackContext from "../Context/FeedbackContextProvider";

// Default feedback form state
const defaultFormState = {
  customerName: { value: "", isValid: false },
  email: { value: "", isValid: false },
  phoneNumber: { value: "", isValid: false },
  serviceRating: { value: "", isValid: false },
  beverageRating: { value: "", isValid: false },
  hygieneRating: { value: "", isValid: false },
  overallRating: { value: "", isValid: false },
};

// Feedback form reducer method
const formReducer = (state, action) => {
  if (action.type === "ADD_INPUT") {
    return {
      ...state,
      [action.data.name]: {
        value: action.data.value,
        isValid: action.data.isValid,
      },
    };
  }

  if (action.type === "RESET") {
    return defaultFormState;
  }

  return defaultFormState;
};

const FeedbackForm = (props) => {
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    defaultFormState
  );
  const [isFormTouched, setIsFormTouched] = useState(false);

  const { addFeedback } = useContext(FeedbackContext);

  const inputChangeHandler = (inputData) => {
    dispatchFormState({ type: "ADD_INPUT", data: inputData });
  };

  // FORM SUBMIT HANDLING
  const formSubmitHandler = (event) => {
    // 1) Update form touch state to true
    event.preventDefault();
    setIsFormTouched(true);

    // 2) Form submission gaurd
    if (Object.values(formState).some((item) => item.isValid === false)) {
      return;
    }

    // 3) Collect data
    const feedbackData = {
      id: generateUniqueId(),
      customerName: formState.customerName.value.trim(),
      email: formState.email.value.trim(),
      phoneNumber: formState.phoneNumber.value.trim(),
      serviceRating: formState.serviceRating.value,
      beverageRating: formState.beverageRating.value,
      hygieneRating: formState.hygieneRating.value,
      overallRating: formState.overallRating.value,
      isSelected: false,
    };

    // 4) Add feedback data to list
    addFeedback(feedbackData);
    props.onFormSubmit();

    // 5) Reset feedback form
    dispatchFormState({ type: "RESET" });
    setIsFormTouched(false);
  };

  return (
    <form className={classes.feedback_form} onSubmit={formSubmitHandler}>
      <header>
        <h2>Aromatic bar</h2>
      </header>
      <div className={classes.input_container}>
        <PersonalInputs
          onAddPersonalInput={inputChangeHandler}
          customerNameInput={formState.customerName}
          emailInput={formState.email}
          phoneNumberInput={formState.phoneNumber}
          isFormTouched={isFormTouched}
        />
        <div className={classes.questions}>
          <Question
            questionText="Please rate the quality of the service you received from your host."
            title="serviceRating"
            selected={formState.serviceRating}
            onAddAnswer={inputChangeHandler}
            isFormTouched={isFormTouched}
          />
          <Question
            questionText="Please rate the quality of your beverage."
            title="beverageRating"
            selected={formState.beverageRating}
            onAddAnswer={inputChangeHandler}
            isFormTouched={isFormTouched}
          />
          <Question
            questionText="Was our restaurant clean?"
            title="hygieneRating"
            selected={formState.hygieneRating}
            onAddAnswer={inputChangeHandler}
            isFormTouched={isFormTouched}
          />
          <Question
            questionText="Please rate your overall dining experience."
            title="overallRating"
            selected={formState.overallRating}
            onAddAnswer={inputChangeHandler}
            isFormTouched={isFormTouched}
          />
        </div>
      </div>
      <div className={classes.actions}>
        <Button type="submit" className={classes.submit_btn}>
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
