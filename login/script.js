const init = () => {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "email" && password === "password") {
      let count = 3;
      loginBtn.style.background =
        "linear-gradient(145deg, greenyellow,  green)";
      loginBtn.innerHTML = `로그인 성공!`;
      const interval = setInterval(() => {
        if (count === 0) {
          clearInterval(interval);
          window.location.href = "/dashboard";
        }
        loginBtn.innerHTML = `${count}초 후 이동합니다.`;
        count--;
      }, 1000);
    } else {
      loginBtn.style.background = "linear-gradient(145deg, tomato,  red)";
      loginBtn.innerHTML = "로그인 실패!";
      setTimeout(() => {
        loginBtn.innerHTML = "로그인";
        loginBtn.style.background = "#3498db";
      }, 2000);
    }
  });
};
document.addEventListener("DOMContentLoaded", init);
