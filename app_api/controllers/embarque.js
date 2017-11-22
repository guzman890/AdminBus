var mongoose = require('mongoose');
var Embarque = mongoose.model('Embarque');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Leer lista de embarques
module.exports.EmbarqueList = function(req,res){
    Embarque
        .find()
        .exec(function(err, embarques) {
            if (!embarques) {
                sendJsonResponse(res, 404, {
                    "message": "embarques not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, embarques);
        });
}

// Leer Embarque por ID mongoDB
module.exports.EmbarqueReadOne = function(req, res) {
    if (req.params.embarque) {
        Embarque
            .findById(req.params.embarque)
            .exec(function(err, embarqueById) {
                console.log("Buscando Embarque by ID");
                if (!embarqueById) {
                    sendJsonResponse(res, 404, {
                        "message": "Embarque not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, embarqueById);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid in request"}
            );
    }
};

// Crear Embarque
module.exports.EmbarqueCreate = function(req, res) {
    Embarque
        .create({
            Movilidad: req.body.Movilidad,
            Fecha: req.body.Fecha
            }, 
            function(err, EmbarqueCreate){
                if(err){
                    console.log(err);
                    sendJsonResponse(res,400,err);
                }else {
                    console.log(EmbarqueCreate);
                    sendJsonResponse(res,201,EmbarqueCreate);
                }
            }
        );
};

// Actualizar embarque
module.exports.EmbarqueUpdateOne = function(req, res) {
    if (!req.params.embarque) {
        sendJsonResponse(res, 404, {
            "message": "Not found, embarque's id is required"}
            );
        return;
    }

    Embarque
        .findById(req.params.embarque)
        .select('-comments')
        .exec(
            function(err, embarqueById) {
                if (!embarqueById) {
                    sendJsonResponse(res, 404, {
                        "message": "embarque's id not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

		        embarqueById.Movilidad = req.body.Movilidad;	
                embarqueById.Fecha = req.body.Fecha
                
		        embarqueById.save(function(err, embarqueById) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        console.log(embarqueById);
                        sendJsonResponse(res, 200, embarqueById);
                    }
                });
            }
        );
};

// Eliminar Embarque
module.exports.EmbarqueDeleteOne = function(req, res) {
    if (req.params.embarque) {
       Embarque
            .findByIdAndRemove(req.params.embarque)
            .exec(
                function(err, embarqueById) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log(embarqueById);
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No Embarque"}
            );
    }
};

/* Llenar asientos*/


