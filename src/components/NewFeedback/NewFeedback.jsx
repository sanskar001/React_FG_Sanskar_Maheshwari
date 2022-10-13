import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button";
import FeedbackForm from "./FeedbackForm";
import { MdCheck } from "react-icons/md";
import classes from "./NewFeedback.module.css";

// Success modal componenet - shown after form submission.
const SuccessModal = (props) => {
  return (
    <div className={classes.success_modal}>
      <span className={classes.success_mark}>
        <MdCheck />
      </span>
      <h3>Thank you for providing the feedback</h3>
      <p>We will work towards improving your experience</p>
      <Button className={classes.close_btn} onClick={props.onClose}>
        Close
      </Button>
    </div>
  );
};

const NewFeedback = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const feedbackFormSubmitHandler = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModalHandler = () => {
    // 1) Close success modal
    setShowSuccessModal(false);

    // 2) Close whole feedback form tab
    props.onCloseForm();
  };

  return (
    <div className={classes.new_feedback}>
      {showSuccessModal &&
        ReactDOM.createPortal(
          <SuccessModal onClose={closeSuccessModalHandler} />,
          document.getElementById("overlay")
        )}
      <FeedbackForm onFormSubmit={feedbackFormSubmitHandler} />
    </div>
  );
};

export default NewFeedback;
