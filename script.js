var HelloJs = document.createElement('p');
var sect = document.getElementById('section');
var btn = document.querySelector('button');


function prepareUrl(){
    var requestUrl = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='initialDate'&@dataFinalCotacao='finalDate'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao";
    var initialDate = document.getElementById("dataInicial").value;
    var finalDate = document.getElementById("dataFinal").value;
    console.log(initialDate);
    var newRequest = requestUrl.replace("initialDate",initialDate);
    var newRequest2 = newRequest.replace("finalDate",finalDate);
    console.log(newRequest2);
    return(newRequest2);
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

