import React, { useState } from "react";

import ArrowIcon from "../images/Svg/ArrowIcon";
import styles from "./CustomSelect.module.scss";

function CustomSelect({
  selectValue,
  setSelectValue,
  defaultValue,
  options = [],
}) {
  const [open, setOpen] = useState(false);

  function clickOption(option) {
    setSelectValue(option);
    setOpen(false);
  }

  return (
    <div className={styles.customSelect}>
      <p onClick={() => setOpen(true)}>
        {selectValue
          ? options.find((option) => option.value === selectValue).label
          : defaultValue}{" "}
        <ArrowIcon />
      </p>
      <div
        className={open ? `${styles.dropdown} ${styles.open}` : styles.dropdown}
      >
        <p onClick={() => setOpen(false)} className={styles.default}>
          {defaultValue} <ArrowIcon params={{ width: 10, height: 7 }} />
        </p>
        <div className={styles.options}>
          {options.map((item, index) => (
            <span key={index} onClick={() => clickOption(item.value)}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)}></div>
      )}
    </div>
  );
}

export default CustomSelect;
