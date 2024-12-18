export const API = (() => {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  //const baseUrl = "http://localhost:3000";
  const todoUrl = "todos";

  const getTodos = () =>
    fetch([baseUrl, todoUrl].join("/")).then((response) => response.json());

  const addTodo = (newtodo) =>
    fetch([baseUrl, todoUrl].join("/"), {
      method: "POST",
      body: JSON.stringify(newtodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, todoUrl, id].join("/"), {
      method: "DELETE",
    });

  const updateTodo = (id, updatedData) => {
    // Ensure the ID is treated as a string for the URL
    const idString = String(id);

    return fetch(`${baseUrl}/${todoUrl}/${idString}`, {
      method: "PUT", // Or PATCH, depending on your use case
      body: JSON.stringify(updatedData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating todo:", error.message);
      });
  };

  return {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
  };
})();
