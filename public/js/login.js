
var usuario = '0';
var password = '0';
var usuariot = '0';

var datau = {
    user: '',
    pass: ''
};
document.getElementById('b1').addEventListener('click', function() {
    datau.user = document.getElementById("email").value;
    datau.pass = document.getElementById("password").value;
    //usuariot = datau.user;
    //document.getElementById("nusuario1").innerHTML = usuario;
$.post({
    url: "/login",
    
    data: JSON.stringify(datau),
    contentType: "application/json",
    success: function(datosEntrada,status) {
        if(datosEntrada === "OK") {            
            sessionStorage.setItem("user", datau.user);
            window.location.replace('/dashboard');
            
        }else
       {
       
       alert("Nombre de usuario y/o contraseña incorrectos");
       }
    }
});
});

                                             
                                                   
                                                   