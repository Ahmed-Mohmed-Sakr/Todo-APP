const todos = [
  { text: "walk the dog", completed: true },
  { text: "feed the cat", completed: false },
  { text: "buy groceries", completed: true },
  { text: "go to the gym", completed: false },
  { text: "learn javascript", completed: false },
];

const incompleteTodos = todos.filter(function (todo) {
  return !todo.completed;
});

const summary = document.createElement("h2");
summary.textContent = `You have ${incompleteTodos.length} todos left`;
document.querySelector("body").appendChild(summary);

todos.forEach(function (todo) {
  const newP = document.createElement("p");
  newP.textContent = todo.text;
  document.querySelector("body").appendChild(newP);
});
