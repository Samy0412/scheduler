import { useReducer, useEffect } from "react";
//Axios allows to make server resquests like $Ajax in Jquery
import axios from "axios";
import { action } from "@storybook/addon-actions";
//import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  //Constants to define the three different actions
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS_REMAINING = "SET_SPOTS_REMAINING";

  //reducer function
  function reducer(state, action) {
    switch (action.type) {
      case "SET_DAY":
        return {
          ...state,
          day: action.day,
        };
      case "SET_APPLICATION_DATA":
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case "SET_INTERVIEW":
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview },
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };
        return {
          ...state,
          appointments: appointments,
        };
      case "SET_SPOTS_REMAINING":
        return {
          ...state,
          days: action.days,
        };

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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

    return Promise.resolve(axios.put(`/api/appointments/${id}`, appointment))
      .then(
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview,
        })
      )
      .then(dispatch({ type: SET_SPOTS_REMAINING, days }));
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

    return Promise.resolve(axios.delete(`/api/appointments/${id}`, appointment))
      .then(dispatch({ type: SET_INTERVIEW, id, interview: null }))
      .then(dispatch({ type: SET_SPOTS_REMAINING, days }));
  }

  //Function to update the state of the day
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  //Hook enclosing the API requests to be called after painting the DOM
  useEffect(() => {
    var webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = function (event) {
      webSocket.send("ping");
    };
    webSocket.onmessage = function (event) {
      console.log(`Message Received: ${event.data}`);
      const msg = JSON.parse(event.data);
      console.log("message sent in JSON:", msg);
      if (msg.type === "SET_INTERVIEW") {
        console.log("oh an interview has been booked!");
        dispatch(msg);
      }
    };
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        //Updating the state of of the days, appointments and interviewers
        dispatch({
          type: SET_APPLICATION_DATA,
          days,
          appointments,
          interviewers,
        });
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
