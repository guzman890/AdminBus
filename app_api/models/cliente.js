var mongoose = require( 'mongoose' );

//User
var ClienteSchema = new mongoose.Schema({
    DNI:{
        type:Number, 
    },
    Nombre:{
        type:String, 
        required:true
    }
});

mongoose.model('Cliente', ClienteSchema);
module.exports.Cliente = ClienteSchema;
