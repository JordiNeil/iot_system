console.log("Servidor prueba");

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("public"));

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'iot'    
});
var sensors_data = {
    s1: '',
    s2: '',
    s3: '',
    s4: ''
};
con.connect();

app.get("/", function(request, response){
    response.status(200); // respondo status
    response.sendFile(__dirname + "/public/index.html");
});

app.get("/dashboard", function(request, response){
    if (flag_log === 1){
        response.status(200); // respondo status
        response.sendFile(__dirname + "/public/dashboard.html");
    }
    
});

app.get("/sensors", function(request, response){
    if (flag_log === 1){
        con.query('SELECT sensor, temp, hum FROM iot.sensores WHERE id in ('+
            'SELECT MAX(id) FROM sensores GROUP BY sensor)', function(error, results, fields){
            var data_db = JSON.parse(JSON.stringify(results));
            console.log(data_db[0]);
            if (data_db[0]){
                sensors_data.s1 = data_db[0];
                sensors_data.s2 = data_db[1];
                sensors_data.s3 = data_db[2];
                sensors_data.s4 = data_db[3];
                response.status(200);
                console.log(sensors_data);
                response.send(sensors_data);
            }
        });
        
    }else{
        alert("La sesión ha caducado, por favor ingrese de nuevo")
        window.location.replace("/");
    }
    
});

app.get("/register", function(request, response){
        response.status(200); // respondo status
        response.sendFile(__dirname + "/public/register.html");
    
});

app.post("/test", function(request, response){
    let data = request.body;
    console.log(data);
    response.status(200); // respondo status   
    response.send("Ok");
});

app.post("/login", function(request, response){
    let data = request.body;
    console.log(data.user);
    console.log(data.pass);
    response.status(200); // respondo status
    if (data.user && data.pass){
        con.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [data.user, data.pass], function(error, results, fields){
            console.log(results)
            var data = JSON.parse(JSON.stringify(results));
            console.log('Resultado Base Datos');
            console.log(data);
            if (data[0]){
                console.log(data[0].id);
                response.status(200);
                response.send("OK");
                console.log('OK');
                flag_log = 1;
            }else{
                response.send("ERROR");
                console.log('NO USER');
                flag_log = 0;
            }
            
        });
    }
});

app.post("/register", function(request, response){
    let data = request.body;
    console.log(data);
    response.status(200); // respondo status
    if (data.user && data.pass){
        con.query('INSERT INTO usuarios (`usuario`,`password`) VALUES (?,?)', [data.user, data.pass], function(error, results, fields){
            var data = JSON.parse(JSON.stringify(results));
            console.log('Resultado Base Datos');
            response.send("OK")
            console.log(data);
        });
    }
});

//Final
app.listen(3000, function() {
    console.log("servidor iniciado")
});

app.post("/nota", function(request, response){
    let data = request.body;
    var nota = 0.0;
    console.log("Respuestas: ")
    console.log(data.p1);
    console.log(data.p2);
    if (data.p1 === "A"){
        nota = nota+ 1.66;
    }
    if (data.p2 === "B"){
        nota = nota+ 1.66;
    }
    if(data.p3  === "C"){
        nota = nota+ 1.66;
    }
    if(data.p4 === "D"){
        nota = nota+1.66;
    }
    response.status(200);
    response.send(String(nota));
    //response.send("Hola, ".concat(data.data).concat(", tu temperatura es:").concat(data.temperature));
});

app.post("/actuadores", function(request, response){
    let data = request.body;
    console.log("comando recibido:");
    console.log(JSON.stringify(data));
    con.query('INSERT INTO actuadores (`actuador`, `estado`) VALUES (?,?)', [data.actuador, data.status], function(error, results, fields){        
    });
    response.status(200);
    response.send("OK");
});

app.post("/set_sensors", function(request, response){
    let data = request.body;
    console.log("comando recibido:");
    console.log(JSON.stringify(data));
    con.query('INSERT INTO sensores (`sensor`, `temp`, `hum`) VALUES (?,?,?)', [data.sensor, data.temp, data.hum], function(error, results, fields){    
        response.status(200);
        response.send("Datos actualizados correctamente");
    });
});

//Final
app.listen(80, function() {
    console.log("servidor iniciado")
});