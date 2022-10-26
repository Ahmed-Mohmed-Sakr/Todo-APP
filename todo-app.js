const todos = [
  { text: "walk the dog", completed: true },
  { text: "feed the cat", completed: false },
  { text: "buy groceries", completed: true },
  { text: "go to the gym", completed: false },
  { text: "learn javascript", completed: false },
];

const filters = {
  searchtext: "",
};

const renderTodos = function (todos, filters) {
  const filterTodos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchtext.toLowerCase());
  });

  document.querySelector("#todos").innerHTML = "";

  const incompleteTodos = filterTodos.filter(function (todo) {
    return !todo.completed;
  });

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

// listen to new todo creation
document.querySelector("#add-note").addEventListener("click", function (e) {
  console.log("add a new todo");
  // e.target.textContent = "yeah";
});

document
  .querySelector("#new-todo-text")
  .addEventListener("input", function (e) {
    console.log(e.target.value);
  });

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchtext = e.target.value;
  renderTodos(todos, filters);
});
