import React, { useContext, useMemo, useRef, useState } from "react";
import FeedbackContext from "../Context/FeedbackContextProvider";
import FeedbackRow from "./FeedbackRow";
import DetailModal from "./DetailModal";
import classes from "./FeedbackTable.module.css";
import RatingFilter from "./RatingFilter";

const FeedbackTable = (props) => {
  const selectedFeedbackId = useRef(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const feedbackCtx = useContext(FeedbackContext);

  // Filtering selected feedbacks
  const selectedFeedback = useMemo(
    () =>
      props.feedbacks.find(
        (feedback) => feedback.id === selectedFeedbackId.current
      ),
    [selectedFeedbackId.current, props.feedbacks]
  );

  const showDetailModalHandler = (id) => {
    selectedFeedbackId.current = id;
    setShowDetailModal(true);
  };

  const closeDetailModalHandler = () => {
    selectedFeedbackId.current = null;
    setShowDetailModal(false);
  };

  return (
    <div className={classes.feedback_table}>
      {showDetailModal && (
        <DetailModal
          onClose={closeDetailModalHandler}
          feedback={selectedFeedback}
        />
      )}
      <div className={classes.feedback_wrapper}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="allselected"
                  onChange={(event) =>
                    feedbackCtx.onSelectAllFeedback(event.target.checked)
                  }
                />
              </th>
              <th>Form details</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>
                <div className={classes.service_rating}>
                  Please rate the quality of the service you received from your
                  host <RatingFilter title="serviceRating" />
                </div>
              </th>
              <th>
                <div className={classes.beverage_rating}>
                  Please rate the quality of your beverage{" "}
                  <RatingFilter title="beverageRating" />
                </div>
              </th>
              <th>
                <div className={classes.hygiene_rating}>
                  Was our restaurant clean?{" "}
                  <RatingFilter title="hygieneRating" />
                </div>
              </th>
              <th>
                <div className={classes.overall_rating}>
                  Please rate your overall dining experience
                  <RatingFilter title="overallRating" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.feedbacks.length > 0 &&
              props.feedbacks.map((feedback) => {
                return (
                  <FeedbackRow
                    key={feedback.id}
                    data={feedback}
                    onShowDetail={showDetailModalHandler.bind(
                      null,
                      feedback.id
                    )}
                  />
                );
              })}
          </tbody>
        </table>
        {props.feedbacks.length === 0 && (
          <div className={classes.not_found}>No feedbacks found</div>
        )}
      </div>
    </div>
  );
};

export default FeedbackTable;
