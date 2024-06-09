import "./css/MainPage.css";
import { Rules } from "./Rules";
import { SamplePoints } from "./SamplePoints";
export const MainPage = (params) => {
  return (
    <div className="flex-center page-main">
      <Rules />
      <SamplePoints />
    </div>
  );
};
