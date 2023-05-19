import React from 'react';
import s from './FilterButton.module.css';

function FilterButton(props) {
  return (
    <button
      type="button"
      className={s.button}
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <div className={s.button_text}> {props.name} tasks</div>
    </button>
  );
}

export default FilterButton;
