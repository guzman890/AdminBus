var mongoose = require( 'mongoose' ), Schema = mongoose.Schema;
//require
var dbcliente= require('./cliente');

//Embarque
var AsientoSchema = new mongoose.Schema({
    NumAsiento:{
        type:Number, 
        required:true, 
        size:2
    },
    ClienteDueno: {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    Fecha:{ 
        type: Date,
        required:true,
        default: Date.now    
    }
});
mongoose.model('Asiento', AsientoSchema);
module.exports.Asiento = AsientoSchema;
