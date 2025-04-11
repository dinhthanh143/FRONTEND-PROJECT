if (!localStorage.project_isLoggedIn) {
  window.location.href = "./login.html";
}
//DOM
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
let darkModeBtn = document.querySelector(".fa-moon")
let body = document.getElementsByTagName("body")[0]
let dataIndex;
let addFixInvalid = document.getElementsByClassName("addFixInvalid");
let taskNameInput = document.getElementById("taskName");
let descriptionInput = document.getElementById("description");
let fixInvalid = document.getElementsByClassName("fixInvalid");
let newNameInput = document.querySelector(".newTask");
let newDescInput = document.querySelector(".newDesc");
//keys
let currentUser = JSON.parse(localStorage.getItem("project_currentUser"));
let project = JSON.parse(localStorage.getItem("AllProjects")) || [];
let project_isLoggedIn = JSON.parse(localStorage.getItem("project_isLoggedIn"));
let projectCheck = project.some(function (project) {
  return project.user === currentUser;
});
if (!projectCheck && project_isLoggedIn === true) {
  project = project.concat([
    {
      id: 1,
      projectName: "Dự án A",
      description: "Mô tả dự án A",
      members: [
        { id: 1, name: "Thanh", role: "CEO", email: "Thanh@gmail.com" },
        {
          id: 2,
          name: "Thanh Fake",
          role: "Manager",
          email: "ThanhFake@gmail.com",
        },
        { id: 3, name: "Chung", role: "Janitor", email: "Chung@gmail.com" },
        { id: 3, name: "Viet", role: "Coder", email: "Viet@gmail.com" },
      ],
      user: currentUser,
    },
    {
      id: 2,
      projectName: "Dự án B",
      description: "Mô tả dự án B",
      members: [
        { id: 1, name: "Nam", role: "Designer", email: "Nam@gmail.com" },
        {
          id: 2,
          name: "Linh",
          role: "Manager",
          email: "Linh@gmail.com",
        },
      ],
      user: currentUser,
    },
    {
      id: 3,
      projectName: "Dự án C",
      description: "Phát triển chatbot AI",
      members: [
        { id: 5, name: "Dũng" },
        { id: 6, name: "Hoa" },
      ],
      user: currentUser,
    },
    {
      id: 4,
      projectName: "Dự án D",
      description: "Nâng cấp website thương mại điện tử",
      members: [
        { id: 7, name: "Nam" },
        { id: 8, name: "Linh" },
      ],
      user: currentUser,
    },
    {
      id: 5,
      projectName: "Dự án E",
      description: "Phát triển phần mềm kế toán",
      members: [
        { id: 9, name: "Sơn" },
        { id: 10, name: "Lan" },
      ],
      user: currentUser,
    },
    {
      id: 6,
      projectName: "Dự án F",
      description: "Ứng dụng theo dõi sức khỏe",
      members: [
        { id: 11, name: "Minh" },
        { id: 12, name: "Trang" },
      ],
      user: currentUser,
    },
    {
      id: 7,
      projectName: "Dự án G",
      description: "Phát triển hệ thống IoT cho nông nghiệp",
      members: [
        { id: 13, name: "Tùng" },
        { id: 14, name: "Ngọc" },
      ],
      user: currentUser,
    },
    {
      id: 8,
      projectName: "Dự án H",
      description: "Xây dựng phần mềm quản lý nhân sự",
      members: [
        { id: 15, name: "Hà" },
        { id: 16, name: "Bình" },
      ],
      user: currentUser,
    },
    {
      id: 9,
      projectName: "Dự án I",
      description: "Nghiên cứu và phát triển AI nhận diện khuôn mặt",
      members: [
        { id: 17, name: "Quân" },
        { id: 18, name: "Phương" },
      ],
      user: currentUser,
    },
    {
      id: 10,
      projectName: "Dự án J",
      description: "Ứng dụng đặt lịch hẹn trực tuyến",
      members: [
        { id: 19, name: "Tuấn" },
        { id: 20, name: "Hương" },
      ],
      user: currentUser,
    },
  ]);
}
let tasks = JSON.parse(localStorage.getItem("Project-Tasks")) || [];
if (
  !tasks.some((task) => task.user === currentUser) &&
  project_isLoggedIn === true
) {
  let newTasks = [
    {
      assignDate: "2025-04-18",
      dueDate: "2025-04-22",
      id: 1,
      inCharge: "anh Thanh",
      priority: "Trung bình",
      progress: "Trễ hạn",
      projectId: 1,
      status: "To do",
      taskname: "Thiết kế trang Web mua sắm online",
      user: currentUser,
    },
    {
      assignDate: "2025-04-10",
      dueDate: "2025-04-15",
      id: 2,
      inCharge: "chị Mai",
      priority: "Cao",
      progress: "Đúng tiến độ",
      projectId: 1,
      status: "In Progress",
      taskname: "Thiết kế UI",
      user: currentUser,
    },
    {
      assignDate: "2025-04-12",
      dueDate: "2025-04-20",
      id: 3,
      inCharge: "anh Hùng",
      priority: "Thấp",
      progress: "Có rủi ro",
      projectId: 1,
      status: "To do",
      taskname: "Lập trình Backend",
      user: currentUser,
    },
    {
      assignDate: "2025-04-08",
      dueDate: "2025-04-14",
      id: 4,
      inCharge: "chị Hoa",
      priority: "Trung bình",
      progress: "Đúng tiến độ",
      projectId: 1,
      status: "Pending",
      taskname: "Viết tài liệu hướng dẫn",
      user: currentUser,
    },
    {
      assignDate: "2025-04-15",
      dueDate: "2025-04-25",
      id: 5,
      inCharge: "anh Nam",
      priority: "Cao",
      progress: "Có rủi ro",
      projectId: 2,
      status: "In Progress",
      taskname: "Tối ưu hiệu suất",
      user: currentUser,
    },
    {
      assignDate: "2025-04-05",
      dueDate: "2025-04-10",
      id: 6,
      inCharge: "chị Linh",
      priority: "Thấp",
      progress: "Đúng tiến độ",
      projectId: 2,
      status: "Done",
      taskname: "Kiểm thử hệ thống",
      user: currentUser,
    },
  ];
  tasks = tasks.concat(newTasks);
  localStorage.setItem("Project-Tasks", JSON.stringify(tasks));
}
let usedIds = JSON.parse(localStorage.getItem("usedIds")) || [1,2,3,4,5,6,7,8,9,10]
function generateId() {
  let newId;
  do {
    newId = Math.floor(Math.random() * 1000) + 1;
  } while (usedIds.includes(newId));
  return newId;
}
// let project = JSON.parse(localStorage.getItem("AllProjects"));
let choosenProject = JSON.parse(localStorage.getItem("SaveChoosenProject"));
let userProjects = [];
//paginition
let currentPage = 1;
const itemsPerPage = 9;
displayList();
function displayList() {
  userProjects = project.filter((item) => item.user === currentUser);
  const totalPages = Math.ceil(userProjects.length / itemsPerPage);
  renderTable(currentPage);
  renderPagination(totalPages);
  localStorage.setItem("AllProjects", JSON.stringify(project));
}
function renderTable(page) {
  table.innerHTML = `  <tr class="tHead">
                        <td class="td1 tdHead">ID</td>
                        <td class="td2 tdHead">Tên Dự Án</td>
                        <td class="td3 tdHead">Hành Động</td>
                    </tr>`;
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginationItems = userProjects.slice(start, end);
  paginationItems.forEach((item, index) => {
    table.innerHTML += ` <tr class="normalRow">
                        <td class="td1">${item.id}</td>
                        <td class="td2">${item.projectName}</td>
                        <td class="td3">
                            <button class="fix" data-index="${item.id}">Sửa</button>
                            <button class="del" data-index="${item.id}">Xoá</button>
                            <button class="detail" project-id="${item.id}">Chi tiết</button>
                        </td>
                    </tr>`;
  });
  addEventListeners();
}

