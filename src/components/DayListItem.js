import React from "react";
import "components/DayListItem.scss";
var classnames = require("classnames");

export default function DayListItem(props) {
  let dayClass = classnames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = () => {
    switch (props.spots) {
      case 0:
        return "no spots";
        break;
      case 1:
        return "1 spot";
        break;
      default:
        return `${props.spots} spots`;
    }
  };
  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}
