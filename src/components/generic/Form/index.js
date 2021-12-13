import { useContext, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { TimerContext } from "../../../context/TimerProvider";
import PropTypes from "prop-types";
import "./Form.scss";

const Form = ({ onSubmit }) => {
  // Get Timer Context
  const {
    selectedTimer,
    stopTime,
    setStopTime,
    countdownStartTime,
    setCountdownStartTime,
    xyStartTime,
    setXYStartTime,
    tabataStartTime,
    setTabataStartTime,
    setSecElapsed,
    setIsRunning,
    setMessage,
    totalXYRounds,
    setTotalXYRounds,
    totalTabataRounds,
    setTotalTabataRounds,
    setCurrentXYRound,
    setCurrentTabataRound,
    restTime,
    setRestTime,
    setIsResting,
    setIsRestPhase,
  } = useContext(TimerContext);

  const [inputStopTime, setInputStopTime] = useState(stopTime);
  const [inputCountdownStartTime, setInputCountdownStartTime] =
    useState(countdownStartTime);
  const [inputXYStartTime, setInputXYStartTime] = useState(xyStartTime);
  const [inputTabataStartTime, setInputTabataStartTime] =
    useState(tabataStartTime);
  const [inputXYRounds, setInputXYRounds] = useState(totalXYRounds);
  const [inputTabataRounds, setInputTabataRounds] = useState(totalTabataRounds);
  const [inputRestTime, setInputRestTime] = useState(restTime);

  const handleSave = () => {
    if (selectedTimer === "Stopwatch") {
      setStopTime(parseInt(inputStopTime));
      setSecElapsed(0);
    }

    if (selectedTimer === "Countdown") {
      setCountdownStartTime(parseInt(inputCountdownStartTime));
      setSecElapsed(countdownStartTime);
    }

    if (selectedTimer === "XY") {
      setXYStartTime(parseInt(inputXYStartTime));
      setSecElapsed(xyStartTime);
      setTotalXYRounds(parseInt(inputXYRounds));
      setCurrentXYRound(1);
    }

    if (selectedTimer === "Tabata") {
      setTabataStartTime(parseInt(inputTabataStartTime));
      setSecElapsed(tabataStartTime);
      setTotalTabataRounds(parseInt(inputTabataRounds));
      setRestTime(parseInt(inputRestTime));
      setCurrentTabataRound(1);
      setIsResting(false);
      setIsRestPhase(false);
    }

    setIsRunning(false);
    setMessage("Timer updated.");
    onSubmit();
  };

  return (
    <>
      <div className="form">
        <h2>{selectedTimer} Settings</h2>

        {selectedTimer === "Stopwatch" && (
          <Input
            label="Stop Time (s):"
            placeholder="60"
            value={inputStopTime}
            onChange={(s) => setInputStopTime(s)}
          />
        )}

        {selectedTimer === "Countdown" && (
          <Input
            label="Start Time (s):"
            placeholder="60"
            value={inputCountdownStartTime}
            onChange={(s) => setInputCountdownStartTime(s)}
          />
        )}

        {selectedTimer === "XY" && (
          <>
            <Input
              label="Time Per Round (s):"
              placeholder="30"
              value={inputXYStartTime}
              onChange={(s) => setInputXYStartTime(s)}
            />
            <Input
              label="Rounds:"
              placeholder="3"
              value={inputXYRounds}
              onChange={(r) => setInputXYRounds(r)}
            />
          </>
        )}

        {selectedTimer === "Tabata" && (
          <>
            <Input
              label="Work Time (s):"
              placeholder="20"
              value={inputTabataStartTime}
              onChange={(s) => setInputTabataStartTime(s)}
            />
            <Input
              label="Rest Time (s):"
              placeholder="10"
              value={inputRestTime}
              onChange={(s) => setInputRestTime(s)}
            />
            <Input
              label="Rounds:"
              placeholder="3"
              value={inputTabataRounds}
              onChange={(r) => setInputTabataRounds(r)}
            />
          </>
        )}
        <div className="button-group">
          <Button className="round-btn" text="Back" onClick={onSubmit} />
          <Button className="start-btn" text="Save" onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
