import { from } from 'form-data'; // eslint-disable-line
import './style.css'; // eslint-disable-line
import { ToDoList } from './arr-crud'; // eslint-disable-line
import { Task } from './arr-crud'; // eslint-disable-line
import { dragndrop, renderTasks } from './drag-and-drop.js'; // eslint-disable-line

export const toDoListArr = new ToDoList();

const addToDo = document.querySelector('.add-item');
const clearAllCompleted = document.querySelector('.btn-clear-all');

function setStorage(ToDoArr) {
  localStorage.setItem('ToDo', JSON.stringify(ToDoArr));
}

function getStorage() {
  const ToDoArr = JSON.parse(localStorage.getItem('ToDo'));
  const localArray = ToDoArr.map((item) => new Task(item.description, item.completed, item.index));
  toDoListArr.setNewArr(localArray);
  toDoListArr.arrayChanged();
}

function checkStorage() {
  if (localStorage.length > 0) {
    getStorage();
  } else {
    setStorage(toDoListArr.getTasks());
    window.addEventListener('load', renderTasks(toDoListArr.getTasks()));
  }
}

addToDo.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const newdescription = e.target.value;
    const newindex = toDoListArr.getTasks().length + 1;
    const taskToAdd = new Task(newdescription, false, newindex);
    toDoListArr.addTask(taskToAdd);
    e.target.value = '';
    console.log(toDoListArr.getTasks());
    toDoListArr.arrayChanged();
  }
});

clearAllCompleted.addEventListener('click', () => {
  toDoListArr.clearCompleted();
  toDoListArr.arrayChanged();
});

checkStorage();

export { setStorage }; // eslint-disable-line