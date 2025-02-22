const path = require('path');
const { default: mongoose } = require('mongoose');
const usuarioModel = require('../models/Usuario')
const addressModel = require('../models/Endereco')
const planoModel = require('../models/PlanoSaude')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ExcelJS = require('exceljs');


exports.cadastrarUsuario = async (req, res) => { // C create
    console.log("EndPoint On")
    console.log(req.body.rua)
    const endereco = new addressModel({
        endereco1: req.body.formData.rua,
        endereco2: req.body.formData.endereco2, 
        zipCode: req.body.formData.zipCode, 
        cidade: req.body.formData.cidade,
        estado: req.body.formData.estado
    })

    await endereco.save()

    const plano = new planoModel({
        nomePlano: req.body.formData.nomePlano, 
        numeroCartao: req.body.formData.numeroCartao, 
        nomeHospitalPreferencia: req.body.formData.hospital
    })

    await plano.save() 
    console.log("NEw plano", plano)

    const usuario = new usuarioModel({
        idMacom: req.body.formData.idMacom, 
        numeroProntuario: req.body.formData.numeroProntuario,
        senha: req.body.formData.senha, 
        email: req.body.formData.email, 
        nome: req.body.formData.nome, 
        cpf: req.body.formData.cpf,
        dataNasc: req.body.formData.dataNascimento,
        endereco: new mongoose.Types.ObjectId(endereco._id),
        telefone: req.body.formData.celular, 
        nomeEmergencia: req.body.formData.nomeCdE, 
        telefoneEmergencia: req.body.formData.celularCdE, 
        parentesco: req.body.formData.parentescoCdE, 
        temDoenca: req.body.formData.doenca, 
        doenca: req.body.formData.doencaDescricao,
        temAlergia: req.body.formData.temAlergia,
        alergia: req.body.formData.alergiaDescricao, 
        cirurgia: req.body.formData.cirurgiaDescricao,
        internacao: req.body.formData.motivoInternado, 
        medicamento: req.body.formData.nomeMedicamento, 
        dataExamesFinais: req.body.formData.dataExamesFinais,
        peso: req.body.formData.peso, 
        altura: req.body.formData.altura, 
        pressaoArterial: req.body.formData.pressaoArterial, 
        imc: req.body.formData.imc, 
        condFisicaGeral: req.body.formData.condFisica, 
        temPlano: req.body.formData.temPlano, 
        plano: new mongoose.Types.ObjectId(plano._id),
        obsMedica: req.body.formData.observacaoMed,
        recomendacaoEspecifica: req.body.formData.recomendacaoEspecifica, 
        dataUltimaAtualizacao: req.body.formData.ultimaRevisaoMed, 
        proxRevisaoMedica: req.body.formData.proxRevisaoMedica 
    })

    await usuario.save()
    console.log("NEw usuario", usuario)
    return res.status(201).send(usuario)
}

exports.editarUsuario = async (req, res) => {
    const { id } = req.params 

    const oldUsuario = await usuarioModel.findOne({_id: new mongoose.Types.ObjectId(id)})

    const newUsuario = await usuarioModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},
    {
        numeroProntuario: req.body.formData.numeroProntuario,
        senha: req.body.formData.password, 
        email: req.body.formData.email, 
        nome: req.body.formData.nome, 
        cpf: req.body.formData.cpf,
        dataNasc: req.body.formData.dataNascimento,
        endereco: new mongoose.Types.ObjectId(endereco._id),
        telefone: req.body.formData.celular, 
        nomeEmergencia: req.body.formData.nomeCdE, 
        telefoneEmergencia: req.body.formData.celularCdE, 
        parentesco: req.body.formData.parentescoCdE, 
        temDoenca: req.body.formData.doenca, 
        doenca: req.body.formData.doencaDescricao,
        temAlergia: req.body.formData.temAlergia,
        alergia: req.body.formData.alergiaDescricao, 
        cirurgia: req.body.formData.cirurgiaDescricao,
        internacao: req.body.formData.motivoInternado, 
        medicamento: req.body.formData.nomeMedicamento, 
        dataExamesFinais: req.body.formData.dataExamesFinais,
        peso: req.body.formData.peso, 
        altura: req.body.formData.altura, 
        pressaoArterial: req.body.formData.pressaoArterial, 
        imc: req.body.formData.imc, 
        condFisicaGeral: req.body.formData.condFisica, 
        temPlano: req.body.formData.temPlano, 
        plano: new mongoose.Types.ObjectId(plano._id),
        obsMedica: req.body.formData.observacaoMed,
        recomendacaoEspecifica: req.body.formData.recomendacaoEspecifica, 
        dataUltimaAtualizacao: req.body.formData.ultimaRevisaoMed, 
        proxRevisaoMedica: req.body.formData.proxRevisaoMedica 
    },
    {new: true})

    return res.json(newUsuario)
} 

