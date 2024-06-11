import { removePolishCharacters } from "../../removePolishCharacters";

export const GroupElement = ({ team, index }) => {
  const flag = "/flags/" + removePolishCharacters(team) + ".png";
  return (
    <div className="group-element">
      <div className="flex-center group-position">
        <p>{index + 1}</p>
      </div>
      <div className="flex-center group-flag">
        <img alt="flag" src={flag} className="img-flag" />
      </div>
      <div className="flex-center group-team">
        <p>{team}</p>
      </div>
    </div>
  );
};
