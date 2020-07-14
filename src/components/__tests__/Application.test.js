import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    //Makes sure the page is loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Defines the container as the <article> element that contains each appointment
    const appointments = getAllByTestId(container, "appointment");
    //Defines the first appointment on monday(12pm in axios.js)that is empty to add a new one
    const appointment = appointments[0];

    //Simulates the user clicking on the Add button
    fireEvent.click(getByAltText(appointment, "Add"));

    //Simulates the user entering its name in the imput field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //Simulates the user choosing an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //Simulates the user cliking on the save button
    fireEvent.click(getByText(appointment, "Save"));

    //Expects to see "Saving" after clicking
    expect(getByText(appointment, /Saving.../i)).toBeInTheDocument();

    //Waits for the "Saving" animation to disappear
    await waitForElementToBeRemoved(() => getByText(appointment, /Saving.../i));

    //Expects to see the name of the student for the corresponding appointment
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    //Defines the container as the <li> element containing the days
    const days = getAllByTestId(container, "day");
    //Looks for the day containing "Monday"
    const monday = days.find((day) => queryByText(day, "Monday"));

    //Expects to see "no spots reamining" for monday
    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });
});
