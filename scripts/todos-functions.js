"use strict";

// fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// remove todo from list
const removeTodo = (id) => {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// toggle the completed value todo checkbox
const toggleTodo = (id) => {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
  }
};

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
    saveTodos(todos);
    renderTodos(todos, filters);
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
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// get the DOM elements for list sammary
const generateSummmaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");

  const todoText = incompleteTodos.length === 1 ? "todo" : "todos";
  summary.textContent = `You have ${incompleteTodos.length} ${todoText} left`;

  return summary;
};

// render application todos based on filters
const renderTodos = (todos, filters) => {
  const todosEl = document.querySelector("#todos");
  const filterTodos = todos.filter(
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
