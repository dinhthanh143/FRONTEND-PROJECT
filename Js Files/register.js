let form = document.getElementsByTagName("form")[0];
let validations = document.getElementsByClassName("validation");
let datas = JSON.parse(localStorage.getItem("project_users")) || []
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmInput = document.getElementById("password_confirm");
let inputs = document.getElementsByTagName("input");
let registering = true
form.addEventListener("submit", function (event) {
  refresh();
  event.preventDefault();
  let id = datas.length + 1;
  let fullName = nameInput.value;
  let email = emailInput.value;
  let password = passwordInput.value;
  let confirm = confirmInput.value;
  let isValid = true;
  if (fullName === "") {
    isValid = false;
    validations[0].classList.remove("validation_hide");
    nameInput.classList.add("invalid_border");
    validations[0].textContent = "Họ Tên Không Được Để Trống";
  }
  if (email === "") {
    isValid = false;
    validations[1].classList.remove("validation_hide");
    emailInput.classList.add("invalid_border");
    validations[1].textContent = "Email Không Được Để Trống";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    isValid = false;
    validations[1].classList.remove("validation_hide");
    emailInput.classList.add("invalid_border");
    validations[1].textContent = "Email phải đúng định dạng";
  }
  datas.forEach(function (data, index) {
    if (data.email === email) {
      isValid = false;
      validations[1].classList.remove("validation_hide");
      emailInput.classList.add("invalid_border");
      validations[1].textContent = "Email đã tồn tại";
    }
  })
  
  if (password === "") {
    isValid = false;
    validations[2].classList.remove("validation_hide");
    passwordInput.classList.add("invalid_border");
    validations[2].textContent = "Mật khẩu Không Được Để Trống";
  }else if(password.length <8){
    isValid = false;
    validations[2].classList.remove("validation_hide");
    passwordInput.classList.add("invalid_border");
    validations[2].textContent = "Mật khẩu phải có ít nhất 8 ký tự";
  }
  if (confirm === "" ) {
    isValid = false;
    validations[3].classList.remove("validation_hide");
    confirmInput.classList.add("invalid_border");
    validations[3].textContent = "Xác nhận mật khẩu không được để trống";
  }else if(confirm != password){
    isValid = false;
    validations[3].classList.remove("validation_hide");
    confirmInput.classList.add("invalid_border");
    validations[3].textContent = "Yêu cầu xác nhận lại mật khẩu";
  }
  if (!isValid){
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Đăng Ký Không Thành Công",
      footer: 'Mời Kiểm tra Lại Thông Tin',
      confirmButtonText: 'Đóng',
      customClass: {
        confirmButton: 'customClose'
      }
    });
  
    return
  };
  if(registering){
    datas.push({ id, fullName, email, password });
  }
    registering = false
//   form.innerHTML = `<h1 class="success">Đăng Ký Thành Công ✅</h1>
// <button id="toLogin">Đến Đăng Nhập</button>`;
//   form.style.height = "350px";
  // let toLogin = document.getElementById("toLogin");
  // let title = document.getElementsByClassName("title")[0];
  // title.innerHTML = "";
  Swal.fire({
    title: "Đăng Ký Thành Công ✅",
    html: "Chuyển hướng tới Đăng nhập sau <b></b>s.",
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        const secondsLeft = Math.ceil(Swal.getTimerLeft() / 1000);
        timer.textContent = `${secondsLeft}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      localStorage.setItem("project_users", JSON.stringify(datas));
      window.location.href = "./login.html";
    }
  });
  
  localStorage.setItem("project_users", JSON.stringify(datas));
});

function refresh() {
  Array.from(inputs).forEach(function (input, index) {
    input.onclick = function () {
      validations[index].classList.add("validation_hide");
      input.classList.remove("invalid_border");
    };
  });
}
function toLoginPage() {
  setTimeout(function() {
    window.location.href = "./login.html"
      }, 300);
}
let togglePassword = document.getElementById("togglePassword")
let togglePassword2 = document.getElementById("togglePassword2")
togglePassword.onclick = function(){
  if(passwordInput.type ==="password"){
    passwordInput.setAttribute("type","text")
    togglePassword.classList.replace("fa-eye", "fa-eye-slash")
  }else{
    passwordInput.setAttribute("type","password")
    togglePassword.classList.replace("fa-eye-slash", "fa-eye")
  }
}
togglePassword2.onclick = function(){
  if(confirmInput.type ==="password"){
    confirmInput.setAttribute("type","text")
    togglePassword2.classList.replace("fa-eye", "fa-eye-slash")
  }else{
    confirmInput.setAttribute("type","password")
    togglePassword2.classList.replace("fa-eye-slash", "fa-eye")
  }
}