let logOut = document.querySelector("#logOut");
logOut.onclick = function () {
  window.location.href = "../Pages/login.html";
};
let addFixBtn = document.querySelector(".addTask");
let addFixTask = document.querySelector(".fixTask");
let overlay = document.getElementById("overlay");
let closeFixAdd = document.getElementsByClassName("fa-xmark")[1];
let cancelFixAdd = document.getElementsByClassName("cancel")[1];
let addMemberBtn = document.querySelector(".addMember");
let addMemberModal = document.querySelector(".addMemberModal");
let closeAddMember = document.getElementsByClassName("fa-xmark")[0];
let cancelAddMember = document.getElementsByClassName("cancel")[0];
let showMembersBtn = document.querySelector(".fa-ellipsis");
let memberListModal = document.querySelector(".memberListModal");
let closeMemberList = document.getElementsByClassName("fa-xmark")[2];
let cancelMemberList = document.getElementsByClassName("cancel")[2];
let modalDelete = document.querySelector(".modalDelete");
let deleteTaskBtn = document.querySelector(".deleteTask")
let closeDelete = document.getElementsByClassName("fa-xmark")[3];
let cancelDelete = document.getElementsByClassName("cancel")[3];
let modalFix = document.querySelector(".fixOnly");
let closeFixOnly = document.getElementsByClassName("fa-xmark")[4];
let cancelFixOnly = document.getElementsByClassName("cancel")[4];
let saveBtns = document.getElementsByClassName("save");

