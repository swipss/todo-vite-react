import React, { useState, useEffect } from "react";

function Timer({
  setIsPomodoroOpen,
}: {
  setIsPomodoroOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: any;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="pomodoro">
      <p>
        The goal of using a Pomodoro timer is to improve productivity and focus
        by breaking down work into smaller, more manageable tasks. It helps to
        prevent burnout and mental fatigue that can come from long periods of
        work without breaks. Additionally, it allows users to measure their work
        output more accurately by providing them with a structured approach to
        time management.
      </p>
      <h1>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</h1>
      <div className="pomodoro-buttons">
        {isRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        {!isRunning && <button onClick={handleReset}>Reset</button>}
      </div>
      <p
        onClick={() => setIsPomodoroOpen(false)}
        style={{
          cursor: "pointer",
        }}
      >
        Hide
      </p>
    </div>
  );
}

export default Timer;
