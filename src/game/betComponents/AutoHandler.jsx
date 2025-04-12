const AutoHandler = ({
  autoBetActive,
  setAutoBetActive,
  autoCashOut,
  setAutoChashOut,
}) => {

  return (
    <div className="autoHandler">
      <div className="smallebi">
        <span>Auto Bet</span>
        <div
          onClick={() => setAutoBetActive((pre) => !pre)}
          className={autoBetActive ? "buttonDivActive" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
      </div>
      <div className="smallebi">
        <span>Auto Cash out</span>
        <div
          onClick={() => setAutoChashOut((pre) => !pre)}
          className={autoCashOut ? "buttonDivActive" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
        <span>5.00</span>
      </div>
    </div>
  );
};

export default AutoHandler;
