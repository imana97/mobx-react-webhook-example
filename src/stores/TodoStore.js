import { observable, action, runInAction, configure } from "mobx";
import Parse from "parse";
import { ParseMobx } from "../libs/parse-mobx";

configure({ enforceActions: "observed" });

const Todo = Parse.Object.extend("todo");

export default class TodoStore {
  @observable todos = [];
  @observable loading = false;
  @observable newText = "";

  @action
  updateText(val) {
    this.newText = val;
  }

  @action
  async fetchTodos() {
    this.loading = true;
    const todos = await new Parse.Query("todo").find();
    runInAction(() => {
      this.todos = ParseMobx.toParseMobx(todos);
      this.loading = false;
    });
  }

  @action
  async addTodo(event) {
    event.preventDefault();
    this.loading = true;
    const newTodo = await new Todo().set("title", this.newText).save();
    runInAction(() => {
      this.todos.push(ParseMobx.toParseMobx(newTodo));
      this.updateText("");
      this.loading = false;
    });
  }

  @action
  updateTodo(todo, newVal) {
    todo.set("completed", newVal).save();
  }

  @action
  async removeTodo(todo) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      this.loading = true;
      await todo.destroy();
      runInAction(() => {
        ParseMobx.deleteListItem(this.todos, todo);
        this.loading = false;
      });
    }
  }
}
