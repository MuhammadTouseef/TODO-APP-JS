const form = document.querySelector("#task-form");
const formData = document.querySelector("#task");
const smbuttom = document.querySelector("#smbton");
const list = document.querySelector(".collection");
const clr = document.querySelector("#clbtn");
const ftlist = document.querySelector("#filter-task");

loadeventtnr();

function loadeventtnr() {
  document.addEventListener("DOMContentLoaded", getTask);
  form.addEventListener("submit", addtask);
  list.addEventListener("click", rmvtsk);
  clr.addEventListener("click", clrall);
  ftlist.addEventListener("keyup", filteredList);
  list.addEventListener("dblclick", taskDone);
}

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    let x = document.createElement("li");
    x.className = "collection-items";
    x.appendChild(document.createTextNode(task));
    const cross = document.createElement("a");
    cross.className = "delete-item secondary-content";
    cross.innerHTML = '<i class="fas fa-times"></i>';
    x.appendChild(cross);

    list.appendChild(x);
  });
}

function addtask(e) {
  e.preventDefault();
  if (formData.value === "") {
    alert("Enter a Task");
  } else {
    let x = document.createElement("li");
    x.className = "collection-items";
    x.appendChild(document.createTextNode(formData.value));
    const cross = document.createElement("a");
    cross.className = "delete-item secondary-content";
    cross.innerHTML = '<i class="fas fa-times"></i>';
    x.appendChild(cross);

    addlocal(formData.value);
    formData.value = "";

    list.appendChild(x);
  }
}

function addlocal(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function rmvtsk(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure You want to Delete This Task? ")) {
      e.target.parentElement.parentElement.remove();
      removelocal(e.target.parentElement.parentElement);
    }
  }
}

function removelocal(tasklist) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (tasklist.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clrall() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  clearlocal();
}

function clearlocal() {
  localStorage.clear();
}

function filteredList(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-items").forEach(function (task) {
    const itms = task.firstChild.textContent;
    if (itms.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function taskDone(e) {
  e.target.style.backgroundColor = "#d8f3dc";
  //  console.log(e.target)
}
