import React, { useEffect, useState } from "react";

const CommingSoon = () => {
  const [time, setTime] = useState({
    days: 9,
    hours: 2,
    minutes: 2,
    seconds: 11,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }
        if (days < 0) {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container d-flex flex-column justify-content-center align-items-center vh-100 text-white bg-dark">
      <header className="mb-4 text-center display-4 fw-bold fs-1 font-bold">Coming Soon</header>
      <p className="text-center mb-5 w-75">
        We are excited to announce that we will be launching soon
        <br/>
         and can't wait to share our new platform with you.
      </p>
      <div className="d-flex justify-content-center gap-4 mb-5 border rounded p-3 w-50 shadow-lg ">
        <div className="text-center">
          <span className="d-block display-1 fw-bold">{time.days < 10 ? `0${time.days}` : time.days}</span>
          <span className="text-uppercase">Days</span>
        </div>
        <div className="text-center">
          <span className="d-block display-1 fw-bold">{time.hours < 10 ? `0${time.hours}` : time.hours}</span>
          <span className="text-uppercase">Hours</span>
        </div>
        <div className="text-center">
          <span className="d-block display-1 fw-bold">{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>
          <span className="text-uppercase">Minutes</span>
        </div>
        <div className="text-center">
          <span className="d-block display-1 fw-bold">{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
          <span className="text-uppercase">Seconds</span>
        </div>
      </div>
      <div className="w-50 text-center">
        <p className="mb-3">Subscribe now to get the latest updates!</p>
        <div className="input-group ">
          <input type="email" className="form-control w-25" placeholder="Enter your email..." />
          <button className="btn btn-primary">Notify Me</button>
        </div>
      </div>
    </section>
  );
};

export default CommingSoon;