exports.listarUsuarios = async (req, res) => {
    const usuarios = await usuarioModel.find({})

    return res.json(usuarios)
} 

exports.deletarUsuario = async (req, res) => {} // D delete




exports.cadastrarEndereco = async (req, res) => {
    const { address1, address2, zipCode, city, state } = req.body;
    console.log(req.body)
    const address = new addressModel({
        address1,
        address2, 
        zipCode,
        city, 
        state
    })

    await address.save()

    return res.send(address)
}

exports.listUsuarios = async (req, res) => {
    const usuarios = await usuarioModel.find({})

    return res.send(usuarios)
}


exports.obterRelatorio = async (req, res, next) => {
    console.log("teste")
    try {
        const alunos = req.body.alunos;
        let dadosAlunos = await usuarioModel.find({}).populate('endereco').populate('plano');
        const dados = dadosAlunos.map(usuario => { 
            let doencas = usuario.doenca.map(d => d).join('; ');
            let alergias = usuario.alergia.map(a => a).join('; ');
            let cirurgias = usuario.cirurgia.map(c => c.cirurgiaDescricao).join('; ');
            let internacoes = usuario.internacao.map(i => i.motivoInternado).join('; ');
            let medicamentos = usuario.medicamento.map(m => m.nomeMedicamento).join('; ');

            return {
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf,
                id_macom: usuario.idMacom,
                rua: usuario.endereco.endereco1,
                cidade: usuario.endereco.cidade,
                telefone: usuario.telefone,
                nome_contato_emergencia: usuario.nomeEmergencia,
                telefone_contato_emergencia: usuario.telefoneEmergencia,
                parentesco: usuario.parentesco,
                peso: usuario.peso,
                altura: usuario.altura,
                pressao: usuario.pressaoArterial,
                imc: usuario.imc,
                condicao_fisica: usuario.condFisicaGeral,
                plano: usuario.plano.nomePlano,
                numero_cartao_plano: usuario.plano.numeroCartao,
                hospital_preferencia: usuario.plano.nomeHospitalPreferencia,
                observacao_medica: usuario.obsMedica,
                doencas,
                alergias,
                cirurgias,
                internacoes,
                medicamentos
            };
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relatório');
        console.log(dados)

        worksheet.columns = [
            { header: 'Nome', key: 'nome', width: 35 },
            { header: 'E-mail', key: 'email', width: 35 },
            { header: 'CPF', key: 'cpf', width: 15 },
            { header: 'ID Maçom', key: 'id_macom', width: 15 },
            { header: 'Telefone', key: 'telefone', width: 15 },
            { header: 'Nome Contato de Emergencia', key: 'nome_contato_emergencia', width: 25 },
            { header: 'Telefone Contato de Emergencia', key: 'telefone_contato_emergencia', width: 20 },
            { header: 'Parentesco', key: 'parentesco', width: 15 },
            { header: 'Peso', key: 'peso', width: 10 },
            { header: 'Altura', key: 'altura', width: 10 },
            { header: 'Pressão', key: 'pressao', width: 10 },
            { header: 'IMC', key: 'imc', width: 10 },
            { header: 'Condição Física', key: 'condicao_fisica', width: 20 },
            { header: 'Nº Cartao Plano', key: 'numero_cartao_plano', width: 20 },
            { header: 'Hospital Preferência', key: 'hospital_preferencia', width: 20 },
            { header: 'Observação Médica', key: 'observacao_medica', width: 30 },
            { header: 'Rua', key: 'rua', width: 35 },
            { header: 'Cidade', key: 'cidade', width: 20 },
            { header: 'Plano', key: 'plano', width: 15 },
            { header: 'Doenças', key: 'doencas', width: 30 },
            { header: 'Alergias', key: 'alergias', width: 30 },
            { header: 'Cirurgias', key: 'cirurgias', width: 30 },
            { header: 'Internações', key: 'internacoes', width: 30 },
            { header: 'Medicamentos', key: 'medicamentos', width: 30 }
        ];

        // Adicionar dados
        worksheet.addRows(dados);

        const filePath = path.join(__dirname, 'relatorio.xlsx');
        await workbook.xlsx.writeFile(filePath);

        return res.sendFile(filePath);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        res.status(500).send('Erro ao gerar relatório');
    }
};


// exports.obterRelatorio = async (req, res, next) => {
//     try {
//         const alunos = req.body.alunos;
//         let dadosAlunos = alunos ? alunos : await usuarioModel.find({}).populate('endereco').populate('plano')
//         const dados = dadosAlunos?.map(usuario => { 
//             let doencas = ''
//             let alergias = ''
//             let cirurgias = ''
//             let internacoes = ''
//             let medicamentos = ''
//             console.log(usuario.endereco.endereco1)
//             usuario.doenca.map(doenca => doencas += `${doenca}; `)
//             usuario.alergia.map(alergia => alergias += `${alergia}; `)
//             usuario.cirurgia.map(cirurgia => cirurgias += `${cirurgia.cirurgiaDescricao}; `)
//             usuario.internacao.map(internacao => internacoes += `${internacao.motivoInternado}; `)
//             usuario.medicamento.map(medicamento => medicamentos += `${medicamento}; `)

//             return { nome: usuario.nome, email: usuario.email , cpf: usuario.cpf, id_macom: usuario.idMacom, rua: usuario.endereco.endereco1, cidade: usuario.endereco.cidade, telefone: usuario.telefone, nome_contato_emergencia: usuario.nomeCdE, telefone_contato_emergencia: usuario.telefoneEmergencia, parentesco: usuario.parentesco,  peso: usuario.peso, altura: usuario.altura, pressao: usuario.pressaoArterial, imc: usuario.imc, condicao_fisica: usuario.condFisicaGeral, plano: usuario.plano.nomePlano, numero_cartao_plano: usuario.plano.numeroCartao, hospital_preferencia: usuario.plano.nomeHospitalPreferencia, observacao_medica: usuario.obsMedica, doencas: doencas, alergias: alergias, cirurgias: cirurgias, internacoes: internacoes, medicamentos: medicamentos};
//         });
//        console.log("=>", dados)

//         const filePath = path.join(__dirname, 'arquivo.xlsx');

//         const csvWriter = createCsvWriter({
//             path: filePath,
//             header: [
//                 { id: 'nome', title: 'Nome' },
//                 { id: 'email', title: 'E-mail' },
//                 { id: 'cpf', title: 'CPF' },
//                 { id: 'id_macom', title: 'ID Maçom' },
//                 { id: 'telefone', title: 'Telefone' },
//                 { id: 'nome_contato_emergencia', title: 'Nome Contato de Emergencia' },
//                 { id: 'telefone_contato_emergencia', title: 'Telefone Contato de Emergencia' },
//                 { id: 'parentesco', title: 'Paretensco' },
//                 { id: 'peso', title: 'Peso' },
//                 { id: 'altura', title: 'Altura' },
//                 { id: 'pressao', title: 'Pressão' },
//                 { id: 'imc', title: 'IMC' },
//                 { id: 'condicao_fisica', title: 'Condição Física' },
//                 { id: 'numero_cartao_plano', title: 'Nº Cartao Plano' },
//                 { id: 'hospital_preferencia', title: 'Hospital Preferência' },
//                 { id: 'observacao_medica', title: 'Observação Médica' },
//                 { id: 'rua', title: 'Rua' },
//                 { id: 'cidade', title: 'Cidade' },
//                 { id: 'plano', title: 'Plano' },
//                 { id: 'doencas', title: 'Doenças' },
//                 { id: 'cidade', title: 'Cidade' },
//                 { id: 'alergias', title: 'Alergias' },
//                 { id: 'cirurgias', title: 'Cirurgias' },
//                 { id: 'internacoes', title: 'Internações' },
//                 { id: 'medicamentos', title: 'Medicamentos' }
//             ]
//         });

//         await csvWriter.writeRecords(dados);
//         res.sendFile(filePath);
//     } catch (error) {
//         console.error('Erro ao gerar relatório:', error);
//         res.status(500).send('Erro ao gerar relatório');
//     }
// };
