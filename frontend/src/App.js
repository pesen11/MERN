//.map maa sadhai return hunxa so use () but forEach doesn't necessarily require you
//to return so can use {}

import { useState } from "react";
import CourseGoalInput from "./components/CourseGoalInput/CourseInput";
import CourseGoalList from "./components/CourseGoalList/CourseGoalList";

function App() {
  let [goals, setGoals] = useState([
    { text: "goalnumber1", id: "g1" },
    { text: "goalnumber2", id: "g2" },
  ]);

  const addGoalHander = (enteredValue) => {
    // console.log(enteredValue);
    setGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({
        text: enteredValue,
        id: Math.random().toString(),
      });
      return updatedGoals;
    });
  };

  const deleteGoalHandler = (goalId) => {
    setGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No goals found.Try adding one.</p>
  );

  if (goals.length > 0) {
    content = (
      <CourseGoalList
        items={goals}
        onDeleteItem={deleteGoalHandler}
      ></CourseGoalList>
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseGoalInput onAddGoal={addGoalHander}></CourseGoalInput>
      </section>
      <section>{content}</section>
    </div>
  );
}

export default App;
