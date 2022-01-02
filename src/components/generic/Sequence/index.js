import { useContext } from "react";
import { WorkoutContext } from "../../../context/WorkoutProvider";
import { TimerContext } from "../../../context/TimerProvider";
import Button from "../Button";
import "./Sequence.scss";

// Import FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Sequence = () => {
  // Get Workout Context
  const { sequence, setSequence, totalWorkout, timerIndex, resetWorkout } =
    useContext(WorkoutContext);

  const { cleanBeforeStart, setIsRunning, isRunning, isResting } =
    useContext(TimerContext);

  // Creates a new array with the selected timer removed
  const removeTimer = (index) => {
    setSequence([...sequence.slice(0, index), ...sequence.slice(index + 1)]);
    resetWorkout();
    cleanBeforeStart();
    setIsRunning(false);
  };

  return (
    <div className="sequence">
      <h2>Workout Sequence</h2>
      <div className="total-display">
        <span className="seq-label">Total Workout: </span>
        <span>{totalWorkout + " seconds"}</span>
      </div>
      {sequence.map((t, index) => (
        <div
          className={
            timerIndex === index ? "seq-item-active" : "seq-item-container"
          }
          key={index}
        >
          <div className="seq-item">
            <div>
              <span className="seq-label">Timer: </span>
              <span>{t.timer}</span>
            </div>

            {t.config.workSeconds && (
              <div>
                <span className="seq-label">Work Seconds: </span>
                <span>{t.config.workSeconds}</span>
              </div>
            )}

            {t.config.restSeconds && (
              <div>
                <span className="seq-label">Rest Seconds: </span>
                <span>{t.config.restSeconds}</span>
              </div>
            )}

            {t.config.rounds && (
              <div>
                <span className="seq-label">Rounds: </span>
                <span>{t.config.rounds}</span>
              </div>
            )}
          </div>
          <Button
            className="close-btn"
            disabled={isRunning || isResting}
            onClick={() => removeTimer(index)}
            text={
              <FontAwesomeIcon
                className={
                  isRunning || isResting ? "close-disabled" : "close-icon"
                }
                icon={faTimes}
              />
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Sequence;
