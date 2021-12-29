import React from "react";

const ToDoCard = ({ toDo }) => {
  const [editing, setEditing] = React.useState(false);
  const [content, setContent] = React.useState(toDo.content);
  const input = React.useRef(null);

  const onEdit = (e) => {
    e.preventDefault();

    setEditing(true);
    input.current.focus();
  };

  const stopEditing = (e) => {
    e.preventDefault();

    setEditing(false);
    setContent(toDo.content);
  };

  return (
    <div className={`todo ${toDo.complete ? "todo--complete" : ""}`}>
      <input type="checkbox" checked={toDo.complete} />

      <input
        type="text"
        ref={input}
        value={content}
        readOnly={!editing}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="todo__controls">
        {!editing ? (
          <>
            {!toDo.complete && <button onClick={onEdit}>Edit</button>}

            <button>Delete</button>
          </>
        ) : (
          <>
            <button onClick={stopEditing}>Cancel</button>

            <button>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
