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
