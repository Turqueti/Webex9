var HelloJs = document.createElement('p');
var sect = document.getElementById('section');
var btn = document.querySelector('button');


function prepareUrl(){
    var requestUrl = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='initialDate'&@dataFinalCotacao='finalDate'&$top=100&$orderby=cotationValue%20OrderBy&$format=json&$select=cotationValue,dataHoraCotacao ";
    var newRequest = urlDates(requestUrl);
    newRequest = urlCompraVenda(newRequest);
    newRequest = urlOrder(newRequest);

    console.log(newRequest);
    return(newRequest);
}

function urlDates(requestUrl){
    var initialDate = document.getElementById("dataInicial").value;
    var finalDate = document.getElementById("dataFinal").value;
    var newRequest = requestUrl.replace("initialDate",initialDate);
    newRequest = newRequest.replace("finalDate",finalDate);
    return(newRequest);
}

function urlCompraVenda(requestUrl){
    var newRequest;
    if (document.getElementById('rdCompra').checked) {
        newRequest = requestUrl.replace("cotationValue","cotacaoCompra");
        newRequest = newRequest.replace("cotationValue","cotacaoCompra");
    }else if(document.getElementById('rdVenda').checked){
        newRequest = requestUrl.replace("cotationValue","cotacaoVenda");
        newRequest = newRequest.replace("cotationValue","cotacaoVenda");
    }
    return(newRequest);
}

function urlOrder(requestUrl){
    var newRequest;
    if (document.getElementById('rdMaior').checked) {
        newRequest = requestUrl.replace("OrderBy","desc");
    }else if(document.getElementById('rdMenor').checked){
        newRequest = requestUrl.replace("OrderBy","asc");
    }
    return(newRequest);
}

function getJson(){
    var requestUrl = prepareUrl();
    var request = new XMLHttpRequest();
    request.open('GET',requestUrl,true);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        //console.log(request.response);
        createTable(request.response);
        
    }
    
}

function test(jsonObj){
    //var resposta = jsonObj();
    var valores = jsonObj['value'];

    //console.log(resposta);
    HelloJs.textContent = valores[1].cotacaoCompra;
    //HelloJs.textContent = "oi javascript";
    
    sect.appendChild(HelloJs);
}

function myFunction() {
    var valores = resposta['value'];

    console.log(resposta);
    HelloJs.textContent = valores[1].cotacaoCompra;
    //HelloJs.textContent = "oi javascript";
    
    sect.appendChild(HelloJs);
    
}

function createTable(jsonObj){
    var values = jsonObj['value'];

    var table = document.createElement("table");


    var heading = document.createElement("tr");
    var headingFirstCol = document.createElement("th");
    var headingSecondCol = document.createElement("th");
    var headingThridCol = document.createElement("th");

    headingFirstCol.textContent = 'valor de Compra';
    headingSecondCol.textContent = 'valor de Venda';
    headingThridCol.textContent = 'data';

    heading.appendChild(headingFirstCol);
    heading.appendChild(headingSecondCol);
    heading.appendChild(headingThridCol);

    table.appendChild(heading);

    for(var i = 0; i < values.length ; i++){

        var firstCol = document.createElement("td");
        var secondCol = document.createElement("td");
        var thirdCol = document.createElement("td");

        firstCol.textContent = values[i].cotacaoCompra;
        secondCol.textContent = values[i].cotacaoVenda;
        thirdCol.textContent = values[i].dataHoraCotacao;

        
        var newLine = document.createElement("tr");
        newLine.appendChild(firstCol);
        newLine.appendChild(secondCol);
        newLine.appendChild(thirdCol);
        table.appendChild(newLine);
        console.log('entrou');
        

    }


    sect.appendChild(table);

}


function createOutputCompra(jsonObj){
    var values = jsonObj['value'];

    var table = document.createElement("table");
    
    var heading = document.createElement("tr");
    var headingFirstCol = document.createElement("th");
    var headingSecondCol = document.createElement("th");

    headingFirstCol.textContent = 'valor de Compra';
    headingSecondCol.textContent = 'data';

    heading.appendChild(headingFirstCol);
    heading.appendChild(headingSecondCol);

    table.appendChild(heading);

    for(var i = 0; i < values.length ; i++){

        var firstCol = document.createElement("td");
        var secondCol = document.createElement("td");

        firstCol.textContent = values[i].cotacaoCompra;
        secondCol.textContent = values[i].dataHoraCotacao;

        
        var newLine = document.createElement("tr");
        newLine.appendChild(firstCol);
        newLine.appendChild(secondCol);
        table.appendChild(newLine);
        

    }


    sect.appendChild(table);
}
