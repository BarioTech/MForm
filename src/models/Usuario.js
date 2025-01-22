const { Schema, model, mongoose } = require('mongoose');

const UsuarioSchema = new Schema({
    // NÃO IMPLEMENTADO // MAL IMPLEMENTADO
    // SEM CORRESPONDENTE NO FRONT
    numeroProntuario: {
        type: Number, 
    },
    senha: {
        type: String, 
    },
    email: {
        type: String, 
    },

    tipo: {
        type: String, 
        enum: ['admin', 'usuario']
    },
    // 1. Dados Pessoais
    nome: {
        type: String,
        required: true, 
    },
    dataNasc: {
        type: Date,
        required: true,
    },
    idMacom: {
        type: String,
        unique: true,
    },
    endereco: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Endereco',
    },
    telefone: {
        type: String,
        required: true,
    },
    
    // 1.1 Contato de Emergência:
    nomeEmergencia: {
        type: String,
        required: true,
    },
    telefoneEmergencia: {
        type: String,
        required: true,
    },
    parentesco: {
        type: String,
    },

    // 2. Histórico Médico
    temDoenca: {
        type: Boolean,
    },
    doenca: [{
        type: String
    }],
    cpf: {
        type: String
    },
    nomeCdE: {
        type: String
    },
    temAlergia: { 
        type: Boolean,
    },
    alergia: [{    
        type: String 
    }],
    cirurgia: [{ 
        cirurgiaDescricao: {
            type: String
        },
        dataCirurgia: {
            type: Date
        },
    }],
    internacao: [{
        motivoInternado: {
            type: String
        },
        inicioInternado: {
            type: Date
        },
        fimInternado: {
            type: Date
        }
    }],
    medicamento: [{ 
        dosagemMed: {
            type: String, 
        },
        frequenciaMed: {
            type: String,
        },
        nomeMedicamento: {
            type: String, 
        },
        obsTratamento: {
            type: String, 
        },
    }],
   
    // 4. Exames Recentes
    // NÃO IMPLEMENTADO // MAL IMPLEMENTADO
    // Sem correspondente no front
    dataExamesFinais: {
        type: String,
    },

    // 5 Dados de Saúde e Condição Física
    peso: {
        type: Number,
        required: true,
    },
    altura: {
        type: Number,
    },
    pressaoArterial: {
        type: String,
    },
    imc: {
        type: Number,
        required: true,
    },
    condFisicaGeral: { 
        type: String,
        required: true,
    },

    // 6. Plano de Saúde

    temPlano: {
        type: Boolean,
        
    },
    plano: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'PlanoSaude',
    },

    // 7. Observações Médicas e Recomendações

    obsMedica: { 
        type: String,
    },
    recomendacaoEspecifica: {
        type: String,
    },

    
    // 8. Atualizações Periódicas 
    dataUltimaAtualizacao: {
        type: Date,
        required: true,
    },

    // NÃO IMPLEMENTADO // MAL IMPLEMENTADO
    // Sem correspondente no front
    proxRevisaoMedica: {
        type: Date,
    },
}, { timestamps: true });


module.exports = model('Usuarios', UsuarioSchema);