export function getAppointmentsForDay(state, day) {
  const AppointmentsForDay = [];
  const dayObjsArr = state.days.filter((dayObj) => dayObj.name === day);

  if (!state.days.length || !dayObjsArr.length) {
    return [];
  }
  const dayAppointmentsIds = dayObjsArr[0].appointments;
  for (let appointmentId of dayAppointmentsIds) {
    AppointmentsForDay.push(state.appointments[appointmentId]);
  }
  return AppointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  const interviewerObjsArr = state.days.filter((dayObj) => dayObj.name === day);

  if (!state.days.length || !interviewerObjsArr.length) {
    return [];
  }
  const interviewersIds = interviewerObjsArr[0].interviewers;
  for (let interviewerId of interviewersIds) {
    interviewersForDay.push(state.interviewers[interviewerId]);
  }
  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerData = state.interviewers[interview.interviewer];
  const interviewData = { ...interview, interviewer: interviewerData };

  return interviewData;
}
