import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import { Document, pdfjs } from "react-pdf";

import { H } from "highlight.run";
import { NO_GROUP } from "kbar/lib/useMatches";
import React, { useState } from "react";

import styles from "./App.module.scss";
import classNames from "classnames";

import resume from "./assets/cameron_brill_resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderResults = () => {
  const groups = useMatches();
  const flattened = React.useMemo(
    () =>
      groups.reduce((acc: any[], curr) => {
        acc.push(curr.name);
        acc.push(...curr.actions);
        return acc;
      }, []),
    [groups]
  );

  return (
    <KBarResults
      items={flattened.filter((i) => i !== NO_GROUP)}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className={styles.groupName}>{item}</div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
};
const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
    }: {
      action: Action;
      active: boolean;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          { [styles.resultItemActive]: active },
          styles.resultItem
        )}
      >
        <div className={styles.resultItemIcon}>
          {action.icon && action.icon}
          <div className={styles.resultItemIconSubtitle}>
            <span>{action.name}</span>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div className={styles.resultItemShortCut}>
            {action.shortcut.map((sc: any) => (
              <kbd key={sc}>{sc}</kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

const getOs = () => {
  if (navigator.userAgent.includes("Mac")) {
    return "⌘+K";
  }
  return "ctrl+K";
};

const App = () => {
  const [showResume, setShowResume] = useState(false);
  const actions = [
    {
      id: "resume",
      name: "Resume",
      shortcut: ["r"],
      keywords: "experience jobs",
      perform: () => {
        setShowResume(!showResume);
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
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator className={styles.animator}>
              <KBarSearch
                className={styles.search}
                placeholder="Type a command or search..."
              />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {showResume && (
          <Document
            onLoadError={(e) => {
              console.error(e);
              setShowResume(false);
            }}
            onSourceError={(e) => {
              console.error(e);
              setShowResume(false);
            }}
            file={resume}
          />
        )}
        <div className={styles.text}>{getOs()}</div>
      </KBarProvider>
      <div className={styles.name}>cameron brill</div>
    </>
  );
};

export default App;
