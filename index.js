const input = document.querySelector("#to-do-input");
const addButton = document.querySelector("#button-addon2");

const todos = [];

addButton.addEventListener("click", function () {
  const todoValue = input.value;
  let todoObject = { value: todoValue, completed: false };
  todos.push(todoObject);

  input.value = "";
  renderToDoList();
  //console.log(todos);
});

const renderToDoList = () => {
  let todoList = document.getElementById("todo-list");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  console.log(todoList);

  todos.forEach((todo, index) => {
    // Create list item with todo text and buttons
    let listItem = document.createElement("li");
    listItem.className = "bg-dark text-white text-center py-3";
    listItem.innerText = todo.value;

    todoList.appendChild(listItem);
  });
};
