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
        size: 2,
        required:true
    },
    mm: {
        type: Number,
        size: 2,
        required:true
    },
    dd: {
        type: Number,
        size: 2,
        required:true
    },
    HH: {
        type: Number,
        size: 2,
        required:true
    },
    MM:{
        type: Number,
        size: 2,
        required:true
    },
    Asientos: [dbasiento.Asiento]
});

mongoose.model('Embarque', EmbarqueSchema);
