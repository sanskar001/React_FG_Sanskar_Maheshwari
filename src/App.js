import React, { useState } from "react";
import Feedbacks from "./components/Feedbacks/Feedbacks";
import NewFeedback from "./components/NewFeedback/NewFeedback";

const App = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(true);

  const showFeedbackFormHandler = () => {
    setShowFeedbackForm(true);
  };

  const closeFeedbackFormHandler = () => {
    setShowFeedbackForm(false);
  };

  return (
    <React.Fragment>
      {!showFeedbackForm && <Feedbacks onShowForm={showFeedbackFormHandler} />}
      {showFeedbackForm && (
        <NewFeedback onCloseForm={closeFeedbackFormHandler} />
      )}
    </React.Fragment>
  );
};

export default App;
