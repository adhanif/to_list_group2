const input = document.querySelector("#to-do-input");
const addButton = document.querySelector("#button-addon2");

const todos = [];

addButton.addEventListener("click", function () {
  const todoValue = input.value;
  let todoObject = { value: todoValue, completed: false };

  if (todoValue !== "") {
    todos.push(todoObject);
  }

  input.value = "";
  saveDate();
  renderToDoList();
  //console.log(todos);
});

const renderToDoList = () => {
  let todoList = document.getElementById("todo-list");

  while (todoList.firstElementChild) {
    todoList.removeChild(todoList.firstElementChild);
    saveDate();
  }

  //console.log(todoList);

  todos.forEach((todo, index) => {
    // Create list item with todo text and buttons
    let listItem = document.createElement("li");
    listItem.className =
      "list-group-item leftcon container bg-secondary text-white py-3";
    if (todo.completed) {
      listItem.classList.add("completed");
    }
    listItem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
    <div class="col-2">
      <input class="form-check-input" type="checkbox" value="" id="checkbox-${index}">
    </div>
    <div class="col-8">
      <span>${todo.value}</span>
    </div>
    <div class="col-2 text-right edit-delete">
      <button type="button" class="btn btn-primary btn-sm">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="btn btn-danger btn-sm mx-2" id="delete-${index}">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
`;

    let checkbox = listItem.querySelector(`#checkbox-${index}`);
    checkbox.checked = todo.completed;
    checkbox.addEventListener("click", function () {
      todo.completed = this.checked;
      if (this.checked) {
        listItem.classList.add("completed");
        saveDate();
      } else {
        listItem.classList.remove("completed");
        saveDate();
      }
    });

    let deleteButton = listItem.querySelector(`#delete-${index}`);
    deleteButton.addEventListener("click", function (e) {
      e.target.closest("li").remove();
      todos.splice(index, 1);
      saveDate();
    });

    todoList.appendChild(listItem);
    saveDate();
  });
};

function saveDate() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getSavedData() {
  let savedData = JSON.parse(localStorage.getItem("todos"));
  if (savedData) {
    todos.push(...savedData);
    renderToDoList();
  }
}

getSavedData();
