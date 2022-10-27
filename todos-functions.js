// fetch existing todos from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// remove todo from list
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// toggle the completed value todo checkbox
const toggleTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
  }
};

// get the DOM elements for an individal note
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement("div");
  const checkboxEl = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // setup todo checkbox
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.checked = todo.completed;
  todoEl.appendChild(checkboxEl);
  checkboxEl.addEventListener("change", function () {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // setup the todo text
  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  // setup the remove button
  removeButton.textContent = "x";
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", function () {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// get the DOM elements for list sammary
const generateSummmaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;

  return summary;
};

// render application todos based on filters
const renderTodos = function (todos, filters) {
  const filterTodos = todos.filter(function (todo) {
    return (
      todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) &&
      (!filters.hideCompleted || !todo.completed)
    );
  });

  const incompleteTodos = filterTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  document
    .querySelector("#todos")
    .appendChild(generateSummmaryDOM(incompleteTodos));

  filterTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};
