import React from "react";
// var classnames = require("classnames");

export default function DayListItem(props) {
  // let dayItemClass = classnames({
  //   selected: props.selected,
  // });
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
