import { useEffect, useState } from "react";
import { GroupElement } from "./GroupElement";

export const GroupView = ({ teams, group, enabled, onOrderChange }) => {
  const [orderedTeams, setOrderedTeams] = useState([]);
  const [dragged, setDragged] = useState(null);
  const [mouse, setMouse] = useState([0, 0]);
  const [dropZone, setDropZone] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    onOrderChange(group, orderedTeams, moved);
  }, [dragged]);
  useEffect(() => {
    if (dragged !== null) {
      const elements = Array.from(document.getElementsByClassName("drop-zone"));
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));

      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result > dragged) result += 1;

      setDropZone(result);
    }
  }, [dragged, mouse]);

  useEffect(() => {
    if (teams) {
      setIsLoading(false);
    }
    setOrderedTeams(teams);
    const handler = (e) => {
      setMouse([e.x, e.y]);
    };

    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [teams]);
  useEffect(() => {
    const handler = (e) => {
      if (dragged !== null) {
        e.preventDefault();
        setDragged(null);
        setOrderedTeams((orderedTeams) =>
          reorderList(orderedTeams, dragged, dropZone)
        );
      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  });

  const reorderList = (l, start, end) => {
    setMoved(true);
    if (start < end) return _reorderListForward([...l], start, end);
    else if (start > end) return _reorderListBackward([...l], start, end);
    return l;
  };

  const _reorderListForward = (l, start, end) => {
    const temp = l[start];
    for (let i = start; i < end; i++) {
      l[i] = l[i + 1];
    }
    l[end - 1] = temp;
    return l;
  };

  const _reorderListBackward = (l, start, end) => {
    const temp = l[start];
    for (let i = start; i > end; i--) {
      l[i] = l[i - 1];
    }
    l[end] = temp;
    return l;
  };

  return isLoading ? (
    <p>Ładowanie...</p>
  ) : enabled ? (
    <>
      {dragged !== null && (
        <div
          key={orderedTeams[dragged] + dragged}
          className="floating group-element"
          style={{
            // left: `(${mouse[0]}px`,
            top: `${mouse[1]}px`,
          }}
        >
          <GroupElement team={orderedTeams[dragged]} index={dragged} />
        </div>
      )}
      <div className="group-view">
        <div className="group-name flex-center">Grupa {group}</div>
        <div
          className={`group-element drop-zone ${
            dragged === null || dropZone !== 0 ? "hidden" : ""
          }`}
        />
        {orderedTeams.map((team, index) => (
          <div key={team}>
            {dragged !== index && (
              <>
                <div
                  key={team}
                  className="group-element"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setDragged(index);
                  }}
                >
                  <GroupElement key={team} team={team} index={index} />
                </div>
                <div
                  className={`group-element drop-zone ${
                    dragged === null || dropZone !== index + 1 ? "hidden" : ""
                  }`}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="group-view disabled">
      <div className="group-name flex-center">Grupa {group}</div>

      {orderedTeams.map((team, index) => (
        <div key={index} className="group-element">
          <GroupElement team={team} index={index} />
        </div>
      ))}
    </div>
  );
};
