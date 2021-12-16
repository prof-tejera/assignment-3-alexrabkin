import "./DisplayTime.scss";
import { useContext } from "react";
import { TimerContext } from "../../../context/TimerProvider";
import { formatTime } from "../../../utils/helpers";
import Message from "../Message";

const DisplayTime = () => {
  // Get Timer Context
  const {
    selectedTimer,
    secElapsed,
    currentXYRound,
    currentTabataRound,
    restElapsed,
    isFinished,
    isRestPhase,
    message,
  } = useContext(TimerContext);

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
      <Message value={message} />
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
