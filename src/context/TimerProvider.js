import { useState, createContext } from "react";
import { usePersistedState } from "../utils/hooks";

export const TimerContext = createContext({});

const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTimer, setSelectedTimer] = usePersistedState(
    "selectedTimer",
    "Stopwatch"
  );
  const [secElapsed, setSecElapsed] = useState(0);
  const [stopTime, setStopTime] = usePersistedState("stopTime", 10);
  const [countdownStartTime, setCountdownStartTime] = usePersistedState(
    "countdownStartTime",
    10
  );
  const [xyStartTime, setXYStartTime] = usePersistedState("xyStartTime", 10);
  const [tabataStartTime, setTabataStartTime] = usePersistedState(
    "tabataStartTime",
    10
  );
  const [totalXYRounds, setTotalXYRounds] = usePersistedState(
    "totalXYRounds",
    3
  );
  const [currentXYRound, setCurrentXYRound] = useState(1);
  const [totalTabataRounds, setTotalTabataRounds] = usePersistedState(
    "totalTabataRounds",
    3
  );
  const [currentTabataRound, setCurrentTabataRound] = useState(1);
  const [restTime, setRestTime] = usePersistedState("restTime", 3);
  const [message, setMessage] = useState("");
  const [isResting, setIsResting] = useState(false);
  const [restElapsed, setRestElapsed] = useState(0);
  const [isRestPhase, setIsRestPhase] = useState(false);

  return (
    <TimerContext.Provider
      value={{
        selectedTimer,
        setSelectedTimer,
        isRunning,
        setIsRunning,
        isFinished,
        setIsFinished,
        secElapsed,
        setSecElapsed,
        stopTime,
        setStopTime,
        message,
        setMessage,
        countdownStartTime,
        setCountdownStartTime,
        xyStartTime,
        setXYStartTime,
        tabataStartTime,
        setTabataStartTime,
        totalXYRounds,
        setTotalXYRounds,
        totalTabataRounds,
        setTotalTabataRounds,
        currentXYRound,
        setCurrentXYRound,
        currentTabataRound,
        setCurrentTabataRound,
        restTime,
        setRestTime,
        restElapsed,
        setRestElapsed,
        isResting,
        setIsResting,
        isRestPhase,
        setIsRestPhase,

        timers: [
          { title: "Stopwatch" },
          { title: "Countdown" },
          { title: "XY" },
          { title: "Tabata" },
        ],
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
