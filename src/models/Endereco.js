const { Schema, model, mongoose } = require('mongoose');

const EnderecoSchema = new Schema({
    // _id: {},
    endereco1: {
        type: String, 
        required: true,
    },
    endereco2: {
        type: String, 
    },
    zipCode: {
        type: String, 
    },
    cidade: {
        type: String, 
        required: true,
    },
    estado: {
        type: String, 
    },
}, { timestamps: true });


module.exports = model('Endereco', EnderecoSchema);