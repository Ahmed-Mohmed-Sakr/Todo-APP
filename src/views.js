import { getFilters } from "./filters";
import { getTodos, toggleTodo, removeTodo } from "./todos";

// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {
  const todosEl = document.querySelector("#todos");
  const filters = getFilters();

  const filterTodos = getTodos().filter(
    (todo) =>
      todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) &&
      (!filters.hideCompleted || !todo.completed)
  );

  const incompleteTodos = filterTodos.filter((todo) => !todo.completed);

  todosEl.innerHTML = "";

  todosEl.appendChild(generateSummmaryDOM(incompleteTodos));

  if (filterTodos.length > 0) {
    filterTodos.forEach((todo) => {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.textContent = "No to-dos to show";
    todosEl.appendChild(messageEl);
  }
};

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
// get the DOM elements for an individal note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkboxEl = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // setup todo checkbox
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.checked = todo.completed;
  containerEl.appendChild(checkboxEl);
  checkboxEl.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  //setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // setup the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummmaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");

  const todoText = incompleteTodos.length === 1 ? "todo" : "todos";
  summary.textContent = `You have ${incompleteTodos.length} ${todoText} left`;

  return summary;
};

// Make sure to set up the exports
export { generateSummmaryDOM, renderTodos, generateTodoDOM };
