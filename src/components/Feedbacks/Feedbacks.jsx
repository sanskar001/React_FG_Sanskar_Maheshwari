import React, { useContext, useMemo, useRef, useState } from "react";
import Button from "../UI/Button";
import classes from "./Feedbacks.module.css";
import FeedbackTable from "./FeedbackTable";
import { MdSearch } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import FeedbackContext from "../Context/FeedbackContextProvider";

const Feedbacks = (props) => {
  const searchFilter = useRef(false);
  const [searchInput, setSearchInput] = useState("");
  const { feedbackList, onDeleteFeedback, ratingFilter, resetRatingFilter } =
    useContext(FeedbackContext);

  // If any feedback select then show delete button
  const isSelectedFeedback = useMemo(
    () => feedbackList.some((feedback) => feedback.isSelected === true),
    [feedbackList]
  );

  // Filter feedbacks according to search and rating
  const filterFeedbackList = useMemo(
    () =>
      feedbackList.filter((feedback) => {
        const feedback_text = `${feedback.customerName}_${feedback.email}_${feedback.phoneNumber}`;

        return (
          feedback_text.toLowerCase().includes(searchInput.toLowerCase()) &&
          (ratingFilter.serviceRating
            ? feedback.serviceRating === ratingFilter.serviceRating
            : true) &&
          (ratingFilter.beverageRating
            ? feedback.beverageRating === ratingFilter.beverageRating
            : true) &&
          (ratingFilter.hygieneRating
            ? feedback.hygieneRating === ratingFilter.hygieneRating
            : true) &&
          (ratingFilter.overallRating
            ? feedback.overallRating === ratingFilter.overallRating
            : true)
        );
      }),
    [searchInput, feedbackList, Object.values(ratingFilter)]
  );

  const filterAppliedCount = useMemo(
    () =>
      Object.values(ratingFilter).filter((el) => el !== "").length +
      Number(searchFilter.current),
    [searchFilter.current, Object.values(ratingFilter)]
  );

  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
    searchFilter.current = event.target.value.length > 0 ? true : false;
  };

  const resetFilterHandler = () => {
    setSearchInput("");
    searchFilter.current = false;
    resetRatingFilter();
  };

  return (
    <div className={classes.feedbacks}>
      <header>
        <div>
          <h2>Aromatic bar</h2>
          <p className={classes.filter_info}>
            {filterFeedbackList.length} records found. {filterAppliedCount}{" "}
            filter applied
          </p>
        </div>
        <div className={classes.right}>
          <div className={classes.search_input}>
            <input
              type="text"
              id="search"
              placeholder="Search"
              autoComplete="off"
              value={searchInput}
              onChange={searchInputChangeHandler}
              disabled={feedbackList.length === 0}
            />
            <label htmlFor="search">
              <MdSearch />
            </label>
          </div>
          <Button
            className={classes.reset_btn}
            onClick={resetFilterHandler}
            title="Reset"
          >
            <GrPowerReset />
          </Button>
          <Button
            className={classes.add_btn}
            onClick={props.onShowForm}
            title="Add new feedback"
          >
            Add New
          </Button>
        </div>
      </header>
      <FeedbackTable feedbacks={filterFeedbackList} />
      {isSelectedFeedback && (
        <footer>
          <Button className={classes.delete_btn} onClick={onDeleteFeedback}>
            Delete
          </Button>
        </footer>
      )}
    </div>
  );
};

export default Feedbacks;
