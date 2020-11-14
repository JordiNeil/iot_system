var temp1 = "0";
var temp2 = "0";
var temp3 = "0";
var temp4 = "0";

var hum1 = "0";
var hum2 = "0";
var hum3 = "0";
var hum4 = "0";


var datau = {
    p1: '',
    p2: '',
    p3: '',
    p4: ''
};

function activar_actuador(id){
    $.post({
        url: "/actuadores",
        data: JSON.stringify({
            act: String(id),
            estado: String(true)
        }),
        success: function(datosEntrada, status){
            document.getElementById("act"+id+"_status").innerHTML = "ON";
        }
    });
};

function desactivar_actuador(id){
    $.post({
        url: "/actuadores",
        data: JSON.stringify({
            act: String(id),
            estado: String(false)
        }),
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

document.getElementById('b2').addEventListener('click', function() {
    datau.p1 = pregunta1;
    datau.p2 = pregunta2;
    datau.p3 = pregunta3;
    datau.p4 = pregunta4;
    console.log(datau);
    $.post({
        url: "/nota",
        data: JSON.stringify(datau),
        contentType: "application/json",
        success: function(datosEntrada,status) {
            alert("Su nota es: "+ datosEntrada);
        }
    });
});
                                                   
       