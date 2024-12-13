import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((model, view) => {
  const state = new model.State();
  const todoContainer = document.querySelector(`.${view.domstr.listContainer}`);
  const inputbox = document.querySelector(`.${view.domstr.inputBox}`);

  const toggleComplete = () => {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const todoElement = e.target;
        const todoId = todoElement.querySelector("button").id;

        // Toggle the 'checked' class
        todoElement.classList.toggle("checked");

        // Update the completed status in the state and model
        state.todolist = state.todolist.map((todo) => {
          if (+todo.id === +todoId) {
            todo.completed = !todo.completed;
            model.updateTodo(todoId, { completed: todo.completed });
          }
          return todo;
        });
      }
    });
  };

  const deleteTodo = () => {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.className === view.domstr.deleteBtn) {
        state.todolist = state.todolist.filter(
          (todo) => +todo.id !== +e.target.id
        );
        model.deleteTodo(e.target.id);
      }
    });
  };

  const addTodo = () => {
    inputbox.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && e.target.value.trim() !== "") {
        const newtodo = new model.Todo(e.target.value);

        model.addTodo(newtodo).then((todo) => {
          state.todolist = [todo, ...state.todolist]; // The server-generated `id` is used here
        });

        e.target.value = "";
      }
    });
  };

  const init = () => {
    model.getTodos().then((todolist) => {
      state.todolist = todolist.reverse();
    });
  };

  const bootstrap = () => {
    init();
    deleteTodo();
    addTodo();
    toggleComplete();
  };

  return { bootstrap };
})(Model, View);
