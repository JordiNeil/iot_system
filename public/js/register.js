var datau = {
    user: '',
    pass: ''
};

var confirm_pass = 't';

document.getElementById('reg').addEventListener('click', function() {
    datau.user = document.getElementById("email").value;
    datau.pass = document.getElementById("password").value;
    confirm_pass = document.getElementById("conf_password").value;
    if (confirm_pass === datau.pass){
        $.post({
            url: "/register",
            data: JSON.stringify(datau),
            contentType: "application/json",
            success: function(datosEntrada,status) {
                if(datosEntrada === "OK") {
                    alert("Usuario registrado correctamente");
                    window.location.replace('/');
                }else
               {
               alert("No se ha podido completar el registro");
               }
            }
        });

    }else{
        alert("Las contraseñas no coinciden");
        document.getElementById("password").value = '';
        document.getElementById("conf_password").value = '';
    }

});
      