import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriorityDisplay = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline space-x-1">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faFire}
          className={`pr-1 ${priority > i ? "text-red-400" : "text-slate-400"}`}
        />
      ))}
    </div>
  );
};

export default PriorityDisplay;
