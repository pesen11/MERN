import { useState } from "react";

const CourseGoalInput = (props) => {
  const [enteredValue, setEnteredvalue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredvalue(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Course Goal</label>
        <input type="text" onChange={onChangeHandler} />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default CourseGoalInput;
