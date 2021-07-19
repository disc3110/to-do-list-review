import { dragndrop, renderTasks } from './drag-and-drop.js'; // eslint-disable-line
import { checkboxesUpdate } from './status-updates.js'; // eslint-disable-line
import { setStorage } from './index.js'; // eslint-disable-line
import { seeMoreUpdate } from './status-updates.js'; // eslint-disable-line

export class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export class ToDoList {
  constructor(toDoArr = []) {
    this.tasksArr = toDoArr;
  }

  addTask(taskobj) {
    this.tasksArr.push(taskobj);
    setStorage(this.tasksArr);
    return this.tasksArr;
  }

  removeTask(targetindex) {
    const idx = targetindex - 1;
    this.tasksArr = this.tasksArr.filter((taskobj, index) => index !== idx);
    for (let x = 0; x < this.tasksArr.length; x += 1) {
      this.tasksArr[x].index = x + 1;
    }
    setStorage(this.tasksArr);
    return this.tasksArr;
  }

  clearAll() {
    this.tasksArr = [];
  }

  getTasks() {
    return this.tasksArr;
  }

  editArr(targetindex, newdescription) {
    this.tasksArr[targetindex - 1].description = newdescription;
  }

  setNewArr(newArr) {
    this.tasksArr = newArr;
  }

  clearCompleted() {
    this.tasksArr = this.tasksArr.filter((taskobj) => taskobj.completed === false);
    for (let x = 0; x < this.tasksArr.length; x += 1) {
      this.tasksArr[x].index = x + 1;
    }
  }

  arrayChanged() {
    setStorage(this.tasksArr);
    window.addEventListener('load', renderTasks(this.tasksArr));
    window.addEventListener('load', dragndrop(this.tasksArr));
    window.addEventListener('load', checkboxesUpdate(this.tasksArr));
    window.addEventListener('load', seeMoreUpdate(this.tasksArr));
  }
}