let modalInvalid = document.getElementsByClassName("modalInvalid");
let taskNameInput = document.getElementsByClassName("taskName");
let responsibleInput = document.getElementsByClassName("responsible");
let taskStatusInput = document.getElementsByClassName("taskStatus");
let startDateInput = document.getElementsByClassName("startDate");
let endDateInput = document.getElementsByClassName("endDate");
let taskPriority = document.getElementsByClassName("taskPriority");
let taskProgress = document.getElementsByClassName("taskProgress");
let searchByName = document.querySelector(".search")
let toDo = document.getElementsByClassName("toDo")[0];
let inProgress = document.getElementsByClassName("inProgress")[0];
let pending = document.getElementsByClassName("pending")[0];
let done = document.getElementsByClassName("done")[0];
let fixBtn = document.getElementsByClassName("saveFix")[0];
let project = JSON.parse(localStorage.getItem("AllProjects")) || []
let choosenProject = JSON.parse(localStorage.getItem("SaveChoosenProject"))
let dataIndex;
let tasks = JSON.parse(localStorage.getItem("Project-Tasks")) || []
let choosenProjectTitle = document.getElementById("choosenProjectTitle")
let choosenProjectDesc = document.getElementById("choosenProjectDesc")
let currentTasks
choosenProjectTitle.textContent = `${project[choosenProject-1].projectName}`
choosenProjectDesc.textContent = `${project[choosenProject-1].description}`
addFixBtn.onclick = function () {
  resetInputs();
  addFixTask.classList.add("modal_show");
  overlay.classList.add("overlayToggle");
  saveBtns[1].onclick = function () {
    let isValid = true;
    let id = tasks.length + 1;
    let projectId = choosenProject;
    let taskname = taskNameInput[0].value.trim();
    let inCharge = responsibleInput[0].value;
    let assignDate = startDateInput[0].value;
    let dueDate = endDateInput[0].value;
    let priority = taskPriority[0].value;
    let progress = taskProgress[0].value;
    let status = taskStatusInput[0].value;
    if (progress === "") {
      isValid = false;
      modalInvalid[8].textContent = "Tiến Độ Không Được Để Trống!";
      modalInvalid[8].classList.add("overlayToggle");
      taskProgress[0].classList.add("border_invalid");
    }
    if (priority === "") {
      isValid = false;
      modalInvalid[7].textContent = "Mức Độ Ưu Tiên Không Được Để Trống!";
      modalInvalid[7].classList.add("overlayToggle");
      taskPriority[0].classList.add("border_invalid");
    }
    if (dueDate === "") {
      isValid = false;
      modalInvalid[6].textContent = "Hạn Cuối Không Được Để Trống!";
      modalInvalid[6].classList.add("overlayToggle");
      endDateInput[0].classList.add("border_invalid");
    }
    if (status === "") {
      isValid = false;
      modalInvalid[4].textContent = "Trạng Thái Không Được Để Trống!";
      modalInvalid[4].classList.add("overlayToggle");
      taskStatusInput[0].classList.add("border_invalid");
    }
    if (assignDate === "") {
      isValid = false;
      modalInvalid[5].textContent = "Ngày Bắt Đầu Không Được Để Trống!";
      modalInvalid[5].classList.add("overlayToggle");
      startDateInput[0].classList.add("border_invalid");
    }
    if (inCharge === "") {
      isValid = false;
      modalInvalid[3].textContent = "Người Phụ Trách Không Được Để Trống!";
      modalInvalid[3].classList.add("overlayToggle");
      responsibleInput[0].classList.add("border_invalid");
    }
    if (taskname === "") {
      isValid = false;
      modalInvalid[2].textContent = "Tên Không Được Để Trống!";
      modalInvalid[2].classList.add("overlayToggle");
      taskNameInput[0].classList.add("border_invalid");
    }
    let check = currentTasks.some((task) => {
      return task.taskname.toLowerCase() === taskname.toLowerCase();
    });
    if (check) {
      isValid = false;
      modalInvalid[2].textContent = "Tên Nhiệm Vụ Đã Tồn Tại!";
      modalInvalid[2].classList.add("overlayToggle");
      taskNameInput[0].classList.add("border_invalid");
    }
    if (!isValid) return;
    tasks.push({
      id,
      projectId,
      taskname,
      inCharge,
      assignDate,
      dueDate,
      priority,
      progress,
      status,
    });
    displayAll();
    addFixTask.classList.remove("modal_show");
    overlay.classList.remove("overlayToggle");
  };
};
function resetInputs() {
  modalInvalid[8].classList.remove("overlayToggle");
  taskProgress[0].classList.remove("border_invalid");
  modalInvalid[7].classList.remove("overlayToggle");
  taskPriority[0].classList.remove("border_invalid");
  modalInvalid[2].classList.remove("overlayToggle");
  taskNameInput[0].classList.remove("border_invalid");
  modalInvalid[3].classList.remove("overlayToggle");
  responsibleInput[0].classList.remove("border_invalid");
  modalInvalid[5].classList.remove("overlayToggle");
  startDateInput[0].classList.remove("border_invalid");
  modalInvalid[6].classList.remove("overlayToggle");
  endDateInput[0].classList.remove("border_invalid");
  modalInvalid[4].classList.remove("overlayToggle");
  taskStatusInput[0].classList.remove("border_invalid");
}
closeFixAdd.onclick = function () {
  addFixTask.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  saveBtns[1].classList.remove("hideBtn");
  fixBtn.style.display = "none";
  taskNameInput[0].value = ""
  responsibleInput[0].value = ""
  endDateInput[0].value = ""
  startDateInput[0].value = ""
  taskPriority[0].value = ""
  taskProgress[0].value = ""
  taskStatusInput[0].value = ""
};
cancelFixAdd.onclick = function () {
  addFixTask.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  saveBtns[1].classList.remove("hideBtn");
  fixBtn.style.display = "none";
  taskNameInput[0].value = ""
  responsibleInput[0].value = ""
  endDateInput[0].value = ""
  startDateInput[0].value = ""
  taskPriority[0].value = ""
  taskProgress[0].value = ""
  taskStatusInput[0].value = ""
};
addMemberBtn.onclick = function () {
  addMemberModal.classList.add("modal_show");
  overlay.classList.add("overlayToggle");
};
closeAddMember.onclick = function () {
  addMemberModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
cancelAddMember.onclick = function () {
  addMemberModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
closeDelete.onclick = function () {
  modalDelete.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
cancelDelete.onclick = function () {
  modalDelete.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
cancelMemberList.onclick = function () {
  memberListModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
closeMemberList.onclick = function () {
  memberListModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
showMembersBtn.onclick = function () {
  memberListModal.classList.add("modal_show");
  overlay.classList.add("overlayToggle");
};
displayAll();
function displayAll() {
  currentTasks = tasks.filter((task) => task.projectId === choosenProject);
  let priorityChange;
  let progressChange;
  toDo.innerHTML = ``;
  inProgress.innerHTML = ``;
  pending.innerHTML = ``;
  done.innerHTML = ``;
  currentTasks.forEach(function (task, index) {
    if (task.priority === "Thấp") {
      priorityChange = "low";
    } else if (task.priority === "Trung bình") {
      priorityChange = "medium";
    } else {
      priorityChange = "high";
    }
    if (task.progress === "Có rủi ro") {
      progressChange = "risk";
    } else if (task.progress === "Trễ hạn") {
      progressChange = "behind";
    } else {
      progressChange = "noRisk";
    }
    if (task.status === "To do") {
      toDo.innerHTML += ` <tr>
                            <td class="col1">${task.taskname}</td>
                            <td class="col2">${task.inCharge}</td>
                            <td class="col3"><span class="${priorityChange}">${task.priority}</span></td>
                            <td class="col4">${task.assignDate}</td>
                            <td class="col5">${task.dueDate}</td>
                            <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
                            <td class="col7">
                                <button class="fix" data-index="${index}">Sửa</button>
                                <button class="del" data-index="${index}">Xoá</button>
                            </td>
                        </tr>`;
    } else if (task.status === "In Progress") {
      inProgress.innerHTML += ` <tr>
            <td class="col1">${task.taskname}</td>
            <td class="col2">${task.inCharge}</td>
            <td class="col3"><span class="${priorityChange}">${task.priority}</span></td>
            <td class="col4">${task.assignDate}</td>
            <td class="col5">${task.dueDate}</td>
            <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
            <td class="col7">
                <button class="fix" data-index="${index}">Sửa</button>
                <button class="del" data-index="${index}">Xoá</button>
            </td>
        </tr>`;
    } else if (task.status === "Pending") {
      pending.innerHTML += ` <tr>
            <td class="col1">${task.taskname}</td>
            <td class="col2">${task.inCharge}</td>
            <td class="col3"><span class="${priorityChange}">${task.priority}</span></td>
            <td class="col4">${task.assignDate}</td>
            <td class="col5">${task.dueDate}</td>
            <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
            <td class="col7">
                <button class="fix" data-index="${index}">Sửa</button>
                <button class="del" data-index="${index}">Xoá</button>
            </td>
        </tr>`;
    } else {
      done.innerHTML += ` <tr>
            <td class="col1">${task.taskname}</td>
            <td class="col2">${task.inCharge}</td>
            <td class="col3"><span class="${priorityChange}">${task.priority}</span></td>
            <td class="col4">${task.assignDate}</td>
            <td class="col5">${task.dueDate}</td>
            <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
            <td class="col7">
                <button class="fix" data-index="${index}">Sửa</button>
                <button class="del" data-index="${index}">Xoá</button>
            </td>
        </tr>`;
    }
  });
  document.querySelectorAll(".fix").forEach((btn) => {
    btn.onclick = () => {
      resetInputs();
      let dataIndex = Number(btn.getAttribute("data-index"));
      addFixTask.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      saveBtns[1].classList.add("hideBtn");
      fixBtn.style.display = "block";

      taskNameInput[0].value = tasks[dataIndex].taskname
      responsibleInput[0].value = tasks[dataIndex].inCharge
      endDateInput[0].value = tasks[dataIndex].dueDate
      startDateInput[0].value = tasks[dataIndex].assignDate
      taskPriority[0].value = tasks[dataIndex].priority
      taskProgress[0].value = tasks[dataIndex].progress
      taskStatusInput[0].value = tasks[dataIndex].status
      fixBtn.onclick = null;
      fixBtn.onclick = function () {
        fix(dataIndex);
      };
    };
  });
  document.querySelectorAll(".del").forEach((btn) =>{
    btn.onclick = () => {
      let dataIndex = Number(btn.getAttribute("data-index"));
      modalDelete.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      deleteTaskBtn.onclick = function () {
        deleteTask(dataIndex);
      };
    };
  })
  localStorage.setItem("Project-Tasks", JSON.stringify(tasks))
}
function fix(index) {
  let isValid = true;
  let id = tasks.length + 1;
  let projectId = choosenProject;
  let taskname = taskNameInput[0].value.trim();
  let inCharge = responsibleInput[0].value;
  let assignDate = startDateInput[0].value;
  let dueDate = endDateInput[0].value;
  let priority = taskPriority[0].value;
  let progress = taskProgress[0].value;
  let status = taskStatusInput[0].value;
  if (progress === "") {
    isValid = false;
    modalInvalid[8].textContent = "Tiến Độ Không Được Để Trống!";
    modalInvalid[8].classList.add("overlayToggle");
    taskProgress[0].classList.add("border_invalid");
  }
  if (priority === "") {
    isValid = false;
    modalInvalid[7].textContent = "Mức Độ Ưu Tiên Không Được Để Trống!";
    modalInvalid[7].classList.add("overlayToggle");
    taskPriority[0].classList.add("border_invalid");
  }
  if (dueDate === "") {
    isValid = false;
    modalInvalid[6].textContent = "Hạn Cuối Không Được Để Trống!";
    modalInvalid[6].classList.add("overlayToggle");
    endDateInput[0].classList.add("border_invalid");
  }
  if (status === "") {
    isValid = false;
    modalInvalid[4].textContent = "Trạng Thái Không Được Để Trống!";
    modalInvalid[4].classList.add("overlayToggle");
    taskStatusInput[0].classList.add("border_invalid");
  }
  if (assignDate === "") {
    isValid = false;
    modalInvalid[5].textContent = "Ngày Bắt Đầu Không Được Để Trống!";
    modalInvalid[5].classList.add("overlayToggle");
    startDateInput[0].classList.add("border_invalid");
  }
  if (inCharge === "") {
    isValid = false;
    modalInvalid[3].textContent = "Người Phụ Trách Không Được Để Trống!";
    modalInvalid[3].classList.add("overlayToggle");
    responsibleInput[0].classList.add("border_invalid");
  }
  if (taskname === "") {
    isValid = false;
    modalInvalid[2].textContent = "Tên Không Được Để Trống!";
    modalInvalid[2].classList.add("overlayToggle");
    taskNameInput[0].classList.add("border_invalid");
  }
  let check = currentTasks.some((task) => {
    return task.taskname.toLowerCase() === taskname.toLowerCase();
  });
  if (check) {
    isValid = false;
    modalInvalid[2].textContent = "Tên Nhiệm Vụ Đã Tồn Tại!";
    modalInvalid[2].classList.add("overlayToggle");
    taskNameInput[0].classList.add("border_invalid");
  }
  if (!isValid) return;
  tasks[index].id = id;
  tasks[index].projectId = projectId;
  tasks[index].taskname = taskname;
  tasks[index].inCharge = inCharge;
  tasks[index].assignDate = assignDate;
  tasks[index].dueDate = dueDate;
  tasks[index].priority = priority;
  tasks[index].progress = progress;
  tasks[index].status = status;
  taskNameInput[0].value = ""
  responsibleInput[0].value = ""
  endDateInput[0].value = ""
  startDateInput[0].value = ""
  taskPriority[0].value = ""
  taskProgress[0].value = ""
  taskStatusInput[0].value = ""
  displayAll();
  saveBtns[1].classList.remove("hideBtn");
  fixBtn.style.display = "none";
  addFixTask.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
}
function deleteTask(index){
    tasks.splice(index, 1);
    displayAll();
    modalDelete.classList.remove("modal_show");
    overlay.classList.remove("overlayToggle");
}
let toMyTasks = document.getElementById("myTasks");
toMyTasks.onclick = function(){
  window.location.href ="../Pages/dashboard.html"
}
let toMyProjects = document.getElementById("myProject");
toMyProjects.onclick = function(){
  window.location.href ="../Pages/projects.html"
}

searchByName.addEventListener("keypress", function(event){
  if (event.key === "Enter"){
    if(searchByName.value ===''){
      displayAll();
    }else{
      searchName(searchByName.value)
    }
  } 
})
function searchName(name){

}



