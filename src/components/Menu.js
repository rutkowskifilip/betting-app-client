import "./css/Menu.css";
export const Menu = (current) => {
  return (
    <div className="menu">
      <div className="menu-group">
        <div className="menu-elem flex-center">Current Bets</div>
        <div className="menu-elem flex-center">Table</div>
        <div className="menu-elem flex-center">Bets History</div>
      </div>
      <div className="menu-elem flex-center logout">Logout</div>
    </div>
  );
};
