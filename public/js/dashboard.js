var temp1 = "0";
var temp2 = "0";
var temp3 = "0";
var temp4 = "0";

var hum1 = "0";
var hum2 = "0";
var hum3 = "0";
var hum4 = "0";


var datau = {
    sensor:'',
    status:''
};

function activar_actuador(id){
    datau.sensor = id;
    datau.status = 1;
    alert("Sensor "+String(id)+" activado");
    $.post({
        url: "/actuadores",
        data: JSON.stringify(datau),
        contentType: "application/json",
        success: function(datosEntrada, status){
            document.getElementById("act"+id+"_status").innerHTML = "ON";
        }
    });
};

function desactivar_actuador(id){
    datau.sensor = String(id);
    datau.status = String(0);
    alert("Sensor "+String(id)+" desactivado");
    $.post({
        url: "/actuadores",
        data: JSON.stringify(datau),
        contentType: "application/json",
        success: function(datosEntrada, status){
            document.getElementById("act"+id+"_status").innerHTML = "OFF";
        }
    });
};


document.getElementById('reload_data').addEventListener('click', function(){
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
});

document.getElementById('update_actuators').addEventListener('click', function() {
    datau.sensor 
    console.log(datau);
    $.post({
        url: "/actuadores",
        data: JSON.stringify(datau),
        contentType: "application/json",
        success: function(datosEntrada,status) {
            alert("Su nota es: "+ datosEntrada);
        }
    });
});
                                                   
       