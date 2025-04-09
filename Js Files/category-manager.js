if (!localStorage.project_isLoggedIn) {
  window.location.href = "./login.html";
}
if (!localStorage.SaveChoosenProject) {
  window.location.href = "./dashboard.html";
}

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
let memberList = document.querySelector(".memberListContainer");
let addMemberModal = document.querySelector(".addMemberModal");
let closeAddMember = document.getElementsByClassName("fa-xmark")[0];
let cancelAddMember = document.getElementsByClassName("cancel")[0];
let showMembersBtn = document.querySelector(".more");
let memberListModal = document.querySelector(".memberListModal");
let saveMemberBtn = document.querySelector(".saveNewMember");
let closeMemberList = document.getElementsByClassName("fa-xmark")[2];
let cancelMemberList = document.getElementsByClassName("cancel")[2];
let modalDelete = document.querySelector(".modalDelete");
let deleteTaskBtn = document.querySelector(".deleteTask");
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
let searchByName = document.querySelector(".search");
let toDo = document.getElementsByClassName("toDo")[0];
let inProgress = document.getElementsByClassName("inProgress")[0];
let pending = document.getElementsByClassName("pending")[0];
let done = document.getElementsByClassName("done")[0];
let fixBtn = document.getElementsByClassName("saveFix")[0];
let details = document.getElementsByTagName("details");
let memberListTable = document.querySelector(".memberListTable");
let listSave = document.querySelector(".listSave");
let dataIndex;
let choosenProject = JSON.parse(localStorage.getItem("SaveChoosenProject"));
let tasks = JSON.parse(localStorage.getItem("Project-Tasks")) || [];
let project = JSON.parse(localStorage.getItem("AllProjects")) || [];
let currentUser = JSON.parse(localStorage.getItem("project_currentUser"));
let choosenProjectTitle = document.getElementById("choosenProjectTitle");
let choosenProjectDesc = document.getElementById("choosenProjectDesc");
let filter = document.getElementById("filter");
let currentTasks = []

let title = project.findIndex(
  (i) => i.id === choosenProject && i.user === currentUser
);
choosenProjectTitle.textContent = `${project[title].projectName}`;
choosenProjectDesc.textContent = `${project[title].description}`;
//chuc nang loc
filter.addEventListener("change", function () {
  if(filter.value === 'priorityUp'){
   currentTasks.sort((a,b) => a.priorityType - b.priorityType)
   let tempIndex = 0
   tasks.forEach((task,index)=>{
    if (task.projectId == choosenProject && task.user === currentUser){
      tasks[index] = currentTasks[tempIndex]
      tempIndex++
    }
   })
  }else if(filter.value === 'priorityDown'){
    currentTasks.sort((a,b) => b.priorityType - a.priorityType)
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.projectId == choosenProject && task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
   }else if(filter.value === 'nearDueDate'){
    currentTasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.projectId == choosenProject && task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
   }else if(filter.value === 'farDueDate'){
    currentTasks.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate))
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.projectId == choosenProject && task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
   }
  displayAll()
});

