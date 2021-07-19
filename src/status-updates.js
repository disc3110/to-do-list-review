/* eslint-disable  no-restricted-syntax */

import { ToDoList } from './arr-crud'; // eslint-disable-line
import { toDoListArr } from './index.js'; // eslint-disable-line
import { setStorage } from './index.js'; // eslint-disable-line

function checkboxesUpdate(currArr) {
  const checkbox = document.querySelectorAll('.checkbox');

  for (const box of checkbox) {
    box.addEventListener('change', () => {
      const currentIndex = box.dataset.index;

      if (box.checked) {
        currArr[currentIndex - 1].completed = true;
        toDoListArr.setNewArr(currArr);
        toDoListArr.arrayChanged();
      } else {
        currArr[currentIndex - 1].completed = false;
        toDoListArr.setNewArr(currArr);
        toDoListArr.arrayChanged();
      }
    });
  }
}
function seeMoreUpdate() {
  const seeMore = document.querySelectorAll('.btn-more');

  for (const cmorebttn of seeMore) {
    cmorebttn.addEventListener('click', () => {
      const currentIndex = cmorebttn.dataset.index;
      const prevArr = toDoListArr.getTasks();
      const prevText = prevArr[currentIndex - 1].description;
      const elementToEdit = document.querySelector(`.pos-${currentIndex}`);
      elementToEdit.innerHTML = `<div class="task-to-do"><input class="checkbox" data-index="${currentIndex}" type="checkbox"> <input data-index="${currentIndex}" type="text" placeholder="${prevText}" class="changed-task"> </div><div><button class="delete-task" data-index="${currentIndex}">erase<i class="fas fa-trash-alt"></i></button></div>`;
      const deleteteBtn = document.querySelectorAll('.delete-task');
      const changedTask = document.querySelectorAll('.changed-task');

      for (const dltbtn of deleteteBtn) {
        dltbtn.addEventListener('click', () => {
          const indexToDelete = dltbtn.dataset.index;
          toDoListArr.removeTask(indexToDelete);
          toDoListArr.arrayChanged();
        });
      }

      for (const changed of changedTask) {
        changed.addEventListener('keyup', (e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            const indexToChange = changed.dataset.index;
            const newdescription = e.target.value;
            toDoListArr.editArr(indexToChange, newdescription);
            toDoListArr.arrayChanged();
          }
        });
      }
    });
  }
}

export { checkboxesUpdate }; // eslint-disable-line
export { seeMoreUpdate }; // eslint-disable-line
