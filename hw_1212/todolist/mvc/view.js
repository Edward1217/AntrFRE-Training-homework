export const View = (() => {
  const domstr = {
    inputBox: "todolist-input",
    listContainer: "todolist-container",
    deleteBtn: "delete-btn",
  };

  const createTmp = (todoArr) => {
    let tmp = "";
    todoArr.forEach((todo) => {
      const checkedClass = todo.completed ? "checked" : "";
      tmp += `
        <li class="${checkedClass}">
          <span>${todo.id}-${todo.title}</span>
          <button class='delete-btn' id='${todo.id}'>X</button>
        </li>
      `;
    });
    return tmp;
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  return { domstr, render, createTmp };
})();
