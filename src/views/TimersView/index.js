import { useContext } from "react";

import Button from "../../components/generic/Button";
import Timer from "../../components/generic/Timer";
import { TimerContext } from "../../context/TimerProvider";
import "./TimersView.scss";

const TimersView = () => {
  const { timers, selectedTimer, setSelectedTimer } = useContext(TimerContext);

  // Return selected timer
  const timer = timers.find((t) => t.title === selectedTimer);

  return (
    <div className="timers-view">
      <div className="timer-select">
        {timers.map((timer) => (
          <Button
            className={
              timer.title === selectedTimer
                ? "timer-selected-btn"
                : "timer-select-btn"
            }
            key={timer.title}
            onClick={() => setSelectedTimer(timer.title)}
            text={timer.title}
          />
        ))}
      </div>
      <div>{timer && <Timer />}</div>
    </div>
  );
};

export default TimersView;
