import uuidv4 from "uuid/v4";
// Setup the empty todos array
let todos = [];

// loadTodos
// Arguments: none
// Return value: none
// fetch existing todos from localStorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos;

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (todoText) => {
  if (typeof todoText === "string" && todoText.length > 0) {
    todos.push({
      id: uuidv4(),
      text: todoText,
      completed: false,
    });
    saveTodos(todos);
  }
};

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (id) => {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodos(todos);
  }
};

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (id) => {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    saveTodos();
  }
};

loadTodos();
// Make sure to call loadTodos and setup the exports
export { createTodo, getTodos, removeTodo, toggleTodo, loadTodos };
