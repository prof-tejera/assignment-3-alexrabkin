import { useContext } from "react";

import Timer from "../../components/generic/Timer";
import Sequence from "../../components/generic/Sequence";
import { WorkoutContext } from "../../context/WorkoutProvider";
import { Link } from "react-router-dom";
import "./WorkoutView.scss";

const WorkoutView = () => {
  const { currentTimer } = useContext(WorkoutContext);

  return (
    <>
      <div className="workout-view">
        <Sequence />

        <Link className="add-link" to="/add">
          Add a Timer
        </Link>

        {currentTimer && <Timer config={currentTimer} />}
      </div>
    </>
  );
};

export default WorkoutView;
