class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this._ano = ano
        this._mes = mes
        this._dia = dia
        this._tipo = tipo
        this._descricao = descricao
        this._valor = valor
    }

    get ano(){
        return this._ano
    }
    
    set ano(ano){
        this._ano = ano
    }

    get mes(){
        return this._mes
    }
    
    set mes(mes){
        this._mes = mes
    }

    get dia(){
        return this._dia
    }
    
    set dia(dia){
        this._dia = dia
    }

    

    get tipo(){
        return this._tipo
    }

    set tipo(tipo){
        this._tipo = tipo
    }
    
    get descricao(){
        return this._descricao
    }

    set descricao(descricao){
        this._descricao = descricao
    }

    get valor(){
        return this._valor
    }
    
    set valor(valor){
        this._valor = valor
    }

    

}

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )



}

