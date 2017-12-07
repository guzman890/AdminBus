var mysql = require('mysql');

var arg = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "tahuantinsuyo"
};

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// Leer lista de movilidades
module.exports.MovilidadList = function (req, res) {
    var con = mysql.createConnection(arg);

    con.connect(function (err) {
        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log("Connected!");

        con.query(
            "SELECT * FROM movilidad",
            function (err, result, fields) {
                con.end();
                if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                } else {
                    console.log(result);
                    sendJsonResponse(res, 200, result);
                    return;
                }
            }
        );
    });
}

// Leer Movilidad por ID mongoDB
module.exports.MovilidadReadOne = function (req, res) {
    if (req.params.placa) {

        var con = mysql.createConnection(arg);

        con.connect(function (err) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");

            con.query(
                "SELECT * FROM movilidad WHERE placa = '" + req.params.placa +"'",
                function (err, result, fields) {
                    if (err) {
                        con.end();
                        sendJsonResponse(res, 404, err);
                        return;
                    } else {
                        console.log(result);
                        sendJsonResponse(res, 200, result[0]);
                        return;
                    }
                }
            );
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No movilidad in request"
        }
        );
    }
};

// Crear Movilidad
module.exports.MovilidadCreate = function (req, res) {
    if (req.body.placa != null ||
        req.body.Capacidad != null||
        req.body.Tipo != null
        ) {
        
        var con = mysql.createConnection(arg);
                
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
            
            con.query(
                "INSERT INTO movilidad(`Placa`, `Capacidad`, `Tipo`) VALUES ('"+req.body.placa+"', "+req.body.Capacidad+", '"+req.body.Tipo+"')", 
                function (err, result, fields) {
                    if (err) {
                        con.end();                        
                        sendJsonResponse(res, 404, err);
                        return;
                    }else{
                        console.log(result);                    
                        sendJsonResponse(res, 200, result);
                        return;
                    }
                }
            );
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No movilidad in request"}
        );
    }
};

// Actualizar movilidad
module.exports.MovilidadUpdateOne = function (req, res) {
    if (!req.body.placa) {
        sendJsonResponse(res, 404, {
            "message": "Not found, movilidad's id is required"
        }
        );
        return;
    }

    if (req.body.placa != null ||
        req.body.Capacidad != null ||
        req.body.Tipo != null ) {
        
        var con = mysql.createConnection(arg);
                
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
            
            con.query(
                "UPDATE movilidad SET Capacidad= "+req.body.Capacidad+" ,Tipo ='"+req.body.Tipo+"' WHERE Placa='"+req.body.placa+"'",
                function (err, result, fields) {
                    if (err) {
                        con.end();                        
                        sendJsonResponse(res, 404, err);
                        return;
                    }else{
                        console.log(result);                    
                        sendJsonResponse(res, 200, result);
                        return;
                    }
                }
            );
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No movilidad in request"}
        );
    }
};

// Eliminar Movilidad
module.exports.MovilidadDeleteOne = function (req, res) {
    if (req.body.placa) {
        
        var con = mysql.createConnection(arg);
                
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
            
            con.query(
                "DELETE FROM movilidad WHERE Placa="+req.body.placa,
                function (err, result, fields) {
                    if (err) {
                        con.end();                        
                        sendJsonResponse(res, 404, err);
                        return;
                    }else{
                        console.log(result);                    
                        sendJsonResponse(res, 200, result);
                        return;
                    }
                }
            );
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No movilidad in request"}
        );
    }
};

module.exports.MovilidadUpdateGPS = function (req, res) {
    if (!req.body.placa) {
        sendJsonResponse(res, 404, {
            "message": "Not found, movilidad's id is required"
        }
        );
        return;
    }

    if (req.body.placa != null ||
        req.body.longitud != null ||
        req.body.latitud != null ) {
        
        var con = mysql.createConnection(arg);
                
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
            
            con.query(
                "UPDATE movilidad SET latitud= "+req.body.latitud+" ,longitud= "+req.body.longitud+" WHERE Placa='"+req.body.placa+"'",
                function (err, result, fields) {
                    if (err) {
                        con.end();                        
                        sendJsonResponse(res, 404, err);
                        return;
                    }else{
                        console.log(result);                    
                        sendJsonResponse(res, 200, result);
                        return;
                    }
                }
            );
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No movilidad in request"}
        );
    }
};