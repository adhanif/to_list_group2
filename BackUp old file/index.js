const input = document.querySelector("#to-do-input");
const addButton = document.querySelector("#button-addon2");

const todos = [];

addButton.addEventListener("click", function (e) {
  const todoValue = input.value;
  let todoObject = { value: todoValue, completed: false };

  if (todoValue !== "") {
    todos.push(todoObject);
  }

  input.value = "";
  renderToDoList();
  //console.log(todos);
});

const renderToDoList = () => {
  let todoList = document.getElementById("todo-list");

  while (todoList.firstElementChild) {
    todoList.removeChild(todoList.firstElementChild);
  }

  //console.log(todoList);
  todos.forEach((todo, index) => {
    // Create list item with todo text and buttons
    let listItem = document.createElement("li");
    let todoCompleted = false;
    listItem.className = "list-group-item leftcon container bg-secondary py-3";
    if (todo.completed) {
      listItem.classList.add("completed");
      listItem.classList.remove("text-white");
      todoCompleted = true;
    }
    listItem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
    <div class="col-2">
      <input id="checkbox-${index}" class="form-check-input" type="checkbox" value="" >
    </div>
    <div class="col-8">
      <input 
      value="${
        todo.value
      }" id="editInput" class="bg-secondary border-0 text-center 
      ${todoCompleted ? "done" : "text-white"}" readonly="true" disabled>
    </div>
    <div class="col-2 text-right edit-delete">
      <button id="edit-${index}" type="button" class="btn btn-primary btn-sm" >
        <i id="editIcon" class="fas fa-edit"></i>
      </button>
      <button id="deleteId" type="button" class="btn btn-danger btn-sm mx-2" >
        <i class="fas fa-trash"></i>
      </button>
    </div>
    </div>
    `;

    let checkbox = listItem.querySelector(`#checkbox-${index}`);
    checkbox.checked = todo.completed; //false
    checkbox.addEventListener("click", function (e) {
      todo.completed = this.checked;
      let todoInput = e.target.closest("li").querySelector("#editInput");
      // console.log(todoInput);
      if (this.checked) {
        todoInput.classList.add("completed");
        todoInput.classList.remove("text-white");
        saveDate();
      } else {
        todoInput.classList.remove("completed");
        todoInput.classList.add("text-white");
        saveDate();
      }
    });

    let deleteButton = listItem.querySelector(`#deleteId`);
    deleteButton.addEventListener("click", function (e) {
      const confirmText = "Do you really wanna delete that?";
      if (confirm(confirmText)) {
        e.target.closest("li").remove();
        todos.splice(index, 1);
      } else {
      }
      saveDate();
      // console.log(deleteButton);
      // if (
      //   confirm(
      //     `Are you sure you want to delete this ${todos[index].value} todo?`
      //   )
      // ) {
      //   todos.splice(index, 1);
      //   e.target.closest("li").remove();
      //   saveDate();
      // } else {
      //   saveDate();
      // }
    });

    let editButton = listItem.querySelector(`#edit-${index}`);
    editButton.addEventListener("click", function (e) {
      let inputEdit = e.target.closest("li").querySelector("#editInput");
      const editButtonIcon = e.target.closest("li i");
      // console.log(inputEdit);
      if (inputEdit.getAttribute("readonly")) {
        editButton.focus();
        editButtonIcon.setAttribute("class", "fas fa-check");
        console.log(editButtonIcon);
        editButton.classList.add("btn-success");
        editButton.classList.remove("btn-primary");
        inputEdit.removeAttribute("readonly", true);
        inputEdit.removeAttribute("disabled");
        inputEdit.classList.add("border-1");
        inputEdit.focus();
      } else {
        editButton.focus();
        editButtonIcon.setAttribute("class", "fas fa-edit");
        editButton.classList.remove("btn-success");
        editButton.classList.add("btn-primary");
        inputEdit.focus();
        inputEdit.setAttribute("readonly", true);
        inputEdit.setAttribute("disabled", true);
      }

      todos[index].value = inputEdit.value;
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
    todos.push(savedData);
    renderToDoList();
  }
}

getSavedData();
