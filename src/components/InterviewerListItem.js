import React from "react";
import "components/InterviewerListItem.scss";
var classnames = require("classnames");

export default function InterviewerListItem(props) {
  //Add the appropriate class depending if the interviewer is selected or not
  let interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
