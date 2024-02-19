"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Resume } from "@Components/Resume/Resume";
import { Mask } from "@Components/Mask/Mask";
import { Calendar } from "@Components/Calendar/Calendar";
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

import styles from "./k-bar.module.scss";
import Results from "./Results/Results";

interface KBarProps {
  children?: React.ReactNode;
}

const KBar = ({ children }: KBarProps) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = useCallback(() => setShowModal(false), []);
  const [showCalendar, setShowCalendar] = useState(false);
  const closeCalendar = useCallback(() => setShowCalendar(false), []);

  const [notifier, setNotifier] = useState<Notyf>();

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        closeModal();
        closeCalendar();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [closeModal, closeCalendar]);

  useEffect(() => {
    if (!notifier)
      setNotifier(
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
        }),
      );
  }, [notifier]);

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
        if (!(navigator.clipboard && notifier)) return;
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
      section: "Social Media",
      perform: () => {
        if (!window) return;
        window.open(
          "https://www.youtube.com/channel/UC12W_hVgvbhF0kEn3sf7ECA",
          "_blank",
        );
        H.track("kbar-selected-snowboarding");
      },
    },
    {
      id: "calendly",
      name: "Schedule a Meeting",
      shortcut: ["c"],
      keywords: "schedule",
      perform: () => {
        setShowCalendar(true);
      },
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        if (!window) return;
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
        if (!window) return;
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
        if (!window) return;
        window.open("https://www.linkedin.com/in/cameronbrill/", "_blank");
        H.track("kbar-selected-linkedin");
      },
    },
  ];
  return (
    <>
      {showModal && (
        <Mask onClick={closeModal}>
          <Resume visible={showModal} />
        </Mask>
      )}
      {showCalendar && (
        <Mask onClick={closeCalendar} className={styles.container}>
          <Calendar />
        </Mask>
      )}
      <KBarProvider actions={actions}>
        <KBarPortal>
          <div
            onClick={(e: { stopPropagation: () => void }) =>
              e.stopPropagation()
            }
            onKeyUp={(e: { stopPropagation: () => void }) =>
              e.stopPropagation()
            }
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
                <Results />
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
