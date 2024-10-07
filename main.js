// let form = document.getElementById("form");
// let textInput = document.getElementById("textInput");
// let dateInput = document.getElementById("dateInput");
// let textarea = document.getElementById("textarea");

const byId = (id) => {
  return document.getElementById(id);
};

let form = byId("form"),
  textInput = byId("textInput"),
  dateInput = byId("dateInput"),
  textarea = byId("textarea"),
  msg = byId("msg"),
  tasks = byId("tasks"),
  add = byId("add");
//   editTask = byId("edit"),
//   removeTask = byId("delete");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidate();
});

// Form validation function
let formValidate = () => {
  if (textInput.value === "") {
    errorMsg("Task Title can't be blank!");
  } else {
    errorMsg("");
    acceptData();
  }
};

// Error message function!
let errorMsg = (error) => {
  return (msg.textContent = error);
};

// let data = {};

let data = []; // we gonna use local storage!
// acceptData function!
let acceptData = () => {
  //   data["text"] = textInput.value;
  //   data["date"] = dateInput.value;
  //   data["description"] = textarea.value;

  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
  console.log(data);
  localStorage.setItem("data", JSON.stringify(data));

  createTasks();

  add.setAttribute("data-bs-dismiss", "modal");
  add.click();

  /* IIFE => imediatly invoked functional exprestion(it called one time!)*/
  (() => {
    add.setAttribute("data-bs-dismiss", "");
  })();
};

// create task function!
let createTasks = () => {
  tasks.innerHTML = "";

  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
          <span class="fw-bold fs-5">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
          <span class="options mb-2">
              <i onClick = "editTask(this);" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid edit fa-pen-to-square"></i>
              <i onClick = "deleteTask(this);createTasks()" class="fa-solid delete fa-trash"></i>
          </span>
      </div>
      `);
  });

  resetForm();
};

// delete functions!
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

// edit function
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  //   to delete the previous task!
  //   selectedTask.remove();

  deleteTask(e);
};
// resetForm function!
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTasks();
  console.log(data);
})();
