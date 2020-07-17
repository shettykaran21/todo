const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

document.getElementById('openNav').addEventListener('click', openNav);
document.getElementById('closeNav').addEventListener('click', closeNav);

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);

function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task');
  }

  // Create li
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = `<i class="fa fa-trash-alt"></i>`;

  li.appendChild(link);

  taskList.appendChild(li);

  taskInput.value = '';

  console.log(taskList);

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  // taskList.innerHTML = '';
  if (confirm('Are you sure you wanna delete all your tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
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
  document.querySelector('main').style.marginLeft = '15%';
  document.getElementById('mySidebar').style.width = '15%';
  document.getElementById('mySidebar').style.display = 'block';
  document.getElementById('openNav').style.display = 'none';
}

function closeNav() {
  document.querySelector('main').style.marginLeft = '0%';
  document.getElementById('mySidebar').style.display = 'none';
  document.getElementById('openNav').style.display = 'inline-block';
}
