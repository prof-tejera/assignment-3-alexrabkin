import "./DisplayTime.scss";
import { useInterval } from "../../../utils/hooks";
import { useEffect, useContext, useCallback } from "react";
import { TimerContext } from "../../../context/TimerProvider";
import { formatTime } from "../../../utils/helpers";
import Message from "../Message";

const DisplayTime = () => {
  // Get Timer Context
  const {
    selectedTimer,
    isRunning,
    setIsRunning,
    setIsFinished,
    secElapsed,
    setSecElapsed,
    stopTime,
    xyStartTime,
    currentXYRound,
    setCurrentXYRound,
    totalXYRounds,
    tabataStartTime,
    currentTabataRound,
    setCurrentTabataRound,
    totalTabataRounds,
    setMessage,
    restElapsed,
    setRestElapsed,
    isResting,
    setIsResting,
    restTime,
    isFinished,
    setIsRestPhase,
    isRestPhase,
    message,
  } = useContext(TimerContext);

  const finish = useCallback(() => {
    setIsRunning(false);
    setIsResting(false);
    setIsRestPhase(false);
    setIsFinished(true);
    setMessage("You made it to the end!");
  }, [setIsRunning, setIsFinished, setMessage, setIsResting, setIsRestPhase]);

  // Checks for finish condition, or moves to next phase based on timer
  useEffect(() => {
    if (
      (selectedTimer === "Stopwatch" && secElapsed === stopTime) ||
      (selectedTimer === "Countdown" && secElapsed === 0)
    ) {
      finish();
    }

    if (selectedTimer === "XY" && secElapsed === 0) {
      if (currentXYRound === totalXYRounds) {
        finish();
      } else {
        setSecElapsed(xyStartTime);
        setCurrentXYRound(currentXYRound + 1);
      }
    }

    if (selectedTimer === "Tabata" && secElapsed === 0) {
      if (!isRestPhase && !isFinished) {
        setIsResting(true);
        setIsRestPhase(true);
        setIsRunning(false);
      } else if ((isRestPhase || isFinished) && restElapsed === 0) {
        if (currentTabataRound === totalTabataRounds) {
          finish();
        } else {
          setRestElapsed(restTime);
          setSecElapsed(tabataStartTime);
          setIsResting(false);
          setIsRestPhase(false);
          setIsRunning(true);
          setCurrentTabataRound(currentTabataRound + 1);
        }
      }
    }
  }, [
    secElapsed,
    stopTime,
    xyStartTime,
    selectedTimer,
    currentXYRound,
    totalXYRounds,
    setCurrentXYRound,
    setSecElapsed,
    currentTabataRound,
    setCurrentTabataRound,
    tabataStartTime,
    totalTabataRounds,
    isResting,
    restElapsed,
    restTime,
    setIsResting,
    setIsRunning,
    setRestElapsed,
    isFinished,
    setIsRestPhase,
    isRestPhase,
    finish,
  ]);

  // Default interval for timer ticking
  useInterval(
    () => {
      selectedTimer === "Stopwatch"
        ? setSecElapsed(secElapsed + 1)
        : setSecElapsed(secElapsed - 1);
    },
    isRunning && !isResting ? 1000 : null
  );

  // Interval for Tabata resting
  useInterval(
    () => {
      setRestElapsed(restElapsed - 1);
    },
    isResting && !isRunning ? 1000 : null
  );

  // Additional status message for XY/Tabata
  const displayMessage = () => {
    if (selectedTimer === "XY") return "Round: " + currentXYRound;
    if (selectedTimer === "Tabata") {
      if (isRestPhase || isFinished)
        return "Rest - Round: " + currentTabataRound;
      if (!isRestPhase && !isFinished)
        return "Work - Round: " + currentTabataRound;
    }
    return "";
  };

  return (
    <div className="circle">
      <Message delay={2000} value={message} />
      <div className="time">
        {selectedTimer === "Tabata" && isRestPhase
          ? formatTime(restElapsed)
          : formatTime(secElapsed)}
      </div>
      <Message value={displayMessage} />
    </div>
  );
};

export default DisplayTime;
