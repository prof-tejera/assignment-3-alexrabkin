import { useContext } from "react";

import Button from "../../components/generic/Button";
import Form from "../../components/generic/Form";
import Sequence from "../../components/generic/Sequence";
import { TimerContext } from "../../context/TimerProvider";
import { Link } from "react-router-dom";
import "./TimersView.scss";

const TimersView = () => {
  const { timers, selectedForm, setSelectedForm } = useContext(TimerContext);

  // Return selected timer
  const timer = timers.find((t) => t.title === selectedForm);

  return (
    <div className="timers-view">
      <Sequence />
      <Link className="back-link" to="/">
        Back to Workout
      </Link>
      <div className="timers-container">
        <div className="timer-select">
          {timers.map((timer) => (
            <Button
              className={
                timer.title === selectedForm
                  ? "timer-selected-btn"
                  : "timer-select-btn"
              }
              key={timer.title}
              onClick={() => setSelectedForm(timer.title)}
              text={timer.title}
            />
          ))}
        </div>
        <div className="panel">{timer && <Form />}</div>
      </div>
    </div>
  );
};

export default TimersView;
