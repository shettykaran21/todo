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

console.log(
  `${new Date().getDay()}, ${new Date().getDate()} ${new Date().getMonth()}`
);
