var mongoose = require( 'mongoose' );
//require
var dbasiento= require('./asiento');
var dbmovilidad= require('./movilidad');

//Embarque
var EmbarqueSchema = new mongoose.Schema({
    Movilidad: dbmovilidad.Movilidad,
    Fecha: { 
        type: Date,
        required:true 
    },
    Clientes: [dbasiento.Asiento],
});

mongoose.model('Embarque', EmbarqueSchema);
