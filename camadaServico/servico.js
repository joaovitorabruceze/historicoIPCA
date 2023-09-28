import historicoInflacao from '../camadaDados/dados.js';

function buscaTodos(){
    return historicoInflacao;
}

function buscaPorId(id) {
    return  historicoInflacao.find(historico => historico.id === id);
}

const buscaPorAno = (anoBusca) => {
    return historicoInflacao.filter(historico => historico.ano === anoBusca);
};

function validaId(id) {
    return id >= 1 && id <= 101;
}

function validaParametros(valor,mesInicial,anoInicial,mesFinal,anoFinal) {
    let anoLimiteInicial = historicoInflacao[0].ano
    let anoLimiteFinal = historicoInflacao[historicoInflacao.length - 1].ano;
    let mesLimiteFinal = historicoInflacao[historicoInflacao.length - 1].mes;
    if (
        isNaN(valor) ||
        isNaN(mesInicial) ||
        isNaN(anoInicial) ||
        isNaN(mesFinal) ||
        isNaN(anoFinal) ||
        mesInicial < 1 || mesInicial > 12 ||
        anoInicial < anoLimiteInicial || anoInicial > anoLimiteFinal ||
        mesFinal < 1 || mesFinal > 12 ||
        anoFinal < anoLimiteInicial || anoFinal > anoLimiteFinal ||
        (anoFinal === anoLimiteFinal && mesFinal > mesLimiteFinal) ||
        anoFinal < anoInicial ||
        (anoFinal === anoInicial && mesFinal < mesInicial)
    )
        return false;
    else 
        return true;
}

function calculaReajuste(valor,mesInicial,anoInicial,mesFinal,anoFinal) {
    let intervaloCalculo = historicoInflacao.filter( historico => {
        if (anoInicial === anoFinal){
        return historico.ano === anoInicial && historico.mes >= mesInicial && historico.mes <= mesFinal;
        } else{
        return (
            (historico.ano === anoInicial && historico.mes >= mesInicial) ||
            (historico.ano > anoInicial && historico.ano < anoFinal) ||
            (historico.ano === anoFinal && historico.mes <= mesFinal)
        );
        }
    });

    let resultado = valor;
    for (let elemento of intervaloCalculo) {
        resultado *= 1 + (elemento.ipca / 100);
    }
    return resultado.toFixed(2);
}
export {buscaTodos,buscaPorId,buscaPorAno,validaId,calculaReajuste,validaParametros};
