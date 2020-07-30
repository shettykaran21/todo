const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const today = document.querySelector('.today');
const liInput = document.querySelector('.edit-input');

const main = document.querySelector('main');
const sidebar = document.getElementById('mySidebar');
const openSidebar = document.getElementById('openNav');
const closeSidebar = document.getElementById('closeNav');

loadEventListeners();
// createDate();

function loadEventListeners() {
  openSidebar.addEventListener('click', openNav);
  closeSidebar.addEventListener('click', closeNav);

  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  taskList.addEventListener('click', editTask);
  liInput.addEventListener('keyup', uneditTask);
}

// Get tasks from local storage
function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'collection-item';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', `${task}`);
    input.className = 'input edit-input';
    input.setAttribute('readonly', 'true');

    const deleteLink = document.createElement('a');
    deleteLink.className = 'delete-item';
    deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;

    const editLink = document.createElement('a');
    editLink.className = 'edit-item';
    editLink.innerHTML = `<i class="far fa-edit"></i>`;

    li.appendChild(input);
    li.appendChild(deleteLink);
    li.appendChild(editLink);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task');
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', `${taskInput.value}`);
    input.className = 'input edit-input';
    input.setAttribute('readonly', 'true');

    const deleteLink = document.createElement('a');
    deleteLink.className = 'delete-item';
    deleteLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;

    const editLink = document.createElement('a');
    editLink.className = 'edit-item';
    editLink.innerHTML = `<i class="far fa-edit"></i>`;

    li.appendChild(input);
    li.appendChild(editLink);
    li.appendChild(deleteLink);

    taskList.appendChild(li);

    console.log(li);
    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
  }

  // Create li

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete this task?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(e) {
  if (e.target.parentElement.classList.contains('edit-item')) {
    const input = e.target.parentElement.parentElement.firstChild;
    input.removeAttribute('readonly');
    input.focus();
    setCaretPosition(input, input.value.length);
  }
}

function uneditTask(e) {
  if (event.keyCode === 13) {
    console.log(e.target);
  }
}

function clearTasks() {
  // taskList.innerHTML = '';
  if (confirm('Are you sure you wanna delete all your tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  clearTasksFromLocalStorage();
}

// Clear all tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function openNav() {
  main.style.marginLeft = '15%';
  sidebar.style.width = '15%';
  sidebar.style.display = 'block';
  openSidebar.style.zIndex = '-1';
}

function closeNav() {
  main.style.marginLeft = '0%';
  sidebar.style.display = 'none';
  openSidebar.style.zIndex = '1';
}

function setCaretPosition(ctrl, pos) {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
}

// function createDate() {
//   const date = new Date();

//   const dateSpan = document.createElement('span');
//   dateSpan.className = 'date';

//   dateSpan.appendChild(document.createTextNode(date));

//   dateString = toString(date);
//   console.log(typeof dateString);

//   today.appendChild(Object(dateString));
// }
