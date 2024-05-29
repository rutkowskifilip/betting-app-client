import "./css/Menu.css";
export const Menu = ({ onItemClick }) => {
  const handleItemClick = (event) => {
    onItemClick(event.target.id);
  };
  const admin = true;
  return (
    <div className="menu">
      <div className="menu-group">
        <div
          id="unbet"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Unbet Matches
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
          id="groups"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Groups
        </div>
        <div
          id="rules"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Rules
        </div>
        {admin ? (
          <>
            <div
              id="addMatch"
              className="menu-elem flex-center"
              onClick={handleItemClick}
            >
              Add Match
            </div>
            <div
              id="addUser"
              className="menu-elem flex-center"
              onClick={handleItemClick}
            >
              Add User
            </div>
          </>
        ) : (
          ""
        )}
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
