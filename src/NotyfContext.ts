import React from "react";
import { Notyf } from "notyf";

export default React.createContext(
  new Notyf({
    duration: 3500,
    position: {
      x: "center",
      y: "top",
    },
    types: [
      {
        type: "success",
        background: "var(--color-notification)",
      },
    ],
  })
);
