import React, { useContext } from "react";
import FeedbackContext from "../Context/FeedbackContextProvider";
import Button from "../UI/Button";

const FeedbackRow = (props) => {
  const feedbackCtx = useContext(FeedbackContext);

  const checkboxClickHandler = (event) => {
    feedbackCtx.onSelectFeedback(event.target.value);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name="select"
          value={props.data.id}
          checked={props.data.isSelected}
          onChange={checkboxClickHandler}
        />
      </td>
      <td>
        <Button onClick={props.onShowDetail}>View details</Button>
      </td>
      <td>{props.data.customerName}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phoneNumber}</td>
      <td>{props.data.serviceRating}</td>
      <td>{props.data.beverageRating}</td>
      <td>{props.data.hygieneRating}</td>
      <td>{props.data.overallRating}</td>
    </tr>
  );
};

export default FeedbackRow;
