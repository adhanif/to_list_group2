const input = document.querySelector('#to-do-input');
const addButton = document.querySelector('#button-addon2');

let todos=[]
addButton.addEventListener('click', function() {
  const todoValue = input.value;
  let todoObject={listItem:todoValue, completed:false};
  todos.push(todoObject);
  
  input.value="";
  renderToDoList() 
//   console.log('Input value:', todos);
});