function renderPagination(totalPages) {
  let pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  pagination.innerHTML = ` <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${1})">
                                <span aria-hidden="true" ><i class="fa-solid fa-angles-left"></i></i></span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${
                              currentPage - 1
                            })">
                                <span aria-hidden="true" ><i class="fa-solid fa-chevron-left"></i></span>
                            </a>
                        </li>`;
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += ` <li class="page-item"><a class="page-link page-list"
                                href="#" onclick="changePage(${i})" data-index="${i}">${i}</a></li>`;
  }
  pagination.innerHTML += ` 
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="changePage(${
                              currentPage + 1
                            })">
                                <span aria-hidden="true" ><i class="fa-solid fa-chevron-right"></i></span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="changePage(${totalPages})">
                                <span aria-hidden="true" ><i class="fa-solid fa-angles-right"></i></span>
                            </a>
                        </li>`;
}

function changePage(page) {
  const totalPages = Math.ceil(userProjects.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  let pageLists = document.querySelectorAll(".page-list");
  document.querySelectorAll(".page-list").forEach(function (btn) {
    btn.onclick = function () {
      pageLists.forEach(function (btn) {
        btn.classList.remove("activePage");
      });
      this.classList.add("activePage");
    };
  });
  currentPage = page;
  renderTable(page);
  renderPagination(Math.ceil(userProjects.length / itemsPerPage));
  activePage(page);
}
activePage(currentPage);
function activePage(page) {
  let pageLists = document.querySelectorAll(".page-list");
  pageLists[page - 1].classList.add("activePage");
}
function addEventListeners() {
  document.querySelectorAll(".fix").forEach((btn) => {
    btn.onclick = function () {
      dataIndex = Number(this.getAttribute("data-index"));
      let projectIndex = project.findIndex(
        (i) => i.id === dataIndex && i.user === currentUser
      );
      newNameInput.classList.remove("border_invalid");
      fixInvalid[0].textContent = "";
      fixInvalid[0].classList.remove("overlayToggle");
      newDescInput.classList.remove("border_invalid");
      fixInvalid[1].textContent = "";
      fixInvalid[1].classList.remove("overlayToggle");
      fixOnly.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      newNameInput.value = project[projectIndex].projectName;
      newDescInput.value = project[projectIndex].description;
      fixProject.onclick = null;
      fixProject.onclick = function () {
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
      };
    };
  });
  document.querySelectorAll(".detail").forEach((btn) => {
    btn.onclick = function () {
      choosenProject = Number(this.getAttribute("project-id"));
      localStorage.setItem(
        "SaveChoosenProject",
        JSON.stringify(choosenProject)
      );
      window.location.href = "../Pages/category-manager.html";
    };
  });
}
function deleteTask(index) {
  let projectIndex = project.findIndex(
    (p) => p.id === index && p.user === currentUser
  );
  tasks = tasks.filter(
    (task) => !(task.projectId === index && task.user === currentUser)
  );
  project.splice(projectIndex, 1);
  let totalPages = Math.ceil(
    project.filter((item) => item.user === currentUser).length / itemsPerPage
  );
  if (currentPage > totalPages) {
    currentPage = Math.max(1, totalPages);
  }
  localStorage.setItem("AllProjects", JSON.stringify(project));
  localStorage.setItem("Project-Tasks", JSON.stringify(tasks));
  displayList();
  modalDelete.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  activePage(currentPage);
}
function fix(index) {
  let pIndex = project.findIndex(p => p.user === currentUser && p.id === index)
  let isValid = true;
  let projectName = newNameInput.value.trim();
  let description = newDescInput.value.trim();
  if (projectName === "") {
    isValid = false;
    newNameInput.classList.add("border_invalid");
    fixInvalid[0].textContent = "Tên Danh Mục Không Được Để Trống";
    fixInvalid[0].classList.add("overlayToggle");
  } else if (projectName.length > 50) {
    isValid = false;
    newNameInput.classList.add("border_invalid");
    fixInvalid[0].textContent = "Tên Danh Mục Không Được Quá 50 Kí Tự!";
    fixInvalid[0].classList.add("overlayToggle");
  }
  let check = project.some(function (item) {
    return (
      item.projectName.toLowerCase() === projectName.toLowerCase() &&
      item.id !== project[pIndex].id && item.user === currentUser
    );
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
  } else if (description.length > 100) {
    isValid = false;
    newDescInput.classList.add("border_invalid");
    fixInvalid[1].textContent = "Mô Tả Không Được Quá 100 Kí Tự!";
    fixInvalid[1].classList.add("overlayToggle");
  }
  if (!isValid) return;
  let projectIndex = project.findIndex(
    (i) => i.id === dataIndex && i.user === currentUser
  );
  project[projectIndex].projectName = projectName;
  project[projectIndex].description = description;
  displayList();
  fixOnly.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  activePage(currentPage);
}
//phan tim kiem
let searchByNameInput = document.querySelector(".search");
searchByNameInput.addEventListener("input", function (event) {
  if (searchByNameInput.value === "") {
    displayList();
    activePage(currentPage);
  } else {
    searchByName(searchByNameInput.value);
  }
});
function searchByName(name) {
  userProjects = project.filter(
    (item) =>
      item.projectName.toLowerCase().includes(name.toLowerCase()) &&
      item.user === currentUser
  );
  currentPage = 1;
  renderPagination(Math.ceil(userProjects.length / itemsPerPage));
  renderTable(currentPage);
  activePage(currentPage);
}
//add btn
saveProject.onclick = function () {
  let isValid = true;
  let id = generateId();
  let projectName = taskNameInput.value.trim();
  let description = descriptionInput.value.trim();
  if (projectName === "") {
    isValid = false;
    taskNameInput.classList.add("border_invalid");
    addFixInvalid[0].textContent = "Tên Danh Mục Không Được Để Trống";
    addFixInvalid[0].classList.add("overlayToggle");
  } else if (projectName.length > 50) {
    isValid = false;
    taskNameInput.classList.add("border_invalid");
    addFixInvalid[0].textContent = "Tên Danh Mục Không Được Quá 50 Kí Tự!";
    addFixInvalid[0].classList.add("overlayToggle");
  }
  //validate phan name/mo ta co qua nhieu ki tu
  let check = project.some(function (item) {
    return (
      item.projectName.toLowerCase() === projectName.toLowerCase() &&
      item.user === currentUser
    );
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
  } else if (description.length > 100) {
    isValid = false;
    descriptionInput.classList.add("border_invalid");
    addFixInvalid[1].textContent = "Mô Tả Không Được Quá 100 Kí Tự!";
    addFixInvalid[1].classList.add("overlayToggle");
  }
  if (!isValid) return;
  usedIds.push(id);
  localStorage.setItem("usedIds", JSON.stringify(usedIds))
  let user = currentUser;
  let members = [];
  project.push({ id, projectName, description, user, members });
  displayList();
  fixAddModal.classList.remove("modal_show");
  overlay.classList.remove("overlayToggle");
  activePage(currentPage);
};
descriptionInput.onclick = () => {
  descriptionInput.classList.remove("border_invalid");
  addFixInvalid[1].textContent = "";
  addFixInvalid[1].classList.remove("overlayToggle");
};
taskNameInput.onclick = () => {
  taskNameInput.classList.remove("border_invalid");
  addFixInvalid[0].textContent = "";
  addFixInvalid[0].classList.remove("overlayToggle");
}
newNameInput.onclick = () => {
  newNameInput.classList.remove("border_invalid");
  fixInvalid[0].textContent = "";
  fixInvalid[0].classList.remove("overlayToggle");
};
newDescInput.onclick = () => {
  newDescInput.classList.remove("border_invalid");
  fixInvalid[1].textContent = "";
  fixInvalid[1].classList.remove("overlayToggle");
};
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
toMyProjects.onclick = function () {
  window.location.href = "../Pages/projects.html";
};
let toHome = document.getElementById("toHome");
toHome.onclick = function () {
  window.location.href = "../Pages/dashboard.html";
};

let darkModeToggle = JSON.parse(localStorage.getItem("darkModeToggle"))
darkModeBtn.onclick = function(){
  document.documentElement.classList.remove("dark-mode")
  if(!darkModeToggle){
    body.classList.add("dark-mode")
    darkModeToggle = "dark"
  }else if(darkModeToggle === "dark"){
    body.classList.remove("dark-mode")
    darkModeToggle = "light"
  }else{
    body.classList.add("dark-mode")
    darkModeToggle = "dark"
  }
  localStorage.setItem("darkModeToggle", JSON.stringify(darkModeToggle))
}
darkModeCheck()
function darkModeCheck(){
  if(darkModeToggle === "dark"){
    body.classList.add("dark-mode")
  }else{
    body.classList.remove("dark-mode")
  }
}