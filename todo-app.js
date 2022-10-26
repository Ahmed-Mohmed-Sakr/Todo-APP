const todos = [
  { text: "walk the dog", completed: true },
  { text: "feed the cat", completed: false },
  { text: "buy groceries", completed: true },
  { text: "go to the gym", completed: false },
  { text: "learn javascript", completed: false },
];

const filters = {
  searchText: "",
};

const renderTodos = function (todos, filters) {
  const filterTodos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filterTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos").appendChild(summary);

  filterTodos.forEach(function (todo) {
    const newP = document.createElement("p");
    newP.textContent = todo.text;
    document.querySelector("#todos").appendChild(newP);
  });
};

renderTodos(todos, filters);

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
    text: e.target.elements.newTodo.value,
    completed: false,
  });

  renderTodos(todos, filters);
  e.target.elements.newTodo.value = "";
});
