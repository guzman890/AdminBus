var mongoose = require('mongoose');
var Ubicacion = mongoose.model('Ubicacion');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Leer lista de ubicaciones
module.exports.UbicacionList = function(req,res){
    Ubicacion
        .find()
        .populate('Movilidad')
        .exec(function(err, ubicaciones) {
            if (!ubicaciones) {
                sendJsonResponse(res, 404, {
                    "message": "ubicaciones not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, ubicaciones);
        });
}

// Leer Ubicacion por ID mongoDB
module.exports.UbicacionReadOne = function(req, res) {
    if (req.params.ubicacion) {
        Ubicacion
            .findById(req.params.ubicacion)
            .populate('Movilidad')
            .populate('Asientos.ClienteDueno')
            .exec(function(err, ubicacionById) {
                console.log("Buscando Ubicacion by ID");
                if (!ubicacionById) {
                    sendJsonResponse(res, 404, {
                        "message": "Ubicacion not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, ubicacionById);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No userid in request"}
            );
    }
};

// Crear Ubicacion
module.exports.UbicacionCreate = function(req, res) {
    if( req.body.Movilidad == null ){
        sendJsonResponse(res, 404, {
            "message": "Falta Movilidad"}
        );
        return;
    }

    if( (req.body.latitud == null) || 
        (req.body.longuitud == null)  
    ){    
        sendJsonResponse(res, 404, {
            "message": "Horario incompleto"}
        );
        return;
    }

    Ubicacion
        .create({
            Movilidad: req.body.Movilidad,
            latitud: req.body.latitud,
            longuitud: req.body.longuitud
            }, 
            function(err, UbicacionCreate){
                if(err){
                    console.log(err);
                    sendJsonResponse(res,400,err);
                }else {
                    console.log(UbicacionCreate);
                    sendJsonResponse(res,201,UbicacionCreate);
                }
            }
        );
};

// Actualizar ubicacion
module.exports.UbicacionUpdateOne = function(req, res) {
    if (!req.params.ubicacion) {
        sendJsonResponse(res, 404, {
            "message": "Not found, ubicacion's id is required"}
            );
        return;
    }

    Ubicacion
        .findById(req.params.ubicacion)
        .select('-comments')
        .exec(
            function(err, ubicacionById) {
                if (!ubicacionById) {
                    sendJsonResponse(res, 404, {
                        "message": "ubicacion's id not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

		        ubicacionById.Movilidad = req.body.Movilidad;	
                ubicacionById.latitud = req.body.latitud;
                ubicacionById.longuitud = req.body.longuitud;
                
		        ubicacionById.save(function(err, ubicacionById) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        console.log(ubicacionById);
                        sendJsonResponse(res, 200, ubicacionById);
                    }
                });
            }
        );
};

// Eliminar Ubicacion
module.exports.UbicacionDeleteOne = function(req, res) {
    if (req.params.ubicacion) {
       Ubicacion
            .findByIdAndRemove(req.params.ubicacion)
            .exec(
                function(err, ubicacionById) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log(ubicacionById);
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No Ubicacion"}
            );
    }
};

