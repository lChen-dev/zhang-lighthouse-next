import React, { useEffect, useState } from 'react';

function Arcprogressbar({ Time, onEnd }: any): React.ReactElement {
  const [timeLeft, setTimeLeft] = useState(Time);

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      if (timeLeft - 1 === 0) {
        onEnd();
        clearInterval(intervalId);
      }
    }, 1000);
    return (): void => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    <div
      style={{ width: '58px', height: '58px', position: 'relative', marginBottom: '37px', marginTop: '-6px' }}
      className="mx-auto"
    >
      <svg
        viewBox="0 0 100 100"
        style={{ transform: 'scale(0.65) translate(-110px, -40px)', position: 'absolute', top: '0' }}
        height="120"
        width="180"
      >
        <path
          id="blue"
          fill="none"
          stroke="#34966D"
          strokeWidth="6"
          strokeDasharray="198"
          strokeDashoffset={(1 - timeLeft / Time) * 198}
          className="blue"
          d="M30,90 A40,40 0 1,1 80,90"
        />
      </svg>
      <div
        style={{ width: '40px', marginTop: '35px', marginRight: '-15px', transform: ' translate(-30px, -16px)' }}
        className=" text-20px font-circular font-bold text-center top-0 right-0 absolute"
      >
        {timeLeft}
      </div>
      <div
        style={{ width: '40px', marginTop: '59px', marginRight: '-15px', transform: ' translate(-30px, -18px)' }}
        className=" text-12px font-circular font-bold text-center top-0 right-0 absolute"
      >
        sec
      </div>
    </div>
  );
}

export default Arcprogressbar;
