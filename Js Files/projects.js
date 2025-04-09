if (!localStorage.project_isLoggedIn) {
  window.location.href = "./login.html";
}
let toMyTasks = document.getElementById("myTasks");
toMyTasks.onclick = function () {
  window.location.href = "../Pages/dashboard.html";
};
let logOut = document.querySelector("#logOut");
logOut.onclick = function () {
  window.location.href = "../Pages/login.html";
};
let toHome = document.getElementById("toHome");
toHome.onclick = function () {
  window.location.href = "../Pages/dashboard.html";
};
// Keys
let choosenProject = JSON.parse(localStorage.getItem("SaveChoosenProject"));
let tasks = JSON.parse(localStorage.getItem("Project-Tasks")) || [];
let project = JSON.parse(localStorage.getItem("AllProjects")) || [];
let currentUser = JSON.parse(localStorage.getItem("project_currentUser"));
//DOM
let searchInput = document.querySelector(".search")
let confirmCancel = document.querySelector(".confirmCancel")
let confirmClose = document.getElementById("fa-xmark2")
let overlay = document.getElementById("overlay")
let filter = document.getElementById("filter")
let tableContainer = document.querySelector(".infoTable");
let pagination = document.querySelector(".pagination");
let confirmModal = document.querySelector(".confirmModal")
let confirmBtn = document.querySelector(".confirmBtn")
let currentPage = 1;
let itemsPerPage = 5;
let ProjectIndex;
let currentTasks = []
let filteredTasks = []
let tempName;
confirmCancel.onclick = function(){
  confirmModal.classList.remove("modal_show")
  overlay.classList.remove("overlayToggle")
}
confirmClose.onclick = function(){
  confirmModal.classList.remove("modal_show")
  overlay.classList.remove("overlayToggle")
}
displayAll(tasks);
function displayAll(tasks) {
  tableContainer.innerHTML = ""
  tableContainer.innerHTML = `<h2>Danh Sách Nhiệm Vụ</h2>
  <table>
            
              <tr>
                <th class="col1">Tên Nhiệm Vụ</th>
                <th class="col2">Độ Ưu Tiên</th>
                <th class="col3">Trạng Thái</th>
                <th class="col4">Ngày Bắt Đầu</th>
                <th class="col5">Hạn Chót</th>
                <th class="col6">Tiến độ</th>
              </tr>
  `;
  project.forEach((element) => {
    if (element.user == currentUser) {
      let projectIndex = element.id; 
      let projectHTML = `
        <details open>
          <summary><strong>${element.projectName}</strong></summary>
          <table>`;
      tasks.forEach((task,index) => {
        if (task.projectId === projectIndex && task.user === currentUser) {
          let priorityChange;
          let progressChange;
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
          projectHTML += `
              <tr>
                <td class="col1">${task.taskname}</td>
                <td class="col2"><span class="${priorityChange}">${task.priority}</span></td>
                <td class="col3">${task.status} <i class="fa-solid fa-pen-to-square" data-index="${index}"></i></td>
                <td class="col4">${task.assignDate}</td>
                <td class="col5">${task.dueDate}</td>
                <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
              </tr>`;
        }
      });
      projectHTML += `</table></details>`;
      tableContainer.innerHTML += projectHTML;
    }
  });
  currentTasks = tasks.filter(task => task.user === currentUser)
  fixCheck(currentTasks)
  localStorage.setItem("Project-Tasks", JSON.stringify(tasks));
}
let fixingTask 
function fixCheck(currentTasks){
  document.querySelectorAll(".fa-pen-to-square").forEach(function(btn){
    let dataIndex = Number(btn.getAttribute("data-index"));
    if(tasks[dataIndex].status === "Pending" || tasks[dataIndex].status === "In Progress"){
      btn.classList.add("fixable");
      btn.classList.remove("unfixable");
    } else {
      btn.classList.add("unfixable");
      btn.classList.remove("fixable");
    }
  });

  document.querySelectorAll(".fixable").forEach(function(btn){
    btn.onclick = function(){
      confirmModal.classList.add("modal_show");
      overlay.classList.add("overlayToggle");
      fixingTask = Number(this.getAttribute("data-index"));
    }
  });
  
}
confirmBtn.onclick = function(){
if(tasks[fixingTask].status === "Pending"){
  tasks[fixingTask].status = "In Progress"
}else if(tasks[fixingTask].status === "In Progress"){
  tasks[fixingTask].status = "Pending"
}
confirmModal.classList.remove("modal_show")
overlay.classList.remove("overlayToggle")
if(searchInput.value !== ''){
  searchName(tempName)
}else{
  displayAll(tasks)
}
}
filter.addEventListener("change", function(){
  if(filter.value === "priorityUp"){
    currentTasks.sort((a,b)=> a.priorityType - b.priorityType)
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
  }else  if(filter.value === "priorityDown"){
    currentTasks.sort((a,b)=> b.priorityType - a.priorityType)
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
  }else  if(filter.value === "nearDueDate"){
    currentTasks.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate))
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
  }else  if(filter.value === "farDueDate"){
    currentTasks.sort((a,b)=> new Date(b.dueDate) - new Date(a.dueDate))
    let tempIndex = 0
    tasks.forEach((task,index)=>{
     if (task.user === currentUser){
       tasks[index] = currentTasks[tempIndex]
       tempIndex++
     }
    })
  }
  if(searchInput.value !== ''){
    searchName(tempName)
  }else{
    displayAll(tasks)
  }
})
 //tim kiem theo ten
 searchInput.addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    if(searchInput.value === ''){
      displayAll(tasks)
    }else{
      tempName = searchInput.value;
      searchName(searchInput.value); 
    }
  }
  
 })
