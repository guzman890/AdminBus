var mongoose = require('mongoose');
var Cliente = mongoose.model('Cliente');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Leer lista de clientes
module.exports.ClienteList = function(req,res){
    Cliente
        .find()
        .exec(function(err, clientes) {
            if (!clientes) {
                sendJsonResponse(res, 404, {
                    "message": "clientes not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, clientes);
        });
}

// Leer Cliente por ID mongoDB
module.exports.ClienteReadOne = function(req, res) {
    if (req.params.cliente) {
        Cliente
            .findById(req.params.cliente)
            .exec(function(err, clienteById) {
                console.log("Buscando Cliente by ID");
                if (!clienteById) {
                    sendJsonResponse(res, 404, {
                        "message": "Cliente not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, clienteById);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid in request"}
            );
    }
};

// Crear Cliente
module.exports.ClienteCreate = function(req, res) {
    Cliente
        .create({
                DNI:req.body.DNI,
                Nombre:req.body.Nombre
            }, 
            function(err,ClienteCreate){
                if(err){
                    console.log(err);
                    sendJsonResponse(res,400,err);
                }else {
                    console.log(ClienteCreate);
                    sendJsonResponse(res,201,ClienteCreate);
                }
            }
        );
};

// Actualizar cliente
module.exports.ClienteUpdateOne = function(req, res) {
    if (!req.params.cliente) {
        sendJsonResponse(res, 404, {
            "message": "Not found, cliente's id is required"}
            );
        return;
    }

    Cliente
        .findById(req.params.cliente)
        .select('-comments')
        .exec(
            function(err, cliente) {
                if (!cliente) {
                    sendJsonResponse(res, 404, {
                        "message": "cliente's id not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

		        cliente.DNI=req.body.DNI;	
	    	    cliente.Nombre=req.body.Nombre;
                
		        cliente.save(function(err, cliente) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, cliente);
                    }
                });
            }
        );
};

// Eliminar Cliente
module.exports.ClienteDeleteOne = function(req, res) {
    if (req.params.cliente) {
       Cliente
            .findByIdAndRemove(req.params.cliente)
            .exec(
                function(err, cliente) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No Cliente"}
            );
    }
};
