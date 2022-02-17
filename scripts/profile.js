const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
const logged = !!user;
if (!logged) {
    location.href = "./index.html";

}

const users = JSON.parse(localStorage.getItem("users"));

function verifyRegister(name, emailAddress, password) {
    if (name.length < 6) return [true, "El nombre debe tener al menos 6 letras"];
    if (!(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(emailAddress))) return [true, "El mail es incorrecto"];
    if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password))) return [true, "El password debe tener al menos 1 minuscula, 1 numero, 1 mayuscula, 1 caracter especial"];
    if (password.length < 8) return [true, "El password debe tener al menos 8 caracteres"];
    return [false, "Felicidades los cambios se han realizado correctamente"];
}

$(document).ready(function () {
    $(".input").each(function (index, element) {
        const id = $(element).attr("id");
        const value = user[id];
        $(element).val(value);
    });
    $('#logOutBtn').click(e => {
        localStorage.removeItem("user")
        sessionStorage.removeItem("user")
        location.href = './index.html'
    })
    $("#editBtn").click(e => {
        $(".input").each(function (index, element) {
            $(element).removeAttr("disabled");
            $("#confirmBtn").removeAttr("disabled");
        });
    });
    $("#confirmBtn").click(e => {
        const userMatch = users.findIndex(
            (u) => user.email == u.email && user.password == u.password
        );
        const name = $(".input")[0].value;
        const email = $(".input")[1].value;
        const password = $(".input")[2].value;
        const [err, msg] = verifyRegister($(".input")[0].value, $(".input")[1].value, $(".input")[2].value);
        if (userMatch > -1 && !err) {
            user.name = name;
            user.email = email;
            user.password = password;
            $("#msg").text(msg).css("color", "green");
            setTimeout(() => $("#msg").text(" ").css("color", ""), 3000);

            if (localStorage.getItem("user")) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                sessionStorage.setItem("user", JSON.stringify(user));
            }
            users[userMatch] = user;
            localStorage.setItem("users", JSON.stringify(users));
            $(".input").each(function (index, element) {
                $(element).prop("disabled", true);
                $("#confirmBtn").prop("disabled", true);
            });

        } else {
            $("#msg").text(msg);
        }
    });
});