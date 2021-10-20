function adicionarMarca(marca) {
    let modelo = `<button type="button" style="text-align:center;" class="list-group-item list-group-item-action" onclick="pegarModelos(${marca.codigo})">${marca.nome}</button>`;
    $("#ul_marcas").append(modelo);
}

function adicionarModelo(modelo) {
    let modelo_append = `<button type="button" style="text-align:center;" class="list-group-item list-group-item-action" onclick="pegarAnos(${modelo.codigo})">${modelo.nome}</button>`;
    $("#ul_marcas").append(modelo_append);
}

function adicionarAnos(ano) {
    console.log(JSON.stringify(ano));
    let ano_str = JSON.stringify(ano);
    let ano_slice = ano_str.slice(9,13) + "-" +ano_str.slice(ano_str.length-3,ano_str.length-2);
    console.log(ano_slice)
    let modelo = `<button type="button" style="text-align:center;" class="list-group-item list-group-item-action" onclick="pegarValores(${ano_str.slice(9,13)},${ano_str.slice(ano_str.length-3,ano_str.length-2)})">${ano.nome}</button>`;
    $("#ul_marcas").append(modelo);
}

function pegarMarcas() {
    $.ajax({
        url: `https://parallelum.com.br/fipe/api/v1/carros/marcas`,
        method: "GET",
        success: function(ret) {
            for (marca of ret) {
                adicionarMarca(marca);
            }
        }
    })
}

function pegarModelos(numero_marca) {
    marca_escolhida = numero_marca;
    limpar();
    $("#selecionar").append(`<h3>Selecione um modelo:</h3>`)
    $.ajax({
        url: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${numero_marca}/modelos`,
        method: "GET",
        success: function(ret) {
            for (modelo of ret.modelos) {
                adicionarModelo(modelo);
            }
        }
    })
}

function pegarAnos(numero_modelo) {
    modelo_selecionado = numero_modelo;
    limpar();
    $("#selecionar").append(`<h3>Selecione um ano:</h3>`)
    $.ajax({
        url: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca_escolhida}/modelos/${numero_modelo}/anos`,
        method: "GET",
        success: function(ret) {
            for (ano of ret) {
                //console.log(ano);
                adicionarAnos(ano);
            }
        }
    })
}

function pegarValores(ano,combustivel) {
    console.log(ano);
    var ano_escolhido = ano + "-" + combustivel;
    limpar();
    $.ajax({
        url: `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca_escolhida}/modelos/${modelo_selecionado}/anos/${ano_escolhido}`,
        method: "GET",
        success: function(ret) {
                mostrarTabela(ret); 
        }
    })
}

function limpar() {
    $("#ul_marcas").empty();
    $("#selecionar").empty();
    $("#tabela").empty();
}

function mostrarTabela(ret) {
    limpar();
    $("#selecionar").append(`<h2>${ret.Modelo}</h2>`);
    $("#tabela").append(`<thead>
    <tr>
    <th scope="col" style="text-align: center;">Valor</th>
    <th scope="col" style="text-align: center;">Marca</th>
    <th scope="col" style="text-align: center;">Modelo</th>
    <th scope="col" style="text-align: center;">Ano</th>
    <th scope="col" style="text-align: center;">Combustível</th>
    <th scope="col" style="text-align: center;">Código FIPE</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td style="text-align: center;">${ret.Valor}</td>
    <td style="text-align: center;">${ret.Marca}</td>
    <td style="text-align: center;">${ret.Modelo}</td>
    <td style="text-align: center;">${ret.AnoModelo}</td>
    <td style="text-align: center;">${ret.Combustivel}</td>
    <td style="text-align: center;">${ret.CodigoFipe}</td>
    </tr>`);
}