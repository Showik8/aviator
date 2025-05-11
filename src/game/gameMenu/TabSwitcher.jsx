import { useState } from "react";
import "../../styles/gameMenu.css";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabSwitcher">
      <button
        className={`tabButton ${activeTab === "all" ? "active" : ""}`}
        onClick={() => handleTabClick("all")}
      >
        All Bets
      </button>
      <button
        className={`tabButton ${activeTab === "my" ? "active" : ""}`}
        onClick={() => handleTabClick("my")}
      >
        My Bets
      </button>
    </div>
  );
};

export default TabSwitcher;
