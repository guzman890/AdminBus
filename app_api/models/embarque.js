var mongoose = require( 'mongoose' ), Schema = mongoose.Schema;
//require
var dbasiento= require('./asiento');
var dbmovilidad= require('./movilidad');

//Embarque
var EmbarqueSchema = new mongoose.Schema({
    Movilidad: {
        type: Schema.Types.ObjectId,
        ref: "Movilidad",
        required: true
    },
    yy: {
        type: Number,
        required:true
    },
    mm: {
        type: Number,
        required:true
    },
    dd: {
        type: Number,
        required:true
    },
    HH: {
        type: Number,
        required:true
    },
    MM:{
        type: Number,
        required:true
    },
    ingreso:{
        type: Number,
    },
    Asientos: [dbasiento.Asiento]
});

mongoose.model('Embarque', EmbarqueSchema);
