var mongoose = require( 'mongoose' );

//User
var MovilidadSchema = new mongoose.Schema({
    Placa:{
        type:String, 
        required:true, 
        size:8
    },
    Capacidad:{
        type:Number, 
        required:true
    },
    Tipo:{
        type:String, 
        required:true, 
        size:12
    },
    longitud:{
        type:Number 
    },
    latitud:{
        type:Number
    }
});

mongoose.model('Movilidad', MovilidadSchema);
module.exports.Movilidad = MovilidadSchema;
