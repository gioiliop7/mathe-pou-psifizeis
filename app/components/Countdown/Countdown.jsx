import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState(null);
  const [countdownExists, setExistance] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown("Countdown complete!");
        setExistance(false);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}Η ${hours}Ω ${minutes}Λ ${seconds}Δ`);
        setExistance(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  console.log(countdownExists);

  return (
    <>
      {countdownExists && (
        <p className="text-base text-blue-700 text-center font-bold">
          Επόμενη εκλογική αναμέτρηση
        </p>
      )}
      <div className="bg-blue-300 w-full mx-auto flex justify-center max-w-[300px] py-4 text-white text-3xl font-bold rounded-xl text-center">
        {countdown}
      </div>
    </>
  );
};

export default Countdown;
