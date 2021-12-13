import { useRef, useState, useContext, useEffect, useCallback } from "react";
import Button from "../../generic/Button";
import Form from "../../generic/Form";
import DisplayTime from "../../generic/DisplayTime";
import { TimerContext } from "../../../context/TimerProvider";
import "./Timer.scss";

// Import React Transition Group
import { CSSTransition } from "react-transition-group";

// Import FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Timer = () => {
  // Get Timer Context
  const {
    selectedTimer,
    isRunning,
    setIsRunning,
    setSecElapsed,
    isFinished,
    setIsFinished,
    setMessage,
    stopTime,
    countdownStartTime,
    xyStartTime,
    tabataStartTime,
    setCurrentXYRound,
    totalXYRounds,
    setCurrentTabataRound,
    totalTabataRounds,
    setRestElapsed,
    restTime,
    setIsResting,
    isResting,
    setIsRestPhase,
    isRestPhase,
  } = useContext(TimerContext);

  const [showTimer, setShowTimer] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const nodeRef = useRef();

  // Performs timer cleanup
  const cleanBeforeStart = useCallback(() => {
    if (selectedTimer === "Stopwatch") setSecElapsed(0);
    if (selectedTimer === "Countdown") setSecElapsed(countdownStartTime);
    if (selectedTimer === "XY") {
      setSecElapsed(xyStartTime);
      setCurrentXYRound(1);
    }
    if (selectedTimer === "Tabata") {
      setSecElapsed(tabataStartTime);
      setRestElapsed(restTime);
      setCurrentTabataRound(1);
    }
    setIsFinished(false);
    setIsRunning(false);
    setIsResting(false);
    setIsRestPhase(false);
  }, [
    selectedTimer,
    setIsFinished,
    setSecElapsed,
    countdownStartTime,
    xyStartTime,
    tabataStartTime,
    setIsRunning,
    setCurrentXYRound,
    setCurrentTabataRound,
    restTime,
    setRestElapsed,
    setIsResting,
    setIsRestPhase,
  ]);

  useEffect(() => {
    cleanBeforeStart();
  }, [selectedTimer, cleanBeforeStart]);

  useEffect(() => {
    setMessage("");
  }, [selectedTimer, setMessage]);

  const handleStart = () => {
    if (isFinished) {
      cleanBeforeStart();
    }
    setMessage("Go!");
    selectedTimer === "Tabata" && isRestPhase
      ? setIsResting(true)
      : setIsRunning(true);
  };

  const handlePause = () => {
    selectedTimer === "Tabata" && isRestPhase
      ? setIsResting(false)
      : setIsRunning(false);
    setMessage("Taking a break...");
  };

  const handleReset = () => {
    cleanBeforeStart();
    setMessage("Timer reset.");
  };

  const handleFinish = () => {
    if (selectedTimer === "Stopwatch") setSecElapsed(stopTime);
    if (selectedTimer === "Countdown") setSecElapsed(0);
    if (selectedTimer === "XY") {
      setSecElapsed(0);
      setCurrentXYRound(totalXYRounds);
    }
    if (selectedTimer === "Tabata") {
      setSecElapsed(0);
      setCurrentTabataRound(totalTabataRounds);
      setRestElapsed(0);
      setIsResting(false);
    }
    setIsRunning(false);
    setIsFinished(true);
  };

  return (
    <div className="panel">
      {showTimer && (
        <>
          <Button
            className="settings-btn"
            text={
              <FontAwesomeIcon
                className="settings-icon"
                icon={faCog}
                onClick={() => setShowForm(true)}
              />
            }
          />
          <div className="timer-container">
            <h1>{selectedTimer}</h1>
            <DisplayTime />
            <div className="button-group">
              {((!isRunning && !isResting) || isFinished) && (
                <>
                  <Button
                    className="start-btn"
                    onClick={() => handleStart()}
                    text="Go"
                  />
                  <Button
                    className="round-btn"
                    onClick={() => handleReset()}
                    text="Reset"
                  />
                </>
              )}
              {(isRunning || isResting) && !isFinished && (
                <>
                  <Button
                    className="start-btn"
                    onClick={() => handlePause()}
                    text="Pause"
                  />
                  <Button
                    className="round-btn"
                    onClick={() => handleFinish()}
                    text="Finish"
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}

      <CSSTransition
        in={showForm}
        nodeRef={nodeRef}
        timeout={300}
        classNames="form"
        unmountOnExit
        onEnter={() => setShowTimer(false)}
        onExited={() => setShowTimer(true)}
      >
        <div ref={nodeRef}>
          <Form onSubmit={() => setShowForm(false)} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Timer;
