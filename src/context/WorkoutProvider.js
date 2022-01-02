import { useState, createContext, useEffect, useCallback } from "react";
import { calculateTotalWorkout } from "../utils/helpers";

export const WorkoutContext = createContext({});

const WorkoutProvider = ({ children }) => {
  const [sequence, setSequence] = useState([]);
  const [timerIndex, setTimerIndex] = useState(0);
  const [isLastTimer, setIsLastTimer] = useState(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [totalWorkout, setTotalWorkout] = useState(0);

  useEffect(() => {
    setTotalWorkout(calculateTotalWorkout(sequence));
  }, [sequence]);

  // Reset the workout
  const resetWorkout = useCallback(() => {
    setTimerIndex(0);
    setIsLastTimer(false);
    setIsWorkoutComplete(false);
  }, [setTimerIndex, setIsLastTimer, setIsWorkoutComplete]);

  // Flags the last timer
  useEffect(() => {
    if (timerIndex === sequence.length - 1) {
      setIsLastTimer(true);
    }
  }, [timerIndex, sequence.length]);

  return (
    <WorkoutContext.Provider
      value={{
        sequence,
        setSequence,
        currentTimer: sequence[timerIndex],
        isLastTimer,
        timerIndex,
        setTimerIndex,
        isWorkoutComplete,
        setIsWorkoutComplete,
        resetWorkout,
        totalWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
