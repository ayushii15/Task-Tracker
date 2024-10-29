import React, { useState, useEffect } from 'react';

function TimeTracker({ task, onUpdateTime }) {
  const [isTracking, setIsTracking] = useState(false);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent || 0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStartStop = () => {
    if (isTracking) {
      clearInterval(intervalId);
      onUpdateTime(task.id, timeSpent); 
      setIsTracking(false);
    } else {
      const id = setInterval(() => {
        setTimeSpent(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
      setIsTracking(true);
    }
  };

  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId); 
    };
  }, [intervalId]);

  return (
    <div className="time-tracker">
      <button onClick={handleStartStop}>{isTracking ? 'Stop' : 'Start'}</button>
      <p>Time spent: {formatTime(timeSpent)}</p>
      {isTracking && (
        <p>The time taken on this task is: {formatTime(timeSpent)}</p>
      )}
    </div>
  );
}

export default TimeTracker;
