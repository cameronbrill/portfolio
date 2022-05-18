import React, { useState } from "react";
import { Resume, Mask } from "@Components/Resume/Resume";
import { H } from "highlight.run";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import styles from "./KBar.module.scss";
import RenderResults from "./Results/Results";

interface KBarProps {
  children?: React.ReactNode;
}

const KBar = ({ children }: KBarProps) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const notifier = new Notyf({
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
  });

  const actions = [
    {
      id: "resume",
      name: "Resume",
      shortcut: ["r"],
      keywords: "experience jobs",
      perform: () => {
        setShowModal(true);
        H.track("kbar-selected-resume");
      },
    },
    {
      id: "email",
      name: "Email",
      shortcut: ["e"],
      keywords: "contact",
      perform: () => {
        /* just copy my email to clipboard */
        navigator.clipboard.writeText("contact@cameronbrill.me");
        notifier.success("copied email to clipboard");
        H.track("kbar-selected-email");
      },
    },
    {
      id: "snowboarding",
      name: "Snowboarding",
      shortcut: ["s"],
      keywords: "snow",
      perform: () => {
        window.open(
          "https://www.youtube.com/channel/UC12W_hVgvbhF0kEn3sf7ECA",
          "_blank"
        );
        H.track("kbar-selected-snowboarding");
      },
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        window.open("https://github.com/cameronbrill", "_blank");
        H.track("kbar-selected-github");
      },
    },
    {
      id: "devpost",
      name: "Devpost",
      shortcut: ["d"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        window.open("https://devpost.com/cameronbrill", "_blank");
        H.track("kbar-selected-devpost");
      },
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["l"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        window.open("https://www.linkedin.com/in/cameronbrill/", "_blank");
        H.track("kbar-selected-linkedin");
      },
    },
  ];
  return (
    <>
      {showModal && (
        <Mask closeResume={closeModal}>
          <Resume visible={showModal} />
        </Mask>
      )}
      <KBarProvider actions={actions}>
        <KBarPortal>
          <div
            onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
            style={{ zIndex: 2147483647, position: "absolute" }}
          >
            <KBarPositioner
              style={{ padding: "0 !important", paddingTop: "14vh" }}
            >
              <KBarAnimator className={styles.animator}>
                <KBarSearch
                  className={styles.search}
                  placeholder="Type a command or search..."
                />
                <RenderResults />
              </KBarAnimator>
            </KBarPositioner>
          </div>
        </KBarPortal>
        {children}
      </KBarProvider>
    </>
  );
};

export default KBar;
