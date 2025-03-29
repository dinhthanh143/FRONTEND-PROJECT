let form = document.getElementsByTagName("form")[0];
let validations = document.getElementsByClassName("validation");
let datas = JSON.parse(localStorage.getItem("project_users")) || [];
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let inputs = document.getElementsByTagName("input");

form.addEventListener("submit", function (event) {
  refresh();
  event.preventDefault();
  let email = emailInput.value;
  let password = passwordInput.value;
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
let emailCheck = validateEmail(email, password);
  if (emailCheck === false) {
    isValid = false;
  }
  if (!isValid){
    return
  }else{
    window.location.href = "./dashboard.html"
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
    let check = true
    for(let i=0; i<datas.length;i++){
      if (datas[i].email === email) {
        check = false
      if (datas[i].password === password) {
        return true
      } else {
        validations[1].classList.remove("validation_hide");
        passwordInput.classList.add("invalid_border");
        validations[1].textContent = "Sai mật khẩu";
        return false
      }
    }  
    }
  if(check){
    validations[0].classList.remove("validation_hide");
        emailInput.classList.add("invalid_border");
        validations[0].textContent = "Email không tồn tại hoặc chưa Đăng ký";
        return false
  }
}
