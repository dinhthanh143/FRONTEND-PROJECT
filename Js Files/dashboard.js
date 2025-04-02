// if(localStorage.project_isLoggedIn === null){
//     window.location.href = "./login.html";
// }
let add = document.querySelector(".add");
let fixAddModal = document.querySelector(".fixAdd");
let logOut = document.querySelector("#logOut");
let overlay = document.getElementById("overlay");
let closeBtn1 = document.getElementById("cancel1");
let closeBtn2 = document.getElementById("fa-xmark2");
let cancelBtn = document.querySelector(".fixAddCancel");
let cancelBtn2 = document.querySelector(".deleteCancel");

let confirmDelete = document.querySelector(".deleteTask");
let modalDelete = document.querySelector(".modalDelete");
let table = document.getElementsByTagName("table")[0];
let saveProject = document.querySelector(".save");
let fixProject = document.querySelector(".saveFix");
let closeFixOnly = document.getElementById("cancel3");
let cancelFixOnly = document.getElementsByClassName("fixOnlyCancel");
let fixOnly = document.querySelector(".fixOnly");
let dataIndex;
let addFixInvalid = document.getElementsByClassName("addFixInvalid");
let taskNameInput = document.getElementById("taskName");
let descriptionInput = document.getElementById("description");

let fixInvalid = document.getElementsByClassName("fixInvalid");
let newNameInput = document.querySelector(".newTask");
let newDescInput = document.querySelector(".newDesc");
let project = JSON.parse(localStorage.getItem("AllProjects")) || []
let choosenProject = JSON.parse(localStorage.getItem("SaveChoosenProject"))

