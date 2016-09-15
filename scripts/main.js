initMainApp();

function initMainApp() {
	//ES6Promise.polyfill();
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
	if ( text ) {
		fillInDataFromJSONOData( text );
	}
}

function processURL() {
	var url = readMaterialFromSAP( );
	httpGetAsync(url, handleResponse );
}

function fillInDataFromJSONOData( jsonText ) {

	//jsonText = '{ "description" : "Strawberry jelly, 125g" , "valid_to" : "20190401", "amount_stock": "1.000", "picture_url" : "product1.jpg" }';
	jsonObject = JSON.parse( jsonText );
	
	var description 	= jsonObject.description;
	var validTo			= jsonObject.valid_to;
	var amountInStock 	= jsonObject.amount_stock;
	var pictureURL		= jsonObject.picture_url;
	
	var guiMatDescription = document.getElementById("material_description");
	guiMatDescription.value = description;
	
	var guiMatValidTo = document.getElementById("material_valid_to");
	guiMatValidTo.value = validTo;
	
	var guiAmountInStock = document.getElementById("material_amount_stock");
	guiAmountInStock.value = amountInStock;
	
	var guiMatImage = document.getElementById("material_image");
	guiMatImage.src = "images/" + pictureURL;
}