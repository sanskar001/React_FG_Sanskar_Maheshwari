import React from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button";
import classes from "./DetailModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const Modal = (props) => {
  return (
    <div className={classes.modal}>
      <header>
        <h2>Feedback Detail</h2>
      </header>
      <main>
        <div className={classes.personal_info}>
          <p>
            Customer name: <span>{props.feedback.customerName}</span>
          </p>
          <p>
            Email: <span>{props.feedback.email}</span>
          </p>
          <p>
            Phone: <span>{props.feedback.phoneNumber}</span>
          </p>
        </div>
        <div className={classes.question_info}>
          <div>
            <p>
              Please rate the quality of the service you received from your host
            </p>
            <span>{props.feedback.serviceRating}</span>
          </div>
          <div>
            <p>Please rate the quality of your beverage</p>
            <span>{props.feedback.beverageRating}</span>
          </div>
          <div>
            <p>Was our restaurant clean?</p>
            <span>{props.feedback.hygieneRating}</span>
          </div>
          <div>
            <p>Please rate your overall dining experience</p>
            <span>{props.feedback.overallRating}</span>
          </div>
        </div>
      </main>
      <footer>
        <Button className={classes.close_btn} onClick={props.onClose}>
          Close
        </Button>
      </footer>
    </div>
  );
};

const DetailModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <Modal onClose={props.onClose} feedback={props.feedback} />,
        document.getElementById("overlay")
      )}
    </React.Fragment>
  );
};

export default DetailModal;
