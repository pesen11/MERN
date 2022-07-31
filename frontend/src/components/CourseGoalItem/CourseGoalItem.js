const CourseGoalItem = (props) => {
  const deleteGoal = () => {
    props.onDelete(props.id);
  };
  return <li onClick={deleteGoal}>{props.children}</li>;
};

export default CourseGoalItem;
