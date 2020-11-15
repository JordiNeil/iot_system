var temp1 = "0";
var temp2 = "0";
var temp3 = "0";
var temp4 = "0";

var hum1 = "0";
var hum2 = "0";
var hum3 = "0";
var hum4 = "0";

var datau = {
    actuador:'',
    status:''
};

document.getElementById("user_label").onload = function(){set_user_label()};

function set_user_label(){
    // alert("Hola");
    alert("Welcome, "+sessionStorage.getItem("user")+"!");
    if (sessionStorage.getItem("user")){
        document.getElementById("user_label").innerHTML = sessionStorage.getItem("user");
    }else{
        document.getElementById("user_label").innerHTML = "Error while loading user";
    }
    
};

function activar_actuador(id){
    datau.actuador = String(id);
    datau.status = String(1);
    if (sessionStorage.getItem("user")){
        $.post({
            url: "/actuadores",
            data: JSON.stringify(datau),
            contentType: "application/json",
            success: function(datosEntrada, status){        
                document.getElementById("act"+datau.actuador+"_status_on").style.display='block';
                document.getElementById("act"+datau.actuador+"_status_off").style.display='none';
            }
        });
    }else{
        alert("No se ha podido detectar el usuario, nice try!");
        window.location.replace("/");
    }
    
};

function desactivar_actuador(id){
    datau.actuador = String(id);
    datau.status = String(0);
    if (sessionStorage.getItem("user")){
        $.post({
            url: "/actuadores",
            data: JSON.stringify(datau),
            contentType: "application/json",
            success: function(datosEntrada, status){
                document.getElementById("act"+datau.actuador+"_status_on").style.display='none';
                document.getElementById("act"+datau.actuador+"_status_off").style.display='block';
            }
        });
    }else{
        alert("No se ha podido detectar el usuario, nice try!");
        window.location.replace("/");
    }
    
};


document.getElementById('reload_data').addEventListener('click', function(){
    if (sessionStorage.getItem("user")){
        $.get({
            url : "/sensors",
            success: function(datosEntrada, status){            
                document.getElementById("ts1").innerHTML = datosEntrada.s1.temp;
                document.getElementById("hs1").innerHTML = datosEntrada.s1.hum;
                document.getElementById("ts2").innerHTML = datosEntrada.s2.temp;
                document.getElementById("hs2").innerHTML = datosEntrada.s2.hum;
                document.getElementById("ts3").innerHTML = datosEntrada.s3.temp;
                document.getElementById("hs3").innerHTML = datosEntrada.s3.hum;
                document.getElementById("ts4").innerHTML = datosEntrada.s4.temp;
                document.getElementById("hs4").innerHTML = datosEntrada.s4.hum;
            }
        });
    }else{
        alert("No se ha podido detectar el usuario, nice try!");
        window.location.replace("/");
    }
    
});

function logout(){
    sessionStorage.removeItem("user");
    alert("Sesión cerrada correctamente");
    window.location.replace("/");
};
                                                   
       