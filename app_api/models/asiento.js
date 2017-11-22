var mongoose = require( 'mongoose' );
//require
var dbcliente= require('./cliente');

//Embarque
var AsientoSchema = new mongoose.Schema({
    Asiento:{
        type:Number, 
        required:true, 
        size:2
    },
    Clientes: dbcliente.Cliente,
    Fecha:{ 
        type: Date,
        required:true,
        default: Date.now    
    }
});

mongoose.model('Asiento', AsientoSchema);
module.exports.Asiento = AsientoSchema;
