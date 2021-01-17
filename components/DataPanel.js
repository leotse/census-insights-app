import styles from "../styles/DataPanel.module.css";

import classnames from "classnames";

export default function DataPanel({ align = "topLeft", children = [] }) {
  return (
    <div
      className={classnames({
        [styles.dataPanel]: true,
        [styles.top]: align.toLowerCase().indexOf("top") >= 0,
        [styles.bottom]: align.toLowerCase().indexOf("bottom") >= 0,
        [styles.left]: align.toLowerCase().indexOf("left") >= 0,
        [styles.right]: align.toLowerCase().indexOf("right") >= 0,
      })}
    >
      {children}
    </div>
  );
}
