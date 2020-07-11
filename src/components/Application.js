import React from "react";
//imports stylesheet
import "components/Application.scss";
//imports needed components
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
//Imports custom hook that manages the state
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();

  //Displays all the interviewers for the selected days
  const interviewers = getInterviewersForDay(state, state.day);

  //Displays all the appointments for the selected day
  const appointmentsList = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      //Adds the interviewer data to the interviewObject
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* Displays the list of days */}
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {/* Displays all the appointments */}
          {appointmentsList}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
