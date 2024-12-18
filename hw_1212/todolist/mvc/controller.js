import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((model, view) => {
  const state = new model.State();
  const todoContainer = document.querySelector(`.${view.domstr.listContainer}`);
  const inputbox = document.querySelector(`.${view.domstr.inputBox}`);

  // const toggleComplete = () => {
  //   todoContainer.addEventListener("click", (e) => {
  //     if (e.target.tagName === "LI") {
  //       const todoElement = e.target;
  //       const todoId = todoElement.querySelector("button").id;

  //       // Toggle the 'checked' class in the UI
  //       todoElement.classList.toggle("checked");

  //       // Find and toggle the completed status in the state
  //       const updatedTodo = state.todolist.find((todo) => +todo.id === +todoId);

  //       if (updatedTodo) {
  //         updatedTodo.completed = !updatedTodo.completed;

  //         // Update the completed status on the server
  //         model
  //           .updateTodo(todoId, {
  //             id: updatedTodo.id,
  //             userId: updatedTodo.userId,
  //             title: updatedTodo.title,
  //             completed: updatedTodo.completed,
  //           })
  //           .then(() => {
  //             // Optionally, re-render the list to sync state and DOM
  //             state.todolist = [...state.todolist];
  //           })
  //           .catch((error) => {
  //             console.error("Error updating todo:", error);
  //           });
  //       }
  //     }
  //   });
  // };
  const toggleComplete = () => {
    todoContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const todoElement = e.target; // The clicked list item
        const todoId = todoElement.querySelector("button").id; // Get the task's ID

        // Find the task in the state
        const updatedTodo = state.todolist.find((todo) => +todo.id === +todoId);

        if (updatedTodo) {
          // Toggle the completed status
          updatedTodo.completed = !updatedTodo.completed;

          // Update the DOM to reflect the new status
          todoElement.classList.toggle("checked");

          // Update the status on the API
          model
            .updateTodo(todoId, {
              id: updatedTodo.id,
              userId: updatedTodo.userId,
              title: updatedTodo.title,
              completed: updatedTodo.completed,
            })
            .then(() => {
              // Optionally sync the state if needed
              state.todolist = [...state.todolist];
            })
            .catch((error) => {
              console.error("Error updating todo:", error);
            });
        }
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
          state.todolist = [todo, ...state.todolist]; // The server-generated `id` is now a number
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
