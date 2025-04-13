import { useState } from "react";

const Algoritm = (algoritm) => {
  const [starter, setStarter] = useState(0);

  let counter = 0;
  let intervalId;

  function startCounter() {
    intervalId = setInterval(function () {
      counter++;
      console.log("Counter:", counter);
      setStarter(starter + 0.01)
      if (counter >= 5) {
        clearInterval(intervalId);
        console.log("Counter reached 5, interval cleared.");
      }
    }, 100);
  }

  startCounter();

  return (
    <>
      <h1>{`${starter} X`}</h1>
    </>
  );
};

export default Algoritm;
