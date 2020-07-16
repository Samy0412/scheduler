import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  //The form manages his own states (name, interviewer and error)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  //Reset name and interviewer states to null
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  // Reset the name and interviewer states to null and go back to the previous mode
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // Validate if the input field is not blank and if the interviewer has been chosen before saving
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* Prevent the default behavior of the form onSubmit */}
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            //In edit mode we'll see the name in the input field
            value={name}
            // Set the state of the name to what is typed in the field
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          //in edit mode we'll see the interviewer selected
          value={interviewer}
          // Set the interviewer to what is selected
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          {/* If there is no interviewer selected, the Save button will be disabled */}
          {interviewer ? (
            <Button confirm onClick={validate}>
              Save
            </Button>
          ) : (
            <Button confirm disabled onClick={validate}>
              Save
            </Button>
          )}
        </section>
      </section>
    </main>
  );
}