displayList();
function displayList() {
  table.innerHTML = `  <tr class="tHead">
                        <td class="td1">ID</td>
                        <td class="td2">Tên Dự Án</td>
                        <td class="td3">Hành Động</td>
                    </tr>`;
  project.forEach((item, index) => {
    item.id = index + 1;
    table.innerHTML += ` <tr class="normalRow">
                        <td class="td1">${item.id}</td>
                        <td class="td2">${item.projectName}</td>
                        <td class="td3">
                            <button class="fix" data-index="${index}">Sửa</button>
                            <button class="del" data-index="${index}">Xoá</button>
                            <button class="detail" project-id="${item.id}">Chi tiết</button>
                        </td>
                    </tr>`;
  });
  document.querySelectorAll(".fix").forEach((btn) => {
    btn.onclick = function () {
      dataIndex = Number(this.getAttribute("data-index"));
      newNameInput.classList.remove("border_invalid");
      fixInvalid[0].textContent = "";
      fixInvalid[0].classList.remove("overlayToggle");
      newDescInput.classList.remove("border_invalid");
      fixInvalid[1].textContent = "";
      fixInvalid[1].classList.remove("overlayToggle");
      fixOnly.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      
      newNameInput.value = project[dataIndex].projectName;
        newDescInput.value = project[dataIndex].description;
        fixProject.onclick = null;
        fixProject.onclick = function() {
            fix(dataIndex);
        };
    };
  });

  document.querySelectorAll(".del").forEach((btn) => {
    btn.onclick = function () {
      dataIndex = Number(this.getAttribute("data-index"));
      modalDelete.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      confirmDelete.onclick = function () {
        deleteTask(dataIndex);
        console.log(dataIndex)
      };
    };
  })
  document.querySelectorAll(".detail").forEach((btn) => {
    btn.onclick = function(){
      choosenProject = Number(this.getAttribute("project-id"))
      localStorage.setItem("SaveChoosenProject", JSON.stringify(choosenProject))
      window.location.href = "../Pages/category-manager.html";
    }
  })
  localStorage.setItem("AllProjects", JSON.stringify(project));
}
function deleteTask(index){
    project.splice(index,1)
    displayList();
    modalDelete.classList.remove("modal_show");
    overlay.classList.remove("overlayToggle")
}
function fix(index){
    let isValid = true;
    let id = project.length + 1;
    let projectName = newNameInput.value.trim();
    let description = newDescInput.value.trim();
    if (projectName === "") {
      isValid = false;
      newNameInput.classList.add("border_invalid");
      fixInvalid[0].textContent = "Tên Danh Mục Không Được Để Trống";
      fixInvalid[0].classList.add("overlayToggle");
    }
    project[index].projectName = "changing";
    let check = project.some(function (item) {
      return item.projectName.toLowerCase() === projectName.toLowerCase();
    });
    if (check) {
      isValid = false;
      newNameInput.classList.add("border_invalid");
      fixInvalid[0].textContent = "Tên Danh Mục Đã Tồn Tại";
      fixInvalid[0].classList.add("overlayToggle");
    }
    if (description === "") {
      isValid = false;
      newDescInput.classList.add("border_invalid");
      fixInvalid[1].textContent = "Mô tả Không Được Để Trống";
      fixInvalid[1].classList.add("overlayToggle");
    }
    if (!isValid) return;
    project[index].projectName = projectName
    project[index].description = description;
    displayList();
    fixOnly.classList.remove("modal_show");
    overlay.classList.remove("overlayToggle");
}
descriptionInput.onclick = () => {
  descriptionInput.classList.remove("border_invalid");
  addFixInvalid[1].textContent = "";
  addFixInvalid[1].classList.remove("overlayToggle");
};
taskNameInput.onclick = () => {
  taskNameInput.classList.remove("border_invalid");
  addFixInvalid[0].textContent = "";
  addFixInvalid[0].classList.remove("overlayToggle");
};
newNameInput.onclick = () => {
    newNameInput.classList.remove("border_invalid");
    fixInvalid[0].textContent = "";
    fixInvalid[0].classList.remove("overlayToggle");
}
newDescInput.onclick = () => {
    newDescInput.classList.remove("border_invalid");
    fixInvalid[1].textContent = "";
    fixInvalid[1].classList.remove("overlayToggle");
}
add.onclick = function () {
  taskNameInput.classList.remove("border_invalid");
  addFixInvalid[0].textContent = "";
  addFixInvalid[0].classList.remove("overlayToggle");
  descriptionInput.classList.remove("border_invalid");
  addFixInvalid[1].textContent = "";
  addFixInvalid[1].classList.remove("overlayToggle");
  fixAddModal.classList.add("modal_show");
  overlay.classList.toggle("overlayToggle");
  taskNameInput.value = "";
  descriptionInput.value = "";
};
saveProject.onclick = function () {
  let isValid = true;
  let id = project.length + 1;
  let projectName = taskNameInput.value.trim();
  let description = descriptionInput.value.trim();
  if (projectName === "") {
    isValid = false;
    taskNameInput.classList.add("border_invalid");
    addFixInvalid[0].textContent = "Tên Danh Mục Không Được Để Trống";
    addFixInvalid[0].classList.add("overlayToggle");
  }
  let check = project.some(function (item) {
    return item.projectName.toLowerCase() === projectName.toLowerCase();
  });
  if (check) {
    isValid = false;
    taskNameInput.classList.add("border_invalid");
    addFixInvalid[0].textContent = "Tên Danh Mục Đã Tồn Tại";
    addFixInvalid[0].classList.add("overlayToggle");
  }
  if (description === "") {
    isValid = false;
    descriptionInput.classList.add("border_invalid");
    addFixInvalid[1].textContent = "Mô tả Không Được Để Trống";
    addFixInvalid[1].classList.add("overlayToggle");
  }
  if (!isValid) return;
  project.push({ id, projectName, description });
  displayList();
  fixAddModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
closeBtn1.onclick = function () {
  fixAddModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
closeBtn2.onclick = function () {
  modalDelete.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
cancelBtn.onclick = function () {
  fixAddModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
cancelBtn2.onclick = function () {
  modalDelete.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};

closeFixOnly.onclick = function () {
  fixOnly.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
cancelFixOnly[0].onclick = function () {
  fixOnly.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
};
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("del")) {
    modalDelete.classList.add("modal_show");
    overlay.classList.add("overlayToggle");
  }
});
logOut.onclick = function () {
  window.location.href = "../Pages/login.html";
};
let toMyProjects = document.getElementById("myProject");
toMyProjects.onclick = function(){
  window.location.href ="../Pages/projects.html"
}
