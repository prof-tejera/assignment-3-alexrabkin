import { useContext, useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import { TimerContext } from "../../../context/TimerProvider";
import { WorkoutContext } from "../../../context/WorkoutProvider";
import { TIMERS } from "../../../utils/constants";
import { isFormInvalid } from "../../../utils/helpers";
import "./Form.scss";

const Form = () => {
  // Get Timer Context
  const {
    selectedForm,
    stopTime,
    countdownStartTime,
    xyStartTime,
    tabataStartTime,
    totalXYRounds,
    totalTabataRounds,
    restTime,
    setIsRunning,
    cleanBeforeStart,
  } = useContext(TimerContext);

  // Get Workout Context
  const { setSequence, resetWorkout } = useContext(WorkoutContext);

  const [inputStopTime, setInputStopTime] = useState(stopTime);
  const [inputCountdownStartTime, setInputCountdownStartTime] =
    useState(countdownStartTime);
  const [inputXYStartTime, setInputXYStartTime] = useState(xyStartTime);
  const [inputTabataStartTime, setInputTabataStartTime] =
    useState(tabataStartTime);
  const [inputXYRounds, setInputXYRounds] = useState(totalXYRounds);
  const [inputTabataRounds, setInputTabataRounds] = useState(totalTabataRounds);
  const [inputRestTime, setInputRestTime] = useState(restTime);
  const [hasError, setHasError] = useState(false);

  const errorMsg = "Please enter a value greater than 0.";

  const handleSave = () => {
    let timerConfig = {};
    setHasError(false);

    if (selectedForm === TIMERS.STOPWATCH) {
      timerConfig = {
        timer: TIMERS.STOPWATCH,
        config: { workSeconds: parseInt(inputStopTime) },
      };
    }

    if (selectedForm === TIMERS.COUNTDOWN) {
      timerConfig = {
        timer: TIMERS.COUNTDOWN,
        config: { workSeconds: parseInt(inputCountdownStartTime) },
      };
    }

    if (selectedForm === TIMERS.XY) {
      timerConfig = {
        timer: TIMERS.XY,
        config: {
          workSeconds: parseInt(inputXYStartTime),
          rounds: parseInt(inputXYRounds),
        },
      };
    }

    if (selectedForm === TIMERS.TABATA) {
      timerConfig = {
        timer: TIMERS.TABATA,
        config: {
          workSeconds: parseInt(inputTabataStartTime),
          rounds: parseInt(inputTabataRounds),
          restSeconds: parseInt(inputRestTime),
        },
      };
    }

    if (isFormInvalid(timerConfig)) {
      setHasError(true);
    } else {
      setSequence((sequence) => [...sequence, timerConfig]);
      resetWorkout();
    }
  };

  useEffect(() => {
    setHasError(false);
  }, [selectedForm, setHasError]);

  useEffect(() => {
    resetWorkout();
    cleanBeforeStart();
    setIsRunning(false);
  }, [resetWorkout, setIsRunning, cleanBeforeStart]);

  return (
    <>
      <div className="form">
        <h2>{selectedForm} Settings</h2>

        {selectedForm === TIMERS.STOPWATCH && (
          <Input
            type="number"
            label="Stop Time (s):"
            placeholder="60"
            value={inputStopTime}
            onChange={(s) => setInputStopTime(s)}
          />
        )}

        {selectedForm === TIMERS.COUNTDOWN && (
          <Input
            type="number"
            label="Start Time (s):"
            placeholder="60"
            value={inputCountdownStartTime}
            onChange={(s) => setInputCountdownStartTime(s)}
          />
        )}

        {selectedForm === TIMERS.XY && (
          <>
            <Input
              type="number"
              label="Time Per Round (s):"
              placeholder="30"
              value={inputXYStartTime}
              onChange={(s) => setInputXYStartTime(s)}
            />
            <Input
              type="number"
              label="Rounds:"
              placeholder="3"
              value={inputXYRounds}
              onChange={(r) => setInputXYRounds(r)}
            />
          </>
        )}

        {selectedForm === TIMERS.TABATA && (
          <>
            <Input
              type="number"
              label="Work Time (s):"
              placeholder="20"
              value={inputTabataStartTime}
              onChange={(s) => setInputTabataStartTime(s)}
            />
            <Input
              type="number"
              label="Rest Time (s):"
              placeholder="10"
              value={inputRestTime}
              onChange={(s) => setInputRestTime(s)}
            />
            <Input
              type="number"
              label="Rounds:"
              placeholder="3"
              value={inputTabataRounds}
              onChange={(r) => setInputTabataRounds(r)}
            />
          </>
        )}
        <div className="button-group">
          <Button className="round-btn" text="Add" onClick={handleSave} />
        </div>
        {hasError && <div className="error-message">{errorMsg}</div>}
      </div>
    </>
  );
};

export default Form;
