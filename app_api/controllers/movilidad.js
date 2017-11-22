var mongoose = require('mongoose');
var Movilidad = mongoose.model('Movilidad');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Leer lista de movilidades
module.exports.MovilidadList = function(req,res){
    Movilidad
        .find()
        .exec(function(err, movilidades) {
            if (!movilidades) {
                sendJsonResponse(res, 404, {
                    "message": "movilidades not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, movilidades);
        });
}

// Leer Movilidad por ID mongoDB
module.exports.MovilidadReadOne = function(req, res) {
    if (req.params.movilidad) {
        Movilidad
            .findById(req.params.movilidad)
            .exec(function(err, movilidadById) {
                console.log("Buscando Movilidad by ID");
                if (!movilidadById) {
                    sendJsonResponse(res, 404, {
                        "message": "Movilidad not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, movilidadById);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid in request"}
            );
    }
};

// Crear Movilidad
module.exports.MovilidadCreate = function(req, res) {
    Movilidad
        .create({
                Placa: req.body.DNI,
                Capacidad: req.body.Capacidad,
                Tipo: req.body.Tipo
            }, 
            function(err, MovilidadCreate){
                if(err){
                    console.log(err);
                    sendJsonResponse(res,400,err);
                }else {
                    console.log(MovilidadCreate);
                    sendJsonResponse(res,201,MovilidadCreate);
                }
            }
        );
};

// Actualizar movilidad
module.exports.MovilidadUpdateOne = function(req, res) {
    if (!req.params.movilidad) {
        sendJsonResponse(res, 404, {
            "message": "Not found, movilidad's id is required"}
            );
        return;
    }

    Movilidad
        .findById(req.params.movilidad)
        .select('-comments')
        .exec(
            function(err, movilidadById) {
                if (!movilidadById) {
                    sendJsonResponse(res, 404, {
                        "message": "movilidad's id not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

		        movilidadById.Placa=req.body.Placa;	
                movilidadById.Capacidad=req.body.Capacidad;
                movilidadById.Tipo=req.body.Tipo
                
		        movilidadById.save(function(err, movilidadById) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        console.log(movilidadById);
                        sendJsonResponse(res, 200, movilidadById);
                    }
                });
            }
        );
};

// Eliminar Movilidad
module.exports.MovilidadDeleteOne = function(req, res) {
    if (req.params.movilidad) {
       Movilidad
            .findByIdAndRemove(req.params.movilidad)
            .exec(
                function(err, movilidadById) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log(movilidadById);
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No Movilidad"}
            );
    }
};
