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
    Horario:{
        type: Date,
        required:true
    },
    Asientos: [dbasiento.Asiento]
});

mongoose.model('Embarque', EmbarqueSchema);
