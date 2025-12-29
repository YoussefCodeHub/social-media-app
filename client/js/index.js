const baseURL = "http://localhost:5000";

$("#login").click(() => {
  const email = $("#email").val();
  const password = $("#password").val();
  const data = {
    email,
    password,
  };
  console.log({ data });
  axios({
    method: "post",
    url: `${baseURL}/api/auth/signin`,
    data: data,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      const accessToken = response.data.data?.accessToken;
      const message = response.data.message;
      if (message == "Logged in successfully" && accessToken) {
        localStorage.setItem("token", accessToken);
        window.location.href = "chat.html";
      } else {
        console.log("In-valid email or password");
        alert("In-valid email or password");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
