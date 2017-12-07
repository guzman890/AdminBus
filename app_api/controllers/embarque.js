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

// Leer lista de embarques
module.exports.EmbarqueList = function (req, res) {
    var con = mysql.createConnection(arg);

    con.connect(function (err) {
        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log("Connected!");

        con.query(
            "SELECT * FROM embarque",
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
};

// Leer Embarque por ID mongoDB
module.exports.EmbarqueReadOne = function (req, res) {
    if (req.params.embarque) {

        var con = mysql.createConnection(arg);

        con.connect(function (err) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");

            con.query(
                "SELECT * FROM embarque WHERE embarqueid = " + req.params.embarque,
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
            "message": "No embarque in request"
        }
        );
    }
};

// Crear Embarque
module.exports.EmbarqueCreate = function (req, res) {
    if (req.body.Movilidad == null) {
        sendJsonResponse(res, 404, {
            "message": "Falta Movilidad"
        }
        );
        return;
    }

    if ((req.body.Movilidad == null) ||
        (req.body.yy == null) ||
        (req.body.mm == null) ||
        (req.body.dd == null) ||
        (req.body.HH == null) ||
        (req.body.MM == null) ||
        (req.body.ingreso == null)
    ) {
        sendJsonResponse(res, 404, {
            "message": "Horario incompleto"
        }
        );
        return;
    }

    var DateParm = [req.body.yy, req.body.mm, req.body.dd, req.body.HH, req.body.MM];

    var con = mysql.createConnection(arg);

    con.connect(function (err) {
        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log("Connected!");

        con.query(
            "INSERT INTO embarque(`yy`, `mm`, `dd`, `H`, `M`, `ingreso`, `Movilidad`) VALUES ( " + DateParm[0] + ", " + DateParm[1] + ", " + DateParm[2] + ", " + DateParm[3] + ", " + DateParm[4] + ", " + req.body.ingreso + ", '" + req.body.Movilidad + "')",
            function (err, result, fields) {
                if (err) {
                    con.end();
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
};

// Actualizar embarque
module.exports.EmbarqueUpdateOne = function (req, res) {
    if (!req.body.embarque) {
        sendJsonResponse(res, 404, {
            "message": "Not found, embarque's id is required"
        }
        );
        return;
    }

    if (req.body.embarque != null ||
        req.body.yy != null ||
        req.body.mm != null ||
        req.body.dd != null ||
        req.body.HH != null ||
        req.body.MM != null ||
        req.body.ingreso != null
    ) {

        var con = mysql.createConnection(arg);

        con.connect(function (err) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");

            con.query(
                "UPDATE embarque SET yy= " + req.body.yy + ", mm= " + req.body.mm + ", dd= " + req.body.dd + ", H= " + req.body.HH + ", M= " + req.body.MM + ", ingreso= " + req.body.ingreso + "  WHERE embarqueid=" + req.body.embarque,
                function (err, result, fields) {
                    if (err) {
                        con.end();
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
    } else {
        sendJsonResponse(res, 404, {
            "message": "No embarque in request"
        }
        );
    }
};

// Eliminar Embarque
module.exports.EmbarqueDeleteOne = function (req, res) {
    if (req.params.embarque) {
        var con = mysql.createConnection(arg);

        con.connect(function (err) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log("Connected!");

            con.query(
                "DELETE FROM embarque WHERE embarqueid=" + req.body.embarque,
                function (err, result, fields) {
                    if (err) {
                        con.end();
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
    } else {
        sendJsonResponse(res, 404, {
            "message": "No Embarque"
        }
        );
    }
};

/* Registrar asientos*/
/*
module.exports.RegistrarAsiento = function (req, res) {

    if (!req.params.embarque) {
        sendJsonResponse(res, 404, {
            "message": "Not found, embarque's id is required"
        }
        );
        return;
    }


};
*/
