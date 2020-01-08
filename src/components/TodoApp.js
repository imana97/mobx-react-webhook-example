import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { todoStore } from "../stores";
import Todo from "./Todo";
import Test from "./Test";

const TodoApp = observer(() => {
  useEffect(() => {
    console.log("mounted");
    todoStore.fetchTodos();
  }, []);

  return (
    <div className="col-md-6">
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">
            Todo Counts {todoStore.todos.length}
            <span className="label label-info pull-right">
              To delete an item, double click on it
            </span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={e => todoStore.addTodo(e)}>
            <input
              disabled={todoStore.loading}
              type="text"
              className="form-control"
              value={todoStore.newText}
              placeholder="Add new todo and press Enter"
              onChange={e => todoStore.updateText(e.target.value)}
            />

            <Test />
          </form>

          <br />
          <ul className="list-group">
            {todoStore.todos.map(todo => (
              <Todo todo={todo} key={todo.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default TodoApp;
