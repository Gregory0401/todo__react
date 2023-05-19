import React, { useEffect, useRef, useState } from 'react';
import s from './Todo.module.css';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName('');
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={props.id}>New name for {props.name}</label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div>
        <button
          className={s.button_cancel}
          type="button"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
        <button className={s.button_save} type="submit">
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div>
      <div>
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          className={s.checkbox}
        />
        <label htmlFor={props.id}>{props.name}</label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          className={s.button_edit}
        >
          Edit
        </button>
        <button
          type="button"
          className={s.button_delete}
          onClick={() => props.deleteTask(props.id)}
        >
          X
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
