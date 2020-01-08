import React from "react";
import { render } from "react-dom";
import TodoApp from "./components/TodoApp";
import Parse from "parse";

Parse.initialize("92834792834");
Parse.serverURL = "https://gparse.herokuapp.com/api";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <TodoApp />
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
