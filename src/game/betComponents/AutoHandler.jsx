const AutoHandler = ({ betActive, autoBetControler, setAutoBetControler }) => {
  const { autoBetActive, autoCashOut, autoCashOutBetAmount } = autoBetControler;
  return (
    <div className="autoHandler">
      <div className="smallebi">
        <span>Auto Bet</span>
        <div
          onClick={() =>
            setAutoBetControler((pre) => ({
              ...pre,
              autoBetActive: !pre.autoBetActive,
            }))
          }
          className={autoBetActive ? "buttonDiv Active" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
      </div>
      <div className="smallebi">
        <span>Auto Cash out</span>
        <div
          onClick={() =>
            setAutoBetControler((pre) => ({
              ...pre,
              autoCashOut: !pre.autoCashOut,
            }))
          }
          className={autoCashOut ? "buttonDiv Active" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
        <input
          onChange={(e) =>
            setAutoBetControler((pre) => ({
              ...pre,
              autoCashOutBetAmount: e.target.value,
            }))
          }
          className="smallAutoInput"
          type="number"
          value={autoCashOutBetAmount}
        />
      </div>
    </div>
  );
};

export default AutoHandler;
