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
        .populate('Movilidad')
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
            .populate('Movilidad')
            .populate('Asientos.ClienteDueno')
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
    if( req.body.Movilidad == null ){
        sendJsonResponse(res, 404, {
            "message": "Falta Movilidad"}
        );
        return;
    }

    if( (req.body.yy == null) || 
        (req.body.mm == null) || 
        (req.body.dd == null) || 
        (req.body.HH == null) || 
        (req.body.MM == null) 
    ){    
        sendJsonResponse(res, 404, {
            "message": "Horario incompleto"}
        );
        return;
    }

    var DateParm = [ req.body.yy, req.body.mm, req.body.dd, req.body.HH, req.body.MM ];
    Embarque
        .create({
            Movilidad: req.body.Movilidad,
            yy: DateParm[0],
            mm: DateParm[1],
            dd: DateParm[2],
            HH: DateParm[3],
            MM: DateParm[4],
            ingreso: req.body.ingreso
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
    if (!req.body.embarque) {
        sendJsonResponse(res, 404, {
            "message": "Not found, embarque's id is required"}
            );
        return;
    }

    Embarque
        .findById(req.body.embarque)
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
                embarqueById.yy = req.body.yy;
                embarqueById.mm = req.body.mm;
                embarqueById.dd = req.body.dd;
                embarqueById.HH = req.body.HH;
                embarqueById.MM = req.body.MM;
                embarqueById.ingreso= req.body.ingreso
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

/* Registrar asientos*/

module.exports.RegistrarAsiento = function(req, res) {
    
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
                        "message": "embarque's id is not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }

                addAsientoToEmbarque(req, res, embarqueById);

            }
        );
};

var addAsientoToEmbarque = function(req, res, embarqueById) {
    if (!embarqueById) {
        sendJsonResponse(res, 404, "embarque is empty");
    } else {
        embarqueById.Asientos.push({
            NumAsiento: req.body.NumAsiento,
            ClienteDueno: req.body.ClienteDueno,
        });
    
        embarqueById.save(function(err, embarqueById) {
            var asiento =embarqueById.Asientos[embarqueById.Asientos.length - 1];
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                console.log(asiento);
                sendJsonResponse(res, 200, asiento);
            }
        });
    }    
};
