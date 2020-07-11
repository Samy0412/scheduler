import React, { useState, useEffect } from "react";
//Axios allows to make server resquests like $Ajax in Jquery
import axios from "axios";

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

export default function Application(props) {
  //Hook to store the state and update it
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }));
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments }));
  }
  //Function to update the state of the day
  const setDay = (day) => setState({ ...state, day });
  //Hook enclosing the API requests to be called after painting the DOM
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      //Updating the state of of the days, appointments and interviewers
      setState((prev) => ({
        //...prev" makes sure it it the current version og the state that is copied, not the version of the state at the time of the call
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Displays all the interviewers for the selected days
  const interviewers = getInterviewersForDay(state, state.day);

  //Displays all the appointments for the selected day
  const appointmentsList = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      //Adds the interviewer data to the interviewObject
      const interview = getInterview(state, appointment.interview);
      console.log("interview:", interview);
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
