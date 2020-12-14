
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this._id
        this._ano = ano
        this._mes = mes
        this._dia = dia
        this._tipo = tipo
        this._descricao = descricao
        this._valor = valor

    }

    get ano() {
        return this._ano
    }

    set ano(ano) {
        this._ano = ano
    }

    get mes() {
        return this._mes
    }

    set mes(mes) {
        this._mes = mes
    }

    get dia() {
        return this._dia
    }

    set dia(dia) {
        this._dia = dia
    }



    get tipo() {
        return this._tipo
    }

    set tipo(tipo) {
        this._tipo = tipo
    }

    get descricao() {
        return this._descricao
    }

    set descricao(descricao) {
        this._descricao = descricao
    }

    get valor() {
        return this._valor
    }

    set valor(valor) {
        this._valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == null || this[i] == undefined || this[i] == '') {
                return false

            }
        }
        return true
    }

}

class BD {
    constructor() {
        this._id = localStorage.getItem('id')

        if (this._id === null) {
            localStorage.setItem('id', 0) //salva id zero quando nao ainda nao ha nenhum objeto cadastrado
        }

    }

    proximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1 //necessario converter para int, pois o JSON recuperado é no formato string
    }

    gravar(despesa) {
        let id = this.proximoId()
        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id) //atualiza o id do ultimo objeto salvo
    }

    recuperarTodosRegistros() {
        let despesas = Array()
        let id = localStorage.getItem('id') //recupera id salvo
        for (let i = 0; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa !== null) { //o contato e sequencial, este teste evita que seja cadastrado um valor null no array despesas
                despesa._id = i
                despesas.push(despesa)
            }

        }
        return despesas;
    }

    pesquisa(despesa) {
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        if (despesa._ano != '') {


            despesasFiltradas = despesasFiltradas.filter(d => d._ano == despesa._ano)
        }

        if (despesa._mes != '') {
            despesasFiltradas = despesasFiltradas.filter(despesas => despesas._mes == despesa._mes)
        }

        if (despesa._dia != '') {
            despesasFiltradas = despesasFiltradas.filter(despesas => despesas._dia == despesa._dia)

        }

        if (despesa._tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(despesas => despesas._tipo == despesa._tipo)

        }

        if (despesa._valor != '') {
            despesasFiltradas = despesasFiltradas.filter(despesas => despesas._valor == despesa._valor)

        }

        if (despesa._descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(despesas => despesas._descricao == despesa._descricao)
        }


        return despesasFiltradas

    }

    remover(id) {
        localStorage.removeItem(id)

    }
}

let bd = new BD()

function cadastrarDespesa() {
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

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        dialogCadastroSucesso(botao, texto, titulo)
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        dialogCadastroErro(botao, texto, titulo)

    }


}

function dialogCadastroSucesso(botao, texto, titulo) {
    botao.className = 'btn btn-success'
    botao.innerHTML = 'Ok'

    texto.innerHTML = 'A despesa foi salva com sucesso!'

    titulo.innerHTML = 'Despesa salva'
    titulo.className = 'text-success'
    $('#dialogGravacao').modal('show') //selecionando o modal do Bootstrap por jQuery
}

function dialogCadastroErro(botao, texto, titulo) {
    botao.className = 'btn btn-danger'
    botao.innerHTML = 'Voltar e corrigir'

    texto.innerHTML = 'Campos obrigatórios não foram preenchidos corretamente!'

    titulo.innerHTML = 'Erro ao adicionar despesa'
    titulo.className = 'text-danger'
    $('#dialogGravacao').modal('show') //selecionando o modal do Bootstrap por jQuery
}

function dialogExclusaoSucesso(botao, texto, titulo) {
    botao.className = 'btn btn-success'
    botao.innerHTML = 'Ok'

    texto.innerHTML = 'A despesa foi excluída com sucesso!'

    titulo.innerHTML = 'Despesa Excluída'
    titulo.className = 'text-success'
    $('#dialogGravacao').modal('show') //selecionando o modal do Bootstrap por jQuery
}


function carregaListaDespesa() {
    let despesas = bd.recuperarTodosRegistros()
    let tabelaDespesas = document.getElementById('tabelaDespesas')

    despesas.forEach(function (d) {
        let linhaTabela = tabelaDespesas.insertRow()   //criando linha para a tabela - objeto tbody



        linhaTabela.insertCell(0).innerHTML = `${d._dia}/${d._mes}/${d._ano}` //criando coluna para a tabela - objeto tbody


        //converter o valor numerico de tipo para a string correspondente
        switch (d._tipo) {
            case '1': d._tipo = 'Alimentação'
                break
            case '2': d._tipo = 'Educação'
                break
            case '3': d._tipo = 'Lazer'
                break
            case '4': d._tipo = 'Saúde'
                break
            case '5': d._tipo = 'Transporte'
                break

        }

        linhaTabela.insertCell(1).innerHTML = d._tipo
        linhaTabela.insertCell(2).innerHTML = d._descricao
        linhaTabela.insertCell(3).innerHTML = d._valor


        //criando botao excluir
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d._id}`
        btn.onclick = function () {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            let botao = document.getElementById('botaoMensagem') //elemento para exibir modal de confirmacao da exclusao
            let texto = document.getElementById('corpoMensagem') //elemento para exibir modal de confirmacao da exclusao
            let titulo = document.getElementById('exampleModalLabel') //elemento para exibir modal de confirmacao da exclusao
            dialogExclusaoSucesso(botao, texto, titulo)
            window.location.reload()
        }
        linhaTabela.insertCell(4).append(btn)

    })

}

function filtrarBusca() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisa(despesa)
    let tabelaDespesas = document.getElementById('tabelaDespesas')

    tabelaDespesas.innerHTML = '' //apagando as linhas e colunas anteriores para inserir os valores filtrados
    console.log(despesas)


    despesas.forEach(function (d) {
        let linhaTabela = tabelaDespesas.insertRow()   //criando linha para a tabela - objeto tbody

        linhaTabela.insertCell(0).innerHTML = `${d._dia}/${d._mes}/${d._ano}` //criando coluna para a tabela - objeto tbody

        //converter o valor numerico de tipo para a string correspondente
        switch (d._tipo) {
            case '1': d._tipo = 'Alimentação'
                break
            case '2': d._tipo = 'Educação'
                break
            case '3': d._tipo = 'Lazer'
                break
            case '4': d._tipo = 'Saúde'
                break
            case '5': d._tipo = 'Transporte'
                break

        }
        linhaTabela.insertCell(1).innerHTML = d._tipo
        linhaTabela.insertCell(2).innerHTML = d._descricao
        linhaTabela.insertCell(3).innerHTML = d._valor
        //criando botao excluir
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d._id}`
        btn.onclick = function () {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            let botao = document.getElementById('botaoMensagem') //elemento para exibir modal de confirmacao da exclusao
            let texto = document.getElementById('corpoMensagem') //elemento para exibir modal de confirmacao da exclusao
            let titulo = document.getElementById('exampleModalLabel') //elemento para exibir modal de confirmacao da exclusao
            dialogExclusaoSucesso(botao, texto, titulo)
            window.location.reload()
        }
        linhaTabela.insertCell(4).append(btn)
    })


}

function dialogCadastroSucesso(botao, texto, titulo) {
    botao.className = 'btn btn-success'
    botao.innerHTML = 'Ok'

    texto.innerHTML = 'A despesa foi salva com sucesso!'

    titulo.innerHTML = 'Despesa salva'
    titulo.className = 'text-success'
    $('#dialogGravacao').modal('show') //selecionando o modal do Bootstrap por jQuery
}