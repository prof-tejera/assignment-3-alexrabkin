import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { WorkoutContext } from "../context/WorkoutProvider";
import { useInterval } from "../utils/hooks";
import { TIMERS } from "../utils/constants";

export const TimerContext = createContext({});

const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(TIMERS.STOPWATCH);
  const [selectedForm, setSelectedForm] = useState(TIMERS.STOPWATCH);
  const [secElapsed, setSecElapsed] = useState(null);
  const [stopTime, setStopTime] = useState(5);
  const [countdownStartTime, setCountdownStartTime] = useState(5);
  const [xyStartTime, setXYStartTime] = useState(5);
  const [tabataStartTime, setTabataStartTime] = useState(5);
  const [totalXYRounds, setTotalXYRounds] = useState(2);
  const [currentXYRound, setCurrentXYRound] = useState(1);
  const [totalTabataRounds, setTotalTabataRounds] = useState(2);
  const [currentTabataRound, setCurrentTabataRound] = useState(1);
  const [restTime, setRestTime] = useState(3);
  const [message, setMessage] = useState("");
  const [isResting, setIsResting] = useState(false);
  const [restElapsed, setRestElapsed] = useState(0);
  const [isRestPhase, setIsRestPhase] = useState(false);
  const [isDirectionDown, setIsDirectionDown] = useState(false);
  const [timerConfig, setTimerConfig] = useState({});
  const { isLastTimer, setTimerIndex, setIsWorkoutComplete } =
    useContext(WorkoutContext);

  // Load timer config, if any
  useEffect(() => {
    if (timerConfig) {
      const { timer, config } = timerConfig;

      if (timer === TIMERS.STOPWATCH) {
        setSelectedTimer(TIMERS.STOPWATCH);
        setStopTime(config.workSeconds);
      }

      if (timer === TIMERS.COUNTDOWN) {
        setSelectedTimer(TIMERS.COUNTDOWN);
        setCountdownStartTime(config.workSeconds);
      }

      if (timer === TIMERS.XY) {
        setSelectedTimer(TIMERS.XY);
        setXYStartTime(config.workSeconds);
        setTotalXYRounds(config.rounds);
      }

      if (timer === TIMERS.TABATA) {
        setSelectedTimer(TIMERS.TABATA);
        setTabataStartTime(config.workSeconds);
        setTotalTabataRounds(config.rounds);
        setRestTime(config.restSeconds);
      }
    }
  }, [
    timerConfig,
    setTabataStartTime,
    setTotalTabataRounds,
    setTotalXYRounds,
    setXYStartTime,
    setCountdownStartTime,
    setStopTime,
    setRestTime,
    setSelectedTimer,
  ]);

  // Performs timer cleanup
  const cleanBeforeStart = useCallback(() => {
    if (selectedTimer === TIMERS.STOPWATCH) {
      setSecElapsed(0);
      setIsDirectionDown(false);
    }
    if (selectedTimer === TIMERS.COUNTDOWN) {
      setSecElapsed(countdownStartTime);
      setIsDirectionDown(true);
    }
    if (selectedTimer === TIMERS.XY) {
      setSecElapsed(xyStartTime);
      setCurrentXYRound(1);
      setIsDirectionDown(true);
    }
    if (selectedTimer === TIMERS.TABATA) {
      setSecElapsed(tabataStartTime);
      setRestElapsed(restTime);
      setCurrentTabataRound(1);
      setIsDirectionDown(true);
    }
    setIsFinished(false);
    setIsResting(false);
    setIsRestPhase(false);
    setMessage("");
  }, [
    selectedTimer,
    setIsFinished,
    setSecElapsed,
    countdownStartTime,
    xyStartTime,
    tabataStartTime,
    setCurrentXYRound,
    setCurrentTabataRound,
    restTime,
    setRestElapsed,
    setIsResting,
    setIsRestPhase,
    setMessage,
  ]);

  // Completes an individual Timer
  const finish = useCallback(() => {
    setIsResting(false);
    setIsRestPhase(false);
    setIsFinished(true);

    if (!isLastTimer) {
      setTimerIndex((timerIndex) => timerIndex + 1);
      cleanBeforeStart();
    } else {
      setMessage("You made it to the end!");
      setIsRunning(false);
      setIsWorkoutComplete(true);
    }
  }, [
    setIsRunning,
    setIsFinished,
    setMessage,
    setIsResting,
    setIsRestPhase,
    isLastTimer,
    setTimerIndex,
    cleanBeforeStart,
    setIsWorkoutComplete,
  ]);

  // Checks for finish condition, or moves to next phase based on timer
  useEffect(() => {
    if (
      selectedTimer === TIMERS.STOPWATCH &&
      secElapsed === stopTime &&
      isRunning &&
      !isFinished &&
      !isDirectionDown
    ) {
      finish();
    }

    if (
      selectedTimer === TIMERS.COUNTDOWN &&
      secElapsed === 0 &&
      isRunning &&
      !isFinished &&
      isDirectionDown
    ) {
      finish();
    }
    if (
      selectedTimer === TIMERS.XY &&
      secElapsed === 0 &&
      isRunning &&
      !isFinished &&
      isDirectionDown
    ) {
      if (currentXYRound === totalXYRounds) {
        finish();
      } else {
        setSecElapsed(xyStartTime);
        setCurrentXYRound(currentXYRound + 1);
      }
    }

    if (
      selectedTimer === TIMERS.TABATA &&
      secElapsed === 0 &&
      !isFinished &&
      isDirectionDown
    ) {
      if (!isRestPhase && isRunning) {
        setIsResting(true);
        setIsRestPhase(true);
        setIsRunning(false);
      } else if (isRestPhase && restElapsed === 0) {
        if (currentTabataRound === totalTabataRounds) {
          setIsRunning(true);
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
    isRunning,
    isDirectionDown,
  ]);

  // Clean up when the Timer changes
  useEffect(() => {
    cleanBeforeStart();
  }, [selectedTimer, cleanBeforeStart]);

  // Default interval for timer ticking
  useInterval(
    () => {
      selectedTimer === TIMERS.STOPWATCH
        ? setSecElapsed(secElapsed + 1)
        : setSecElapsed(secElapsed - 1);
    },
    isRunning && !isResting ? 1000 : null
  );

  // Interval for Tabata Resting
  useInterval(
    () => {
      setRestElapsed(restElapsed - 1);
    },
    isResting && !isRunning ? 1000 : null
  );

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
        setTimerConfig,
        cleanBeforeStart,
        selectedForm,
        setSelectedForm,
        finish,
        timers: [
          { title: TIMERS.STOPWATCH },
          { title: TIMERS.COUNTDOWN },
          { title: TIMERS.XY },
          { title: TIMERS.TABATA },
        ],
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
