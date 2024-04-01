import { CurrentMatches } from "../components/CurrentMatches";
import { Menu } from "../components/Menu";

export const Home = (params) => {
  return (
    <>
      <Menu />
      <CurrentMatches />
    </>
  );
};
