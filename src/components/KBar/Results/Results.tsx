import classNames from "classnames";
import { type Action, KBarResults, NO_GROUP, useMatches } from "kbar";
import React from "react";

import styles from "./Results.module.scss";

const ResultItem = React.forwardRef(function ResultItem(
  {
    action,
    active,
  }: {
    action: Action;
    active: boolean;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        { [styles.resultItemActive]: active },
        styles.resultItem,
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
          {action.shortcut.map((sc: string) => (
            <kbd key={sc}>{sc}</kbd>
          ))}
        </div>
      ) : null}
    </div>
  );
});

export const Results = () => {
  const groups = useMatches();

  return (
    <KBarResults
      items={groups.results.filter((i) => i !== NO_GROUP)}
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
