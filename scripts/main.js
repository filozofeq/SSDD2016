initMainApp();

function initMainApp() {
	ES6Promise.polyfill();
}

function httpGetSync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function prepareURLForSAP( matNumber ) {
	return "https://sapq1522.statoil.no:4337/sap/bc/resources/ssdd2016/mat_" + matNumber + "_.xml";
}

function readMaterialFromSAP() {
	var matNumber = document.getElementById("input_material_nr");
	var url = prepareURLForSAP( matNumber.value );
	return url;
}

function handleResponse( text ) {
	var matDescription = document.getElementById("material_description");
	matDescription.value = text;
}

function processURL() {
	var url = readMaterialFromSAP( );
	httpGetAsync(url, handleResponse );
}