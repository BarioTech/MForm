const { Schema, model, mongoose } = require('mongoose');

const PlanoSaudeSchema = new Schema({
    // _id: {},
    nomePlano: {
        type: String, 
    },
    numeroCartao: {
        type: String, 
    },
    nomeHospitalPreferencia: { // Nome do Hospital de Preferência
        type: String, 
    },
}, { timestamps: true });


module.exports = model('PlanoSaude', PlanoSaudeSchema);