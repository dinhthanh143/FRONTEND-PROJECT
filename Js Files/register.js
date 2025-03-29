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
  }
  if (confirm === "" || confirm != password) {
    isValid = false;
    validations[3].classList.remove("validation_hide");
    confirmInput.classList.add("invalid_border");
    validations[3].textContent = "Yêu cầu xác nhận lại mật khẩu";
  }
  if (!isValid) return;
  if(registering){
    datas.push({ id, fullName, email, password });
  }
    registering = false
  form.innerHTML = `<h1 class="success">Đăng Ký Thành Công ✅</h1>
<button id="toLogin">Đăng Nhập</button>`;
  form.style.height = "350px";
  let toLogin = document.getElementById("toLogin");
  let title = document.getElementsByClassName("title")[0];
  title.innerHTML = "";
  toLogin.addEventListener("click", function () {
    localStorage.setItem("project_users", JSON.stringify(datas));
    window.location.href = "./login.html";
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

