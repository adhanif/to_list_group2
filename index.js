const addButton = document.querySelector("#add-button");
const inputField = document.querySelector("#todo-input");
const listContainer = document.querySelector("#todo-list");

// console.log(addButton);
// console.log(inputField);
// console.log(listContainer);

addButton.addEventListener("click", () => {
  if (inputField.value === "") {
    alert("Please enter something!");
  } else {
    render();
  }
  inputField.value = "";

  saveData();
});

const render = () => {
  let li = document.createElement("li");
  li.innerHTML = `
    <div class="todo-item">
        <div class="todo-item-left">
            <input id="todo-check" type="checkbox"/>
        </div>
        <input id="task-input" type="text" value="${inputField.value}" disabled>
        <div class="todo-item-right">
            <i id="todo-edit" class="fas fa-pen"></i>
            <i id="todo-delete" class="fas fa-trash"></i>
        </div>
    </div>
    `;

  listContainer.appendChild(li);
};

listContainer.addEventListener(
  "click",
  (e) => {
    const inputEdit = e.target.closest("li").querySelector("#task-input");
    const checkBtn = e.target.closest("li").querySelector("#todo-check");
    const editButton = e.target.closest("li").querySelector("#todo-edit");
    const editButtonIcon = e.target.closest("li i");
    const deleteBtn = e.target.closest("li").querySelector("#todo-delete");

    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");

      saveData();
    } else if (e.target.id === "todo-check") {
      inputEdit.classList.toggle("checked");

      saveData();
    } else if (e.target.id === "todo-edit") {
      console.log(inputEdit);

      if (inputEdit.getAttribute("disabled")) {
        inputEdit.removeAttribute("disabled");
        editButtonIcon.setAttribute("class", "fas fa-check save");
        inputEdit.classList.add("editMode");
        inputEdit.focus();
      } else {
        if (!inputEdit.value) {
          inputEdit.placeholder = "Enter something";
        } else {
          editButtonIcon.setAttribute("class", "fas fa-pen");
          inputEdit.classList.remove("editMode");
          inputEdit.setAttribute("disabled", true);
        }
        saveData();
      }
    } else if (e.target.id === "todo-delete") {
      const confirmText = "Do you really want to delete that?";

      if (confirm(confirmText)) {
        e.target.closest("li").remove();
      } else {
      }

      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
  const data = localStorage.getItem("data");
  if (data) {
    listContainer.innerHTML = data;
  }
}

loadData();
