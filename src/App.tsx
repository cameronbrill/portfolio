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

import { useHistory } from "react-router-dom";

import { NO_GROUP } from "kbar/lib/useMatches";
import React, { useState } from "react";

import styles from "./App.module.scss";
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
        style={{
          padding: "12px 16px",
          background: active ? "var(--a1)" : "var(--background)",
          borderLeft: `2px solid ${
            active ? "var(--foreground)" : "transparent"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {action.icon && action.icon}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{action.name}</span>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}>
            {action.shortcut.map((sc: any) => (
              <kbd
                key={sc}
                style={{
                  padding: "4px 6px",
                  background: "rgba(0 0 0 / .1)",
                  borderRadius: "4px",
                }}
              >
                {sc}
              </kbd>
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
  const history = useHistory();
  const [showResume, setShowResume] = useState(false);
  const actions = [
    {
      id: "resume",
      name: "Resume",
      shortcut: ["r"],
      keywords: "experience jobs",
      perform: () => setShowResume(!showResume),
    },
    {
      id: "email",
      name: "Email",
      shortcut: ["e"],
      keywords: "contact",
      perform: () => history.push("/contact"),
    },
    {
      id: "snowboarding",
      name: "Snowboarding",
      shortcut: ["s"],
      keywords: "snow",
      perform: () =>
        window.open(
          "https://www.youtube.com/channel/UC12W_hVgvbhF0kEn3sf7ECA",
          "_blank"
        ),
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => window.open("https://github.com/cameronbrill", "_blank"),
    },
    {
      id: "devpost",
      name: "Devpost",
      shortcut: ["d"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => window.open("https://devpost.com/cameronbrill", "_blank"),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["l"],
      keywords: "social professional",
      section: "Social Media",
      perform: () =>
        window.open("https://www.linkedin.com/in/cameronbrill/", "_blank"),
    },
  ];

  return (
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
        <Document file="https://cameronbrill.me/public/cameron_brill_resume.pdf" />
      )}
      <div className={styles.text}>{getOs()}</div>
    </KBarProvider>
  );
};

export default App;
