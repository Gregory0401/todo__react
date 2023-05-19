import React, { useState } from 'react';
import s from './Form.module.css';

function Form(props) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addTask(name);
    setName('');
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.input_container}>
        <input
          type="text"
          id="new-todo-input"
          className={s.input}
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
          placeholder="write a task"
        />
      </div>

      <div className={s.button_container}>
        <button type="submit" className={s.button}>
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;
