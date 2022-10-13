import React from "react";
import classes from "./Question.module.css";
import { MdErrorOutline } from "react-icons/md";

// Feedback answer options
const options = ["excellent", "good", "fair", "bad"];

const Question = (props) => {
  // INPUT VALIDATION
  const questionHasError = !props.selected.isValid && props.isFormTouched;

  const optionChangeHandler = (event) => {
    props.onAddAnswer({
      name: props.title,
      value: event.target.value,
      isValid: true,
    });
  };

  return (
    <div className={classes.question}>
      <p className={classes.question_text}>{props.questionText}</p>
      {questionHasError && (
        <p className={classes.error}>
          <MdErrorOutline size={20} /> Please select one of the option
        </p>
      )}
      <ul className={classes.option_list}>
        {options.map((opt) => {
          const optionId = `${props.title}_${opt}`;

          return (
            <li key={opt}>
              <label htmlFor={optionId}>
                <input
                  name={props.title}
                  type="radio"
                  id={optionId}
                  value={opt}
                  checked={props.selected.value === opt}
                  onChange={optionChangeHandler}
                />
                <span>{opt}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
