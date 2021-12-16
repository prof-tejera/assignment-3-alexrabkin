import { useContext, useEffect } from "react";
import Button from "../../generic/Button";
import DisplayTime from "../../generic/DisplayTime";
import { TimerContext } from "../../../context/TimerProvider";
import { WorkoutContext } from "../../../context/WorkoutProvider";
import { TIMERS } from "../../../utils/constants";
import "./Timer.scss";

// Import FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

const Timer = ({ config }) => {
  // Get Timer Context
  const {
    selectedTimer,
    isRunning,
    setIsRunning,
    setSecElapsed,
    isFinished,
    setMessage,
    stopTime,
    setCurrentXYRound,
    totalXYRounds,
    setCurrentTabataRound,
    totalTabataRounds,
    setRestElapsed,
    setIsResting,
    isResting,
    isRestPhase,
    setTimerConfig,
    cleanBeforeStart,
    finish,
  } = useContext(TimerContext);

  const { resetWorkout, isWorkoutComplete } = useContext(WorkoutContext);

  // Set Timer config
  useEffect(() => {
    if (config) setTimerConfig(config);
  }, [config, setTimerConfig]);

  const handleStart = () => {
    if (isFinished) {
      cleanBeforeStart();
    }
    setMessage("Go!");
    selectedTimer === TIMERS.TABATA && isRestPhase
      ? setIsResting(true)
      : setIsRunning(true);
  };

  const handlePause = () => {
    selectedTimer === TIMERS.TABATA && isRestPhase
      ? setIsResting(false)
      : setIsRunning(false);
    setMessage("Taking a break...");
  };

  const handleReset = () => {
    resetWorkout();
    cleanBeforeStart();
  };

  const handleFinish = () => {
    if (selectedTimer === TIMERS.STOPWATCH) setSecElapsed(stopTime);
    if (selectedTimer === TIMERS.COUNTDOWN) setSecElapsed(0);
    if (selectedTimer === TIMERS.XY) {
      setSecElapsed(0);
      setCurrentXYRound(totalXYRounds);
    }
    if (selectedTimer === TIMERS.TABATA) {
      setSecElapsed(0);
      setCurrentTabataRound(totalTabataRounds);
      setRestElapsed(0);
    }
    finish();
  };

  return (
    <div className="panel">
      <>
        <div className="timer-container">
          <h1>{selectedTimer}</h1>
          <DisplayTime />
          <div className="button-group">
            {((!isRunning && !isResting) || isFinished) && (
              <>
                {!isWorkoutComplete && (
                  <Button
                    className="round-btn"
                    onClick={() => handleStart()}
                    text={
                      <FontAwesomeIcon className="basic-icon" icon={faPlay} />
                    }
                  />
                )}
                <Button
                  className="alt-btn"
                  onClick={() => handleReset()}
                  text="Reset"
                />
              </>
            )}
            {(isRunning || isResting) && !isFinished && (
              <>
                <Button
                  className="round-btn"
                  onClick={() => handlePause()}
                  text={
                    <FontAwesomeIcon className="basic-icon" icon={faPause} />
                  }
                />
                <Button
                  className="alt-btn"
                  onClick={() => handleFinish()}
                  text={
                    <FontAwesomeIcon
                      className="basic-icon"
                      icon={faFastForward}
                    />
                  }
                />
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Timer;
