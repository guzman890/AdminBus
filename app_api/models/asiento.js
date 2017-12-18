var mongoose = require( 'mongoose' ), Schema = mongoose.Schema;

//Embarque
var AsientoSchema = new mongoose.Schema({
    NumAsiento:{
        type:Number, 
        required:true, 
        size:2
    },
    Cliente: {
        type: String,
        required: true
    },
    DNI: {
        type:Number, 
    },
    Fecha:{ 
        type: Date,
        required:true,
        default: Date.now    
    }
});
mongoose.model('Asiento', AsientoSchema);
module.exports.Asiento = AsientoSchema;
