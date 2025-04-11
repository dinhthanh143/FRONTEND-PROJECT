let form = document.getElementsByTagName("form")[0];
let validations = document.getElementsByClassName("validation");
let datas = JSON.parse(localStorage.getItem("project_users")) || [];
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let inputs = document.getElementsByTagName("input");
let container = document.querySelector(".container");
let savePasswordCheck = document.getElementById("savePassword");
form.addEventListener("submit", function (event) {
  refresh();
  event.preventDefault();
  let email = emailInput.value;
  let password = passwordInput.value;
  let savePassword = savePasswordCheck.checked;
  let isValid = true;
  if (email === "") {
    isValid = false;
    validations[0].classList.remove("validation_hide");
    emailInput.classList.add("invalid_border");
    validations[0].textContent = "Email Không Được Để Trống";
  }
  if (password === "") {
    isValid = false;
    validations[1].classList.remove("validation_hide");
    passwordInput.classList.add("invalid_border");
    validations[1].textContent = "Mật khẩu Không Được Để Trống";
  }
  if (isValid) {
    let emailCheck = validateEmail(email, password);
    if (emailCheck === false) {
      isValid = false;
    }
  }
  if (!isValid) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Đăng Nhập Không Thành Công",
      footer: "Mời Kiểm tra Lại Thông Tin",
      confirmButtonText: "Đóng",
      customClass: {
        confirmButton: "customClose",
      },
    });
    return;
  } else {
    let userIndex = datas.findIndex((user) => user.email === email);
    datas[userIndex].save = savePassword;
    container.style.display = "none";
    localStorage.setItem("project_users", JSON.stringify(datas));
    localStorage.setItem("project_currentUser", JSON.stringify(email));
    localStorage.setItem("project_isLoggedIn", "true");
    Swal.fire({
      title: "Đăng Nhập Thành Công ✅",
      html: "Chuyển hướng tới trang chính sau <b></b> giây...",
      timer: 5000,
      timerProgressBar: false,
      confirmButtonText: "Bỏ Qua",
      customClass: {
        confirmButton: "customClose",
      },
      didOpen: () => {
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          const secondsLeft = Math.ceil(Swal.getTimerLeft() / 1000);
          timer.textContent = `${secondsLeft}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
        window.location.href = "./dashboard.html";
      },
    });
  }
});
emailInput.addEventListener("input", function () {
  let userIndex = datas.findIndex((user) => user.email === emailInput.value);
  if (!datas[userIndex].save || datas[userIndex].save === false) {
    return
  } else if(datas[userIndex].save === true){
    savePasswordCheck.checked = true
    passwordInput.value = datas[userIndex].password
  }
});

function refresh() {
  Array.from(inputs).forEach(function (input, index) {
    input.onclick = function () {
      validations[index].classList.add("validation_hide");
      input.classList.remove("invalid_border");
    };
  });
}

function validateEmail(email, password) {
  let check = true;
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].email === email) {
      check = false;
      if (datas[i].password === password) {
        return true;
      } else {
        validations[1].classList.remove("validation_hide");
        passwordInput.classList.add("invalid_border");
        validations[1].textContent = "Sai mật khẩu";
        return false;
      }
    }
  }
  if (check) {
    validations[0].classList.remove("validation_hide");
    emailInput.classList.add("invalid_border");
    validations[0].textContent = "Email không tồn tại hoặc chưa Đăng ký";
    return false;
  }
}
function toRegisterPage() {
  setTimeout(function () {
    window.location.href = "./register.html";
  }, 300);
}
let togglePassword = document.getElementById("togglePassword");
togglePassword.onclick = function () {
  if (passwordInput.type === "password") {
    passwordInput.setAttribute("type", "text");
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.setAttribute("type", "password");
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
};
