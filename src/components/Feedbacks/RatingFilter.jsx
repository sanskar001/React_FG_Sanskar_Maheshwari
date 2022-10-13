import React, { useContext, useState } from "react";
import Button from "../UI/Button";
import { MdExpandMore } from "react-icons/md";
import classes from "./RatingFilter.module.css";
import FeedbackContext from "../Context/FeedbackContextProvider";

// Rating filter options
const options = ["excellent", "good", "fair", "bad"];

const RatingFilter = (props) => {
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const { ratingFilter, updateRatingFilter } = useContext(FeedbackContext);

  const filterBtnClickHandler = () => {
    // Toggle displaying rating filter dropdown
    setShowRatingFilter((prevState) => !prevState);
  };

  const filterOptionChangeHandler = (event) => {
    // 1) Update rating filter state
    updateRatingFilter({
      name: props.title,
      value: event.target.value,
    });

    // 2) Close rating filter dropdown
    setShowRatingFilter(false);
  };

  return (
    <React.Fragment>
      <Button className={classes.filter_btn} onClick={filterBtnClickHandler}>
        <MdExpandMore />
      </Button>
      {showRatingFilter && (
        <div className={classes.rating_filter}>
          <ul className={classes.filter_list}>
            {options.map((opt) => {
              const optionId = `${props.title}_${opt}`;
              return (
                <li key={optionId}>
                  <label htmlFor={optionId}>
                    <input
                      name={props.title}
                      type="radio"
                      id={optionId}
                      value={opt}
                      checked={ratingFilter[props.title] === opt}
                      onChange={filterOptionChangeHandler}
                    />
                    <span>{opt}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default RatingFilter;
