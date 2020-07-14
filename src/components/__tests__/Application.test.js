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
    //Definies the first appointment on monday(12pm in axios.js)that is empty to add a new one
    const appointment = appointments[0];
    //Simulates the user clicking on the Add
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /Saving.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, /Saving.../i));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const days = getAllByTestId(container, "day");

    const monday = days.find((day) => queryByText(day, "Monday"));

    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });
});
