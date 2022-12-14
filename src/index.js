import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";
import { renderTodos } from "./views";

renderTodos();

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderTodos();
});

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = e.target.elements.newTodo.value.trim();

  if (inputText.length > 0) {
    createTodo(inputText);
    renderTodos();
    e.target.elements.newTodo.value = "";
  }
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
  renderTodos();
});

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage
