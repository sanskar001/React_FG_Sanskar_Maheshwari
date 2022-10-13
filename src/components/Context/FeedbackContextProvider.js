import React, { useReducer, useState } from "react";

// feedback context object
const FeedbackContext = React.createContext({});

// Default Rating filter state
const defaultRatingFilter = {
  serviceRating: "",
  beverageRating: "",
  hygieneRating: "",
  overallRating: "",
};

// Rating filter reducer method
const ratingFilterReducer = (state, action) => {
  if (action.type === "UPDATE_FILTER") {
    return {
      ...state,
      [action.data.name]: action.data.value,
    };
  }

  if (action.type === "RESET_FILTER") {
    return defaultRatingFilter;
  }

  return defaultRatingFilter;
};

const FeedbackContextProvider = (props) => {
  const [ratingFilterState, dispatchRatingFilter] = useReducer(
    ratingFilterReducer,
    defaultRatingFilter
  );
  const [feedbackList, setFeedbackList] = useState(
    JSON.parse(localStorage.getItem("feedbacks")) || []
  );

  // Add Feedback handler
  const feedbackAddHandler = (newFeedback) => {
    // 1) Update state
    setFeedbackList((prevFeedbackList) => {
      return [newFeedback].concat(prevFeedbackList);
    });

    // 2) Save feedback into local storage
    const localData = JSON.parse(localStorage.getItem("feedbacks")) || [];
    localStorage.setItem(
      "feedbacks",
      JSON.stringify([newFeedback].concat(localData))
    );
  };

  // Feedback selection handler
  const feedbackSelectHandler = (id) => {
    setFeedbackList((prevFeedbackList) => {
      return prevFeedbackList.map((feedback) => {
        if (feedback.id === id) {
          return { ...feedback, isSelected: !feedback.isSelected };
        } else {
          return feedback;
        }
      });
    });
  };

  // All Feedback selection handler
  const feedbackAllSelectHandler = (isCheckedAll) => {
    setFeedbackList((prevFeedbackList) => {
      return prevFeedbackList.map((feedback) => {
        return { ...feedback, isSelected: isCheckedAll ? true : false };
      });
    });
  };

  // Feedback Delete handler
  const feedbackDeleteHandler = () => {
    // 1) Update local storage.
    localStorage.setItem(
      "feedbacks",
      JSON.stringify(
        feedbackList.filter((feedback) => feedback.isSelected === false)
      )
    );

    // 2) Update state.
    setFeedbackList((prevFeedbackList) => {
      return prevFeedbackList.filter(
        (feedback) => feedback.isSelected === false
      );
    });
  };

  // Update Rating filter handler
  const updateRatingFilterHandler = (filterData) => {
    dispatchRatingFilter({ type: "UPDATE_FILTER", data: filterData });
  };

  // Reset Rating filter handler
  const resetRatingFilterHandler = (filterData) => {
    dispatchRatingFilter({ type: "RESET_FILTER" });
  };

  const feedbackContext = {
    feedbackList: feedbackList,
    addFeedback: feedbackAddHandler,
    onSelectFeedback: feedbackSelectHandler,
    onSelectAllFeedback: feedbackAllSelectHandler,
    onDeleteFeedback: feedbackDeleteHandler,
    ratingFilter: ratingFilterState,
    updateRatingFilter: updateRatingFilterHandler,
    resetRatingFilter: resetRatingFilterHandler,
  };

  return (
    <FeedbackContext.Provider value={feedbackContext}>
      {props.children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
export { FeedbackContextProvider };
