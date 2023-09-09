import React, { useEffect, useState } from 'react';
import './Clock.css';

const Clock = (props) => {
  console.log(props.timezone);
  const [ctime, SetCtime] = useState(epochToTimestamp(props.timezone));

  // Function to convert an epoch timestamp to a human-readable timestamp
  function epochToTimestamp(epoch) {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    return date.toLocaleTimeString();
  }

  useEffect(() => {
    // Function to update the current time
    function updateTime() {
      const currentTime = new Date().toLocaleTimeString();
      SetCtime(currentTime);
    }

    // Create an interval to update the time every second
    const intervalId = SetCtime(updateTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // epoch to time stamp
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update the current time every second based on props.timestamp
    const intervalId = setInterval(() => {
      setCurrentTime(epochToTimestamp(props.timezone));
    }, 1000);
    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [props.timezone]);

  return (
    <div className="App">
      <div className='clockbg flex justify-center items-center w-32'><br/>
        <span className='font-bold text-white text-4xl'>{ctime}</span>
      </div>
    </div>
  );
};

export default Clock;
