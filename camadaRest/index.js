import express from 'express';
import {buscaPorAno, buscaPorId, buscaTodos, calculaReajuste, validaId, validaParametros} from '../camadaServico/servico.js';

const app = express();
let data = new Date();
let msgErro = '';

app.get ('/historicoIPCA',(req,res) => {
    const ano = Number(req.query.ano);
    let resultado = ano ? buscaPorAno(ano) : buscaTodos();
    if (resultado.length > 0)
        res.json(resultado);
    else{
        msgErro = {'Erro':'Ano inválido, nenhum registro encontrado!'};
        res.status(404).json(msgErro);
    }
});

app.get ('/historicoIPCA/reajuste',(req,res) => {
    const valor = Number(req.query.valor);
    const mesInicial = Number(req.query.mesInicial);
    const anoInicial = Number(req.query.anoInicial);
    const mesFinal = Number(req.query.mesFinal);
    const anoFinal = Number(req.query.anoFinal);
    
    if (validaParametros(valor,mesInicial,anoInicial,mesFinal,anoFinal)){
        let resultado = calculaReajuste(valor,mesInicial,anoInicial,mesFinal,anoFinal) 
        res.json({
            valor: valor, 
            reajuste: Number(resultado)
        });
    } else{
        msgErro = {'Erro':'Parâmetros inválidos, não foi possível realizar o cálculo!'};
        res.status(404).json(msgErro);
    }
});

app.get ('/historicoIPCA/:id',(req,res) => {
    let id = Number(req.params.id);
    let idHist = buscaPorId(id);

    if (validaId(id)){ 
        res.json(idHist);
    }
    else if (isNaN(id)){
        msgErro = {'Erro':'Requisição inválida!'};
        res.status(404).json(msgErro);
    }
    else{
        msgErro = {'Erro':'Id inexistente, nenhum registro encontrado!'};    
        res.status(404).json(msgErro);
    }
});

app.listen(8080, () => {
    console.log('Servidor node iniciado em: ' + data);
});
