const AutoHandler = ({
  autoBetActive,
  setAutoBetActive,
  autoCashOut,
  betActive,
  setAutoChashOut,
  setAutoCashOutBetAmount,
  autoCashOutBetAmount,
}) => {
  return (
    <div className="autoHandler">
      <div className="smallebi">
        <span>Auto Bet</span>
        <div
          onClick={() => setAutoBetActive((pre) => !pre)}
          className={autoBetActive ? "buttonDiv Active" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
      </div>
      <div className={betActive ? "disabledDiv" : "smallebi"}>
        <span>Auto Cash out</span>
        <div
          onClick={() => setAutoChashOut((pre) => !pre)}
          className={autoCashOut ? "buttonDiv Active" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
        <input
          onChange={(e) => setAutoCashOutBetAmount(e.target.value)}
          className="smallAutoInput"
          type="number"
          value={autoCashOutBetAmount}
        />
      </div>
    </div>
  );
};

export default AutoHandler;
