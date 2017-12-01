var mongoose = require( 'mongoose' ), Schema = mongoose.Schema;
//require
var dbmovilidad= require('./movilidad');

//Ubicacion
var UbicacionSchema = new mongoose.Schema({
    Movilidad: {
        type: Schema.Types.ObjectId,
        ref: "Movilidad",
        required: true
    },
    latitud: {
        type: Number,
        size: 2,
        required:true
    },
    longuitud: {
        type: Number,
        size: 2,
        required:true
    }
});

mongoose.model('Ubicacion', UbicacionSchema);
module.exports.Ubicacion = UbicacionSchema;