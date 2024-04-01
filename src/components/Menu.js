import "./css/Menu.css";
export const Menu = ({ onItemClick }) => {
  const handleItemClick = (event) => {
    onItemClick(event.target.id);
  };
  return (
    <div className="menu">
      <div className="menu-group">
        <div
          id="unbetted"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Unbetted Matches
        </div>
        <div
          id="table"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Table
        </div>
        <div
          id="all"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          All Matches
        </div>
        <div
          id="rules"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Rules
        </div>
      </div>
      <div
        id="logout"
        className="menu-elem flex-center logout"
        onClick={handleItemClick}
      >
        Logout
      </div>
    </div>
  );
};