function searchName(name) {
  tableContainer.innerHTML = `<h2>Danh Sách Nhiệm Vụ</h2>
  <table>
              <tr>
                <th class="col1">Tên Nhiệm Vụ</th>
                <th class="col2">Độ Ưu Tiên</th>
                <th class="col3">Trạng Thái</th>
                <th class="col4">Ngày Bắt Đầu</th>
                <th class="col5">Hạn Chót</th>
                <th class="col6">Tiến độ</th>
              </tr>
  `;
  project.forEach((element) => {
    if (element.user == currentUser) {
      let projectIndex = element.id;
      let projectHTML = `
        <details open>
          <summary><strong>${element.projectName}</strong></summary>
          <table>`;
      tasks.forEach((task,index) => {
        if (task.projectId === projectIndex && task.taskname.toLowerCase().includes(name.toLowerCase()) && task.user===currentUser) {
          let priorityChange;
          let progressChange;
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
          projectHTML += `
              <tr>
                <td class="col1">${task.taskname}</td>
                <td class="col2"><span class="${priorityChange}">${task.priority}</span></td>
                <td class="col3">${task.status} <i class="fa-solid fa-pen-to-square" data-index="${index}"></i></td>
                <td class="col4">${task.assignDate}</td>
                <td class="col5">${task.dueDate}</td>
                <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
              </tr>`;
        }
      });
      projectHTML += `</table></details>`;
      tableContainer.innerHTML += projectHTML;
    }
  });
  filteredTasks = tasks.filter(task => task.taskname.toLowerCase().includes(name.toLowerCase()) && task.user===currentUser)
  fixCheck(filteredTasks)
}

let personalProjects = []
// displayList()
// function displayList() {
//   personalProjects = project.filter((i) => i.user === currentUser);
//   const totalPage = Math.ceil(personalProjects.length / itemsPerPage);
//   renderTable(currentPage);
//   renderPagination(totalPage);
// }
// function renderTable(page) {
//   tableContainer.innerHTML = `<h2>Danh Sách Nhiệm Vụ</h2>
//   <table>
//               <tr>
//                 <th class="col1">Tên Nhiệm Vụ</th>
//                 <th class="col2">Độ Ưu Tiên</th>
//                 <th class="col3">Trạng Thái</th>
//                 <th class="col4">Ngày Bắt Đầu</th>
//                 <th class="col5">Hạn Chót</th>
//                 <th class="col6">Tiến độ</th>
//               </tr>
//   `;
//   let start = (page - 1) * itemsPerPage;
//   let end = start + itemsPerPage;
//   let paginationItems = personalProjects.slice(start, end);
//   paginationItems.forEach((element, index) => {
//     let projectIndex = element.id;
//     let projectHTML = `
//       <details open>
//         <summary><strong>${element.projectName}</strong></summary>
//         <table>`;
//     tasks.forEach((task) => {
//       if (task.projectId === projectIndex && task.user === currentUser) {
//         let priorityChange;
//         let progressChange;
//         if (task.priority === "Thấp") {
//           priorityChange = "low";
//         } else if (task.priority === "Trung bình") {
//           priorityChange = "medium";
//         } else {
//           priorityChange = "high";
//         }
//         if (task.progress === "Có rủi ro") {
//           progressChange = "risk";
//         } else if (task.progress === "Trễ hạn") {
//           progressChange = "behind";
//         } else {
//           progressChange = "noRisk";
//         }
//         projectHTML += `
//             <tr>
//               <td class="col1">${task.taskname}</td>
//               <td class="col2"><span class="${priorityChange}">${task.priority}</span></td>
//               <td class="col3">${task.status} <i class="fa-solid fa-pen-to-square"></i></td>
//               <td class="col4">${task.assignDate}</td>
//               <td class="col5">${task.dueDate}</td>
//               <td class="col6"><span class="${progressChange}">${task.progress}</span></td>
//             </tr>`;
//       }
//     });
//     projectHTML += `</table></details>`;
//     tableContainer.innerHTML += projectHTML;
//   });
// }
// function renderPagination(page) {
//   pagination.innerHTML = ` <li class="page-item">
//                             <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${
//                               currentPage - 1
//                             })">
//                                 <span aria-hidden="true" >&laquo;</span>
//                             </a>
//                         </li>`;
//   for (let i = 1; i <= page; i++) {
//     pagination.innerHTML += ` <li class="page-item"><a class="page-link"
//                                                       href="#" onclick="changePage(${i})">${i}</a></li>`;
//   }
//   pagination.innerHTML += ` <li class="page-item">
//                             <a class="page-link" href="#" aria-label="Next" onclick="changePage(${
//                               currentPage + 1
//                             })">
//                                 <span aria-hidden="true" >&raquo;</span>
//                             </a>
//                         </li>`;
// }
// function changePage(page) {
//   if (page < 1 || page > Math.ceil(personalProjects.length / itemsPerPage)) return
//   currentPage = page
//   renderTable(page)
//   renderPagination(Math.ceil(personalProjects.length / itemsPerPage)); // == totalPages
//  }
 