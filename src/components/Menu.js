import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../axios-instance";
import "./css/Menu.css";

export const Menu = ({ onItemClick }) => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const handleItemClick = (event) => {
    onItemClick(event.target.id);
  };
  const handleLogoutClick = (e) => {
    Cookies.remove("userId");
    Cookies.remove("token");
    updateToken("");
    navigate("/login");
  };
  const admin = parseInt(userId) === 0;
  return (
    <div className="menu">
      <div className="menu-group">
        <div
          id="mainpage"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Strona główna
        </div>
        <div
          id="unbet"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Typuj
        </div>
        <div
          id="table"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Tabela
        </div>
        <div
          id="all"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Wszystkie typy
        </div>
        <div
          id="groups"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Grupy
        </div>
        <div
          id="otherBets"
          className="menu-elem flex-center"
          onClick={handleItemClick}
        >
          Bonusowe typy
        </div>

        {admin ? (
          <>
            <div
              id="addMatch"
              className="menu-elem flex-center"
              onClick={handleItemClick}
            >
              Dodaj mecz
            </div>
            <div
              id="addUser"
              className="menu-elem flex-center"
              onClick={handleItemClick}
            >
              Dodaj użytkownika
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div
        id="logout"
        className="menu-elem flex-center logout"
        onClick={handleLogoutClick}
      >
        Wyloguj
      </div>
    </div>
  );
};
