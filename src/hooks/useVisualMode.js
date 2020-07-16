import { useState } from "react";

//Function that stores the history of modes and allows transitions and back

export default function useVisualmode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transition to one mode to another
  const transition = (mode, replace = false) => {
    // Check if we want to replace the last mode in the history array with the one passed as argument
    if (replace) {
      setMode(mode);
      // Replace the last mode of the history array with the one passed as argument
      setHistory((prev) => [...prev.slice(0, [...prev].length - 1), mode]);
    } else {
      setMode(mode);
      // Add the mode at the end of the history array
      setHistory((prev) => [...prev, mode]);
    }
  };

  //Go back to the previous mode
  const back = () => {
    //Check if there is more than one mode in the history array
    if (history.length > 1) {
      setMode(history[history.length - 2]);

      setHistory((prev) => [...prev.slice(0, [...prev].length - 1)]);
    } else {
      //If not more than one mode in the history array, then go back to initial mode
      setMode(history[0]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}
