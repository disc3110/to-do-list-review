/* eslint-disable  no-restricted-syntax, no-loop-func */

import { checkboxesUpdate } from './status-updates.js'; // eslint-disable-line
import { setStorage } from './index.js'; // eslint-disable-line
import { ToDoList } from './arr-crud'; // eslint-disable-line
import { toDoListArr } from './index.js'; // eslint-disable-line

const showTasks = document.querySelector('#tasks');

function renderTasks(tasksArr) {
  showTasks.innerHTML = '';
  tasksArr.forEach((task) => {
    let checked = '';
    if (task.completed) {
      checked = 'checked';
    }
    showTasks.innerHTML += `<li draggable="true" class="task pos-${task.index}" data-index="${task.index}"><div class="task-to-do"><input class="checkbox" data-index="${task.index}" type="checkbox" ${checked}> ${task.description}</div><button class="btn-more" data-index="${task.index}">more<i class="fas fa-info-circle"></i></button></li>`;
  });
}

function arraymove(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

function dragndrop(oriArr) {
  const items = document.querySelectorAll('.task');
  let current = null;

  for (const i of items) {
    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.addEventListener('dragstart', function () {
      current = this;
      for (const it of items) {
        if (it !== current) { it.classList.add('hint'); }
      }
    });

    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.addEventListener('dragenter', function () {
      if (this !== current) { this.classList.add('active'); }
    });

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.addEventListener('dragleave', function () {
      this.classList.remove('active');
    });

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.addEventListener('dragend', () => {
      for (const it of items) {
        it.classList.remove('hint');
        it.classList.remove('active');
      }
    });

    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });

    // (B7) ON DROP - DO SOMETHING
    i.addEventListener('drop', function (evt) {
      evt.preventDefault();
      if (this !== current) {
        const currentIndex = current.dataset.index;
        const thisIndex = this.dataset.index;

        arraymove(oriArr, currentIndex - 1, thisIndex - 1);

        for (let x = 0; x < oriArr.length; x += 1) {
          oriArr[x].index = x + 1;
        }

        toDoListArr.setNewArr(oriArr);
        toDoListArr.arrayChanged();
      }
    });
  }
}

export { renderTasks }; // eslint-disable-line
export { dragndrop }; // eslint-disable-line
