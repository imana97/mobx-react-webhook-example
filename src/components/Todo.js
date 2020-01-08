import React from "react";
import { observer } from "mobx-react";
import { todoStore } from "../stores";
import moment from "moment";

const Todo = observer(({ todo }) => {
  return (
    <li
      className="list-group-item"
      onDoubleClick={e => todoStore.removeTodo(todo)}
    >
      <h4 className={todo.get("completed") ? "text-muted" : null}>
        {todo.get("title")}
      </h4>
      <input
        type="checkbox"
        className="pull-right"
        checked={todo.get("completed")}
        onChange={e => todoStore.updateTodo(todo, e.target.checked)}
      />

      <small>{moment(todo.updatedAt).fromNow()}</small>
    </li>
  );
});

export default Todo;
