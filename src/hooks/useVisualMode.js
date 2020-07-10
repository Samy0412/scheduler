import React, { useState, useEffect } from "react";

export default function useVisualmode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
      const newHistory = history.slice(0, history.length - 1);
      newHistory.push(mode);
      setHistory(newHistory);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    } else {
      setMode(history[0]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}
