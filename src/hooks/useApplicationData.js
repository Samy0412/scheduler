import { useState, useEffect } from "react";
//Axios allows to make server resquests like $Ajax in Jquery
import axios from "axios";
//import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  //Hook to store the state and update it
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const spotsRemaining = (day, appointments) => {
    let appointmentArr = day.appointments;
    let available = 0;
    for (const id of appointmentArr) {
      if (appointments[id].interview === null) {
        available++;
      }
    }
    return available;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => ({
      ...day,
      spots: spotsRemaining(day, appointments),
    }));
    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
    ).then(() => {
      setState({ ...state, appointments, days });
    });
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

    const days = state.days.map((day) => ({
      ...day,
      spots: spotsRemaining(day, appointments),
    }));

    return Promise.resolve(
      axios.delete(`/api/appointments/${id}`, appointment)
    ).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  //Function to update the state of the day
  const setDay = (day) => setState({ ...state, day });
  //Hook enclosing the API requests to be called after painting the DOM
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        //Updating the state of of the days, appointments and interviewers
        setState((prev) => ({
          //...prev" makes sure it it the current version og the state that is copied, not the version of the state at the time of the call
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}
