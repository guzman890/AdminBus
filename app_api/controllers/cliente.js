var mysql = require('mysql');

var arg = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "tahuantinsuyo"
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Leer lista de clientes
module.exports.ClienteList = function(req,res){

    var con = mysql.createConnection(arg);

    con.connect(function(err) {
        if (err){
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log("Connected!");

        con.query(
            "SELECT * FROM cliente", 
            function (err, result, fields) {
                con.end();
                if (err) {
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
}

// Leer Cliente por ID mongoDB
module.exports.ClienteReadOne = function(req, res) {
    if (req.params.DNI) {

        var con = mysql.createConnection(arg);
        
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
    
            con.query(
                "SELECT * FROM cliente WHERE DNI = "+req.params.DNI, 
                function (err, result, fields) {
                    if (err) {
                        con.end();                        
                        sendJsonResponse(res, 404, err);
                        return;
                    }else{
                        console.log(result);                    
                        sendJsonResponse(res, 200, result[0]);
                        return;
                    }
                }
            );
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No cliente in request"}
            );
    }
};

// Crear Cliente
module.exports.ClienteCreate = function(req, res) {

    if (req.body.DNI != null ||
        req.body.Nombre != null) {
        
        var con = mysql.createConnection(arg);
                
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
            
            con.query(
                "INSERT INTO `cliente`(`DNI`, `Nombre`) VALUES ("+req.body.DNI+",'"+req.body.Nombre+"')", 
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
            "message": "No cliente in request"}
        );
    }
};

// Actualizar cliente
module.exports.ClienteUpdateOne = function(req, res) {
    if (!req.body.DNI) {
        
        sendJsonResponse(res, 404, {
            "message": "Not found, cliente's DNI is required"}
            );
        return;
    }

    if (req.body.DNI != null ||
        req.body.Nombre != null) {
        
        var con = mysql.createConnection(arg);
                
        con.connect(function(err) {
            if (err){
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");
            
            con.query(
                "UPDATE cliente SET Nombre= '"+req.body.Nombre+"' WHERE DNI="+req.body.DNI,
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
            "message": "No cliente in request"}
        );
    }
};

// Eliminar Cliente
module.exports.ClienteDeleteOne = function(req, res) {
    if (req.body.DNI) {
            
            var con = mysql.createConnection(arg);
                    
            con.connect(function(err) {
                if (err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log("Connected!");
                
                con.query(
                    "DELETE FROM cliente WHERE DNI="+req.body.DNI,
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
                "message": "No cliente in request"}
            );
        }
};
