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
    if (props.spots === 0) {
      return "no spots";
    } else if (props.spots === 1) {
      return "1 spot";
    }
    return `${props.spots} spots`;
  };
  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}