//chuc nang them moi nhiem vu
addFixBtn.onclick = function () {
  resetInputs();
  resetTaskInputs()
  addFixTask.classList.add("modal_show");
  overlay.classList.add("overlayToggle");
  saveBtns[1].onclick = function () {
    let isValid = true;
    let id = 1;
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
    } else if (dueDate < assignDate) {
      isValid = false;
      modalInvalid[6].textContent =
        "Hạn Cuối Phải Bắt Đầu Sau Thời Điểm Bắt Đầu!";
      modalInvalid[6].classList.add("overlayToggle");
      endDateInput[0].classList.add("border_invalid");
    }
    if (status === "") {
      isValid = false;
      modalInvalid[4].textContent = "Trạng Thái Không Được Để Trống!";
      modalInvalid[4].classList.add("overlayToggle");
      taskStatusInput[0].classList.add("border_invalid");
    }
    let date = new Date();
    let minDate = date.toISOString().split("T")[0];
    if (assignDate === "") {
      isValid = false;
      modalInvalid[5].textContent = "Ngày Bắt Đầu Không Được Để Trống!";
      modalInvalid[5].classList.add("overlayToggle");
      startDateInput[0].classList.add("border_invalid");
    } else if (assignDate < minDate) {
      isValid = false;
      modalInvalid[5].textContent = "Ngày Bắt Đầu Phải Sau Thời Điểm Hiện Tại";
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
    } else if (taskname.length > 30) {
      isValid = false;
      modalInvalid[2].textContent = "Tên Nhiệm Vụ Không Được Quá 30 Kí Tự";
      modalInvalid[2].classList.add("overlayToggle");
      taskNameInput[0].classList.add("border_invalid");
    }
    let check = tasks.some((task) => {
      return (
        task.taskname?.trim().toLowerCase() === taskname.trim().toLowerCase() &&
        task.projectId === choosenProject
      );
    });
    if (check) {
      isValid = false;
      modalInvalid[2].textContent = "Tên Nhiệm Vụ Đã Tồn Tại!";
      modalInvalid[2].classList.add("overlayToggle");
      taskNameInput[0].classList.add("border_invalid");
    }
    if (!isValid) return;
    let user = currentUser;
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
      user,
    });
    displayAll();
    addFixTask.classList.remove("modal_show");
    overlay.classList.remove("overlayToggle");
  };
};
//chuc nang them member
let projectIndex = project.findIndex(function (i) {
  return i.id === choosenProject && i.user === currentUser
});
showMembersBtn.onclick = function () {
  let memberListRole = document.getElementsByClassName("memberListRole");
  for (let i = 0; i < project[projectIndex].members.length; i++) {
    memberListRole[i].classList.remove("border_invalid");
  }
  memberListModal.classList.add("modal_show");
  displayMemberList();
  overlay.classList.add("overlayToggle");
};
function memberListCheck() {
  if (!project[projectIndex].members) {
    project[projectIndex].members = [];
  }
  if (project[projectIndex].members.length === 0) {
    showMembersBtn.style.display = "none";
  } else {
    showMembersBtn.style.display = "flex";
  }
}
memberListCheck();
let memberEmailInput = document.getElementById("memberEmail");
let memberRoleInput = document.getElementById("memberRole");
saveMemberBtn.onclick = function () {
  let email = memberEmailInput.value;
  let role = memberRoleInput.value;
  let isValid = true;
  if (email === "") {
    isValid = false;
    modalInvalid[0].textContent = "Email không được để trống!";
    modalInvalid[0].classList.add("modal_show");
    memberEmailInput.classList.add("border_invalid");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    isValid = false;
    modalInvalid[0].textContent = "Email phải đúng định dạng";
    modalInvalid[0].classList.add("modal_show");
    memberEmailInput.classList.add("border_invalid");
  }
  if (email.length > 30) {
    isValid = false;
    modalInvalid[0].textContent = "Email không được quá 30 kí tự";
    modalInvalid[0].classList.add("modal_show");
    memberEmailInput.classList.add("border_invalid");
  }
  let check = project[projectIndex].members.some(function (i) {
    return i.email === email;
  });
  if (check) {
    isValid = false;
    modalInvalid[0].textContent = "Thành viên đã tồn tại";
    modalInvalid[0].classList.add("modal_show");
    memberEmailInput.classList.add("border_invalid");
  }
  if (role === "") {
    isValid = false;
    modalInvalid[1].textContent = "Vai trò không được để trống!";
    modalInvalid[1].classList.add("modal_show");
    memberRoleInput.classList.add("border_invalid");
  } else if (role.length > 15) {
    isValid = false;
    modalInvalid[1].textContent = "Vai trò không được quá 15 kí tự";
    modalInvalid[1].classList.add("modal_show");
    memberRoleInput.classList.add("border_invalid");
  }
  if (!isValid) return;
  let name = email.split("@")[0];
  project[projectIndex].members.push({ name, role, email });
  displayMemberList();
  addMemberModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  modalInvalid[0].classList.remove("modal_show");
  memberEmailInput.classList.remove("border_invalid");
  modalInvalid[1].classList.remove("modal_show");
  memberRoleInput.classList.remove("border_invalid");
};
displayMemberList();
function displayMemberList() {
  memberListCheck();
  memberList.innerHTML = ``;
  if (project[projectIndex].members.length === 1) {
    memberList.innerHTML += ` <div class="memberContainer">
    <img src="../Assets/images/User-avatar.svg-removebg-preview.png" class="userPfp" alt="">
    <div class="memberInfo">
        <span class="memberName">${project[projectIndex].members[0].name}</span>
        <span class="memberRole">${project[projectIndex].members[0].role}</span>
    </div>
</div>`;
  } else if (project[projectIndex].members.length > 1) {
    for (let i = 0; i < 2; i++) {
      memberList.innerHTML += ` <div class="memberContainer">
                            <img src="../Assets/images/User-avatar.svg-removebg-preview.png" class="userPfp" alt="">
                            <div class="memberInfo">
                                <span class="memberName">${project[projectIndex].members[i].name}</span>
                                <span class="memberRole">${project[projectIndex].members[i].role}</span>
                            </div>
                        </div>`;
    }
  }
  if (project[projectIndex].members.length >= 1) {
    memberListTable.innerHTML = `<tr>
    <td class="Mlthead">Thành viên</td>
    <td class="Mlthead">Vai trò</td>
</tr>`;
    responsibleInput[0].innerHTML = ` <option value selected disabled hidden>Chọn người
                                phụ trách</option>`;
    project[projectIndex].members.forEach(function (member, index) {
      memberListTable.innerHTML += `<tr>
                            <td>
                                <div class="Mlrow">
                                    <img
                                    src="../Assets/images/User-avatar.svg-removebg-preview.png"
                                    class="userPfp" alt>
                                    <div class="memberInfoModal">
                                        <span class="memberNameModal">${member.name}</span>
                                        <span
                                            class="memberRoleModal">${member.email}</span>
                                    </div>

                                </td>
                                <td>
                                    <input type="text" id="listRole" class="memberListRole" value="${member.role}" data-index=${index}>
                                    <i class="fa-solid fa-trash-can" data-index=${index}></i>
                            </td>
                        </tr>`;
      responsibleInput[0].innerHTML += `<option value="${member.name}">${member.name}</option>`;
    });
  }
  document.querySelectorAll(".fa-trash-can").forEach((btn) => {
    btn.onclick = function () {
      deleteMember(Number(this.getAttribute("data-index")));
    };
  });
  localStorage.setItem("AllProjects", JSON.stringify(project));
}
listSave.onclick = function () {
  let isValid = true;
  let memberListRole = document.getElementsByClassName("memberListRole");
  for (let i = 0; i < project[projectIndex].members.length; i++) {
    if (memberListRole[i].value === "" || memberListRole[i].value.length > 15) {
      isValid = false;
      memberListRole[i].classList.add("border_invalid");
    } else {
      project[projectIndex].members[i].role = memberListRole[i].value;
    }
  }
  if (!isValid) return;
  displayMemberList();
  memberListModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
function deleteMember(index) {
  project[projectIndex].members.splice(index, 1);
  if (project[projectIndex].members.length === 0) {
    memberListModal.classList.remove("modal_show");
    overlay.classList.remove("overlayToggle");
  }
  displayMemberList();
}
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
function resetTaskInputs() {
  taskProgress[0].value = "";
  taskPriority[0].value = "";
  taskNameInput[0].value = "";
  responsibleInput[0].value = "";
  startDateInput[0].value = "";
  endDateInput[0].value = "";
}
closeFixAdd.onclick = function () {
  addFixTask.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  saveBtns[1].classList.remove("hideBtn");
  fixBtn.style.display = "none";
  taskNameInput[0].value = "";
  responsibleInput[0].value = "";
  endDateInput[0].value = "";
  startDateInput[0].value = "";
  taskPriority[0].value = "";
  taskProgress[0].value = "";
  taskStatusInput[0].value = "";
};
cancelFixAdd.onclick = function () {
  addFixTask.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  saveBtns[1].classList.remove("hideBtn");
  fixBtn.style.display = "none";
  taskNameInput[0].value = "";
  responsibleInput[0].value = "";
  endDateInput[0].value = "";
  startDateInput[0].value = "";
  taskPriority[0].value = "";
  taskProgress[0].value = "";
  taskStatusInput[0].value = "";
};
addMemberBtn.onclick = function () {
  addMemberModal.classList.add("modal_show");
  overlay.classList.add("overlayToggle");
};
closeAddMember.onclick = function () {
  addMemberModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  modalInvalid[0].classList.remove("modal_show");
  memberEmailInput.classList.remove("border_invalid");
  modalInvalid[1].classList.remove("modal_show");
  memberRoleInput.classList.remove("border_invalid");
};
cancelAddMember.onclick = function () {
  addMemberModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  modalInvalid[0].classList.remove("modal_show");
  memberEmailInput.classList.remove("border_invalid");
  modalInvalid[1].classList.remove("modal_show");
  memberRoleInput.classList.remove("border_invalid");
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

//chuc nang display
displayAll();
function displayAll() {
  detailsDataCheck();
  let priorityChange;
  let progressChange;
  toDo.innerHTML = ``;
  inProgress.innerHTML = ``;
  pending.innerHTML = ``;
  done.innerHTML = ``;
  currentTasks = tasks.filter(task => task.projectId == choosenProject && task.user === currentUser)
  tasks.forEach(function (task, index) {
    if (task.projectId == choosenProject && task.user === currentUser) {
      task.user = currentUser;
      if (task.priority === "Thấp") {
        priorityChange = "low";
        task.priorityType = 1;
      } else if (task.priority === "Trung bình") {
        priorityChange = "medium";
        task.priorityType = 2;
      } else {
        priorityChange = "high";
        task.priorityType = 3;
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
      taskNameInput[0].value = tasks[dataIndex].taskname;
      responsibleInput[0].value = tasks[dataIndex].inCharge;
      endDateInput[0].value = tasks[dataIndex].dueDate;
      startDateInput[0].value = tasks[dataIndex].assignDate;
      taskPriority[0].value = tasks[dataIndex].priority;
      taskProgress[0].value = tasks[dataIndex].progress;
      taskStatusInput[0].value = tasks[dataIndex].status;
      fixBtn.onclick = null;
      fixBtn.onclick = function () {
        fix(dataIndex);
      };
    };
  });
  document.querySelectorAll(".del").forEach((btn) => {
    btn.onclick = () => {
      let dataIndex = Number(btn.getAttribute("data-index"));
      modalDelete.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      deleteTaskBtn.onclick = function () {
        deleteTask(dataIndex);
      };
    };
  });
  localStorage.setItem("Project-Tasks", JSON.stringify(tasks));
}
function fix(index) {
  let isValid = true;
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
  let startDate = assignDate;
  if (dueDate === "") {
    isValid = false;
    modalInvalid[6].textContent = "Hạn Cuối Không Được Để Trống!";
    modalInvalid[6].classList.add("overlayToggle");
    endDateInput[0].classList.add("border_invalid");
  } else if (dueDate < startDate) {
    isValid = false;
    modalInvalid[6].textContent =
      "Hạn Cuối Phải Bắt Đầu Sau Thời Điểm Bắt Đầu!";
    modalInvalid[6].classList.add("overlayToggle");
    endDateInput[0].classList.add("border_invalid");
  }
  if (status === "") {
    isValid = false;
    modalInvalid[4].textContent = "Trạng Thái Không Được Để Trống!";
    modalInvalid[4].classList.add("overlayToggle");
    taskStatusInput[0].classList.add("border_invalid");
  }
  let date = new Date();
  let minDate = date.toISOString().split("T")[0];
  if (assignDate === "") {
    isValid = false;
    modalInvalid[5].textContent = "Ngày Bắt Đầu Không Được Để Trống!";
    modalInvalid[5].classList.add("overlayToggle");
    startDateInput[0].classList.add("border_invalid");
  } else if (assignDate < minDate) {
    isValid = false;
    modalInvalid[5].textContent = "Ngày Bắt Đầu Phải Sau Thời Điểm Hiện Tại!";
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
  } else if (taskname.length > 30) {
    isValid = false;
    modalInvalid[2].textContent = "Tên Nhiệm Vụ Không Được Quá 30 Kí Tự";
    modalInvalid[2].classList.add("overlayToggle");
    taskNameInput[0].classList.add("border_invalid");
  }
  let check = tasks.some((task) => {
    return (
      task.taskname.toLowerCase() === taskname.toLowerCase() &&
      task.projectId !== choosenProject
    );
  });
  if (check) {
    isValid = false;
    modalInvalid[2].textContent = "Tên Nhiệm Vụ Đã Tồn Tại!";
    modalInvalid[2].classList.add("overlayToggle");
    taskNameInput[0].classList.add("border_invalid");
  }
  if (!isValid) return;
  tasks[index].projectId = projectId;
  tasks[index].taskname = taskname;
  tasks[index].inCharge = inCharge;
  tasks[index].assignDate = assignDate;
  tasks[index].dueDate = dueDate;
  tasks[index].priority = priority;
  tasks[index].progress = progress;
  tasks[index].status = status;
  taskNameInput[0].value = "";
  responsibleInput[0].value = "";
  endDateInput[0].value = "";
  startDateInput[0].value = "";
  taskPriority[0].value = "";
  taskProgress[0].value = "";
  taskStatusInput[0].value = "";
  displayAll();
  saveBtns[1].classList.remove("hideBtn");
  fixBtn.style.display = "none";
  addFixTask.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
}
function deleteTask(index) {
  tasks.splice(index, 1);
  displayAll();
  modalDelete.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
}
//chuc nang chuyen huong
let toMyTasks = document.getElementById("myTasks");
toMyTasks.onclick = function () {
  window.location.href = "../Pages/dashboard.html";
};
let toMyProjects = document.getElementById("myProject");
toMyProjects.onclick = function () {
  window.location.href = "../Pages/projects.html";
};
let toHome = document.getElementById("toHome");
toHome.onclick = function () {
  window.location.href = "../Pages/dashboard.html";
};
//chuc nang tim kiem theo ten
let tempName;
searchByName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (searchByName.value === "") {
      displayAll();
    } else {
      tempName = searchByName.value;
      searchName(searchByName.value);
    }
  }
});
function searchName(name) {
  let priorityChange;
  let progressChange;
  toDo.innerHTML = ``;
  inProgress.innerHTML = ``;
  pending.innerHTML = ``;
  done.innerHTML = ``;
  tasks.forEach(function (task, index) {
    if (
      task.projectId == choosenProject &&
      task.user === currentUser &&
      task.taskname.toLowerCase().includes(name.toLowerCase())
    ) {
      task.user = currentUser;
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
    }
    //  task.id = currentTasks.length
  });
  document.querySelectorAll(".fix").forEach((btn) => {
    btn.onclick = () => {
      resetInputs();
      let dataIndex = Number(btn.getAttribute("data-index"));
      addFixTask.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      saveBtns[1].classList.add("hideBtn");
      fixBtn.style.display = "block";
      taskNameInput[0].value = tasks[dataIndex].taskname;
      responsibleInput[0].value = tasks[dataIndex].inCharge;
      endDateInput[0].value = tasks[dataIndex].dueDate;
      startDateInput[0].value = tasks[dataIndex].assignDate;
      taskPriority[0].value = tasks[dataIndex].priority;
      taskProgress[0].value = tasks[dataIndex].progress;
      taskStatusInput[0].value = tasks[dataIndex].status;
      fixBtn.onclick = null;
      fixBtn.onclick = function () {
        fix(dataIndex);
        searchName(tempName);
      };
    };
  });
  document.querySelectorAll(".del").forEach((btn) => {
    btn.onclick = () => {
      let dataIndex = Number(btn.getAttribute("data-index"));
      modalDelete.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      deleteTaskBtn.onclick = function () {
        deleteTask(dataIndex);
        searchName(tempName);
      };
    };
  });
  localStorage.setItem("Project-Tasks", JSON.stringify(tasks));
}
function detailsDataCheck() {
  if (
    tasks.some(
      (task) => task.projectId === choosenProject && task.status === "To do"
    )
  ) {
    details[0].setAttribute("open", true);
  } else {
    details[0].removeAttribute("open");
  }
  if (
    tasks.some(
      (task) =>
        task.projectId === choosenProject && task.status === "In Progress"
    )
  ) {
    details[1].setAttribute("open", true);
  } else {
    details[1].removeAttribute("open");
  }
  if (
    tasks.some(
      (task) => task.projectId === choosenProject && task.status === "Pending"
    )
  ) {
    details[2].setAttribute("open", true);
  } else {
    details[2].removeAttribute("open");
  }
  if (
    tasks.some(
      (task) => task.projectId === choosenProject && task.status === "Done"
    )
  ) {
    details[3].setAttribute("open", true);
  } else {
    details[3].removeAttribute("open");
  }
}
function renderBehindTask() {
  let priorityChange;
  let progressChange;
  toDo.innerHTML = ``;
  inProgress.innerHTML = ``;
  pending.innerHTML = ``;
  done.innerHTML = ``;
  tasks.forEach(function (task, index) {
    if (
      task.projectId == choosenProject &&
      task.user === currentUser &&
      task.progress === "Trễ hạn"
    ) {
      task.user = currentUser;
      if (task.priority === "Thấp") {
        priorityChange = "low";
      } else if (task.priority === "Trung bình") {
        priorityChange = "medium";
      } else {
        priorityChange = "high";
      }
      progressChange = "behind";
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
    }
    //  task.id = currentTasks.length
  });
}
let allInputs = document.getElementsByTagName("input");

//reset invalid
taskProgress[0].addEventListener("focus", function () {
  modalInvalid[8].classList.remove("overlayToggle");
  taskProgress[0].classList.remove("border_invalid");
});
taskPriority[0].addEventListener("focus", function () {
  modalInvalid[7].classList.remove("overlayToggle");
  taskPriority[0].classList.remove("border_invalid");
});
endDateInput[0].addEventListener("focus", function () {
  modalInvalid[6].classList.remove("overlayToggle");
  endDateInput[0].classList.remove("border_invalid");
});
taskStatusInput[0].addEventListener("focus", function () {
  modalInvalid[4].classList.remove("overlayToggle");
  taskStatusInput[0].classList.remove("border_invalid");
});
startDateInput[0].addEventListener("focus", function () {
  modalInvalid[5].classList.remove("overlayToggle");
  startDateInput[0].classList.remove("border_invalid");
});
responsibleInput[0].addEventListener("focus", function () {
  modalInvalid[3].classList.remove("overlayToggle");
  responsibleInput[0].classList.remove("border_invalid");
});
taskNameInput[0].addEventListener("focus", function () {
  modalInvalid[2].classList.remove("overlayToggle");
  taskNameInput[0].classList.remove("border_invalid");
});
