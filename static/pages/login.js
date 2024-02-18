if(location.pathname.indexOf("loginin")>=0){location.replace("login")}
let data = JSON.parse(document.getElementById("data").innerHTML)

document.title = "התחברות"
document.getElementById("root").innerHTML += /*html*/`
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="static/css/login.css"/>

    <div id="Login_Page">
        <img src="static/img/login.jpg" alt="login image" class="login__img">

        <div class="login__form">
            <h1 class="login__title">Login</h1>
            <div class="login__content">
                <div class="login__box">
                    <i class="ri-user-3-line login__icon"></i>
                    <div class="login__box-input">
                        <input type="email" name="email" required class="login__input" id="login-email" placeholder=" ">
                        <label for="login-email" class="login__label">Email</label>
                    </div>
                </div>
                <div class="login__box">
                    <i class="ri-lock-2-line login__icon"></i>
                    <div class="login__box-input">
                        <input type="password" name="password" required class="login__input" id="login-pass" placeholder=" ">
                        <label for="login-pass" class="login__label">Password</label>
                        <i class="ri-eye-off-line login__eye" id="login-eye" onclick="showPass()"></i>
                    </div>
                </div>
            </div>
            <div class="login__check">
                <div class="login__check-group">
                    <input type="checkbox" class="login__check-input" id="login-check">
                    <label for="login-check" class="login__check-label">Remember me</label>
                </div>
                <a href="#" class="login__forgot">Forgot Password?</a>
            </div>

            <button type="submit" onclick="loginHandler()" class="login__button">Login</button>
        </div>
    </div>

`


function showPass(){
    const input = document.getElementById("login-pass")
    const iconEye = document.getElementById("login-eye")
        if(input.type === 'password'){
        input.type = 'text'
        iconEye.classList.add('ri-eye-line')
        iconEye.classList.remove('ri-eye-off-line')
    } else{
        input.type = 'password'
        iconEye.classList.remove('ri-eye-line')
        iconEye.classList.add('ri-eye-off-line')
    }
}


function loginHandler(){
    const email = document.getElementById("login-email").value
    const password  = document.getElementById("login-pass").value
    const token  = document.cookie["token"] || data.user.token || "-1null"
    POST("/loginin",{email:email,password:password,token:token},(res)=>{
        if(res.status == 200){
            let date = new Date();
            date.setTime(date.getTime() + (10*24*60*60*1000));
            document.cookie =`token=${res.newToken}; expires=${date.toUTCString()};path=/`;
            location.replace("home")
        }
    })
}