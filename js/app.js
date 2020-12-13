
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

    validarDados(){
        for (let i in this) {
            if (this[i] == null || this[i] == undefined || this[i] == '') {
                return false
                
            }
        }
        return true
    }

}

class BD{
    constructor(){
        this._id = localStorage.getItem('id')

        if(this._id === null){
            localStorage.setItem('id', 0) //salva id zero quando nao ainda nao ha nenhum objeto cadastrado
        }

    }

    proximoId(){
        let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1 //necessario converter para int, pois o JSON recuperado é no formato string
    }

    gravar(despesa){    
        let id = this.proximoId()  
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id) //atualiza o id do ultimo objeto salvo
    }

    recuperarTodosRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id') //recupera id salvo
        for(let i = 0; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa !== null){ //o contato e sequencial, este teste evita que seja cadastrado um valor null no array despesas
                despesas.push(despesa)
            }
            
        }
        return despesas;
    }
}

let bd = new BD()

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

    let botao = document.getElementById('botaoMensagem')
    let texto = document.getElementById('corpoMensagem')
    let titulo = document.getElementById('exampleModalLabel')

    if(despesa.validarDados()){
        bd.gravar(despesa)       
        dialogSucesso(botao, texto, titulo)
        
    }else{
        dialogErro(botao, texto, titulo)
        
    }
    

}

function dialogSucesso(botao, texto, titulo){
    botao.className = 'btn btn-success'
    botao.innerHTML = 'Ok'

    texto.innerHTML = 'A despesa foi salva com sucesso!'

    titulo.innerHTML = 'Despesa salva'
    titulo.className = 'text-success'  
    $('#dialogGravacao').modal('show') //selecionando o modal do Bootstrap por jQuery
}

function dialogErro(botao, texto, titulo){
    botao.className = 'btn btn-danger'
    botao.innerHTML = 'Voltar e corrigir'

    texto.innerHTML = 'Campos obrigatórios não foram preenchidos corretamente!'

    titulo.innerHTML = 'Erro ao adicionar despesa'
    titulo.className = 'text-danger'
    $('#dialogGravacao').modal('show') //selecionando o modal do Bootstrap por jQuery
}

function carregaListaDespesa(){
    let despesas = bd.recuperarTodosRegistros()
    let tabelaDespesas = document.getElementById('tabelaDespesas')
    
    despesas.forEach(function(d){
       let linhaTabela = tabelaDespesas.insertRow()   //criando linha para a tabela - - objeto tbody

        linhaTabela.insertCell(0).innerHTML = `${d._dia}/${d._mes}/${d._ano}` //criando coluna para a tabela - objeto tbody
        linhaTabela.insertCell(1).innerHTML = d._tipo
        linhaTabela.insertCell(2).innerHTML = d._descricao
        linhaTabela.insertCell(3).innerHTML = d._valor
    })

}