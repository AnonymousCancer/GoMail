var express = require("express");
var body_parse  = require('body-parser');
var json_file_object = require("json-file-object");
var sql = require("sql.js");
var fs = require('fs');
var path = require('path');
var NodeRSA = require('node-rsa');
var key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
                      'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
                      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
                      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
                      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
                      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
                      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
                      '-----END RSA PRIVATE KEY-----');
key.setOptions({encryptionScheme: 'pkcs1'});

var filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
var db = new sql.Database(filebuffer);
var app = express();
var formidable = require("formidable");
var util = require ('util');
var email = "\'phil\'";
var inbox;
var outbox;
var contact;
var tabInbox=[];
var tabOutbox=[];
var nouveauM;


app.use(body_parse.json() );       // to support JSON-encoded bodies
app.use(body_parse.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var etat = json_file_object({
    file: "etat.json",
    value: {
        encryptedKey: null,
        yp: {},
        letters: []
    }
});

app.locals.pretty = true;

app.get("/", function(req,res) {
		res.render("OpeningScreen.jade");
});

app.get("/loggedin", function(req,res) {
		res.render("courriel.jade");
});
app.get("/loggedout", function(req,res) {
		res.render("OpeningScreen.jade");
});

if(inbox!=undefined&&inbox[0]!=undefined){
for(var i=0; i<inbox[0]['values'].length;i++){
	app.get("/delete"+i, function(req, res){
		filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
		db = new sql.Database(filebuffer);
		db.run("DELETE FROM MESSAGES WHERE CONTENT=\'"+inbox[0]['values'][i][1]+"\';");
    res.render("courriel.jade");
	});
}
}

app.get("/nouveauM", function(req, res){
  res.write("<html><meta charset=\"UTF-8\"><head>");
  res.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/cssCourriel.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script><script src=\"js/javascriptCourriel.js\"></script><title>GoMail</title><link rel=\"shortcut icon\" href=\"image/favicon.ico\" type=\"image/x-icon\"><link rel=\"icon\" href=\"image/favicon.ico\" type=\"image/x-icon\">");
  res.write("</head>");
  res.write("<body>");
  res.write("<div id=\"cac\">GO!MAIL</div><div id=\"dec\">Déconnexion</div><div id=\"header\"><h1><img src=\"image/logo1.png\" alt=\"logoDuSite\" style=\"width:397.8px;height:262.8px;\"></h1></div><br>");
  res.write("<div id=\"mail\"></div><table id=\"t00\"><tr><th id=\"home\">menu</th></tr><tr><th id=\"NewM\">Nouveau message</th></tr><tr><th id=\"inbox\">Inbox</th></tr><tr><th id=\"outbox\">Outbox</th></tr><tr><th id=\"contact\">Contact</th></tr></table>");
  res.write("<form id=\"form1\" action =\"nouvMess\" method=\"post\" enctype=\"multipart/form-data\" ><legend id=\"newLegend\"><label for=\"msgContact\"></label>Send to : <input type=\"text\" name=\"msgContact\" id=\"ContactName\"></form><br><br><label for=\"mailBodyForm\"></label><textarea name=\"mailBodyForm\" id=\"messageInput\" cols=\"150\" rows=\"20\"></textarea></form><br><input type=\'submit\' value='send' id=\"button\"></legend></form>");
  res.write("<div id=\"c1\"><hr></div><div id=\"c2\">Contact us :<a href=\"https://github.com/AnonymousCancer\">AnonymousCancer.org</a></div><div id=\"cancer\">© 2016 AnonymousCancer</div>");
  res.end("</body></html>");
});

app.get("/inbox", function(req, res){
	refreshInbox();
	console.log(inbox[0]['values']);
  res.write("<html><meta charset=\"UTF-8\"><head>");
  res.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/cssCourriel.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script><script src=\"js/javascriptCourriel.js\"></script><title>GoMail</title><link rel=\"shortcut icon\" href=\"image/favicon.ico\" type=\"image/x-icon\"><link rel=\"icon\" href=\"image/favicon.ico\" type=\"image/x-icon\">");
  res.write("</head>");
  res.write("<body>");
  res.write("<div id=\"cac\">GO!MAIL</div><div id=\"dec\">Déconnexion</div><div id=\"header\"><h1><img src=\"image/logo1.png\" alt=\"logoDuSite\" style=\"width:397.8px;height:262.8px;\"></h1></div><br>");
  res.write("<div id=\"mail\"></div><table id=\"t00\"><tr><th id=\"home\">menu</th></tr><tr><th id=\"NewM\">Nouveau message</th></tr><tr><th id=\"inbox\">Inbox</th></tr><tr><th id=\"outbox\">Outbox</th></tr><tr><th id=\"contact\">Contact</th></tr></table>");
  res.write("<table id=\"tabinbox\"><tr id=\"message\"><th id=\"th1\">FROM</th><th id=\"th1\">DATE</th><th id=\"th1\" colspan=\"2\">MESSAGE</th></tr>");
    console.log(inbox);
	for(var i=0;i<inbox[0]['values'].length;i++){
      res.write("<tr><th>"+inbox[0]['values'][i][0]+"</th><th>"+inbox[0]['values'][i][1]+"</th><th>"+inbox[0]['values'][i][2]+"</th></tr>");
    }
    res.write("</table>");
  res.write("<div id=\"c1\"><hr></div><div id=\"c2\">Contact us :<a href=\"https://github.com/AnonymousCancer\">AnonymousCancer.org</a></div><div id=\"cancer\">© 2016 AnonymousCancer</div>");
  res.end("</body></html>");
});

app.get("/outbox", function(req, res){
	refreshOutbox();
	console.log(outbox);
  res.write("<html><meta charset=\"UTF-8\"><head>");
  res.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/cssCourriel.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script><script src=\"js/javascriptCourriel.js\"></script><title>GoMail</title><link rel=\"shortcut icon\" href=\"image/favicon.ico\" type=\"image/x-icon\"><link rel=\"icon\" href=\"image/favicon.ico\" type=\"image/x-icon\">");
  res.write("</head>");
  res.write("<body>");
  res.write("<div id=\"cac\">GO!MAIL</div><div id=\"dec\">Déconnexion</div><div id=\"header\"><h1><img src=\"image/logo1.png\" alt=\"logoDuSite\" style=\"width:397.8px;height:262.8px;\"></h1></div><br>");
  res.write("<div id=\"mail\"></div><table id=\"t00\"><tr><th id=\"home\">menu</th></tr><tr><th id=\"NewM\">Nouveau message</th></tr><tr><th id=\"inbox\">Inbox</th></tr><tr><th id=\"outbox\">Outbox</th></tr><tr><th id=\"contact\">Contact</th></tr></table>");
  res.write("<table id=\"tabinbox\"><tr id=\"message\"><th id=\"th1\">FROM</th><th id=\"th1\">DATE</th><th id=\"th1\" colspan=\"2\">MESSAGE</th></tr>");
    for(var i=0;i<outbox[0]['values'].length;i++){
      res.write("<tr><th>"+outbox[0]['values'][i][0]+"</th><th>"+outbox[0]['values'][i][1]+"</th><th>"+outbox[0]['values'][i][2]+"</th></tr>");
    }
    res.write("</table>");
  res.write("<div id=\"c1\"><hr></div><div id=\"c2\">Contact us :<a href=\"https://github.com/AnonymousCancer\">AnonymousCancer.org</a></div><div id=\"cancer\">© 2016 AnonymousCancer</div>");
  res.end("</body></html>");
});

app.get("/contact", function(req, res){
	refreshContact();
  res.write("<html><meta charset=\"UTF-8\"><head>");
  res.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/cssCourriel.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js\"></script><script src=\"js/javascriptCourriel.js\"></script><title>GoMail</title><link rel=\"shortcut icon\" href=\"image/favicon.ico\" type=\"image/x-icon\"><link rel=\"icon\" href=\"image/favicon.ico\" type=\"image/x-icon\">");
  res.write("</head>");
  res.write("<body>");
  res.write("<div id=\"cac\">GO!MAIL</div><div id=\"dec\">Déconnexion</div><div id=\"header\"><h1><img src=\"image/logo1.png\" alt=\"logoDuSite\" style=\"width:397.8px;height:262.8px;\"></h1></div><br>");
  res.write("<div id=\"mail\"></div><table id=\"t00\"><tr><th id=\"home\">menu</th></tr><tr><th id=\"NewM\">Nouveau message</th></tr><tr><th id=\"inbox\">Inbox</th></tr><tr><th id=\"outbox\">Outbox</th></tr><tr><th id=\"contact\">Contact</th></tr></table>");
  res.write("<table id=\"tabinbox\"><tr id=\"message\"><th id=\"th1\">USERNAME</th><th id=\"th1\" colspan=\"2\">NICKNAME</th></tr>");
    for(var i=0;i<contact.length;i++){
      res.write("<tr><th>"+contact[0]['values'][0][i]+"</th><th>"+contact[0]['values'][i][1]+"</th></tr>");
    }
    res.write("</table>");
res.write("<form id=\"form1\" action =\"addContact\" method=\"post\" enctype=\"multipart/form-data\" ><legend id=\"newLegend\"><label for=\"addContact\"></label><input type=\"text\" name=\"contactName\" id=\"ContactName\" placeholder=\"Username\"><input type=\"text\" name=\"contactNick\" id=\"ContactNick\" placeholder=\"name\"></form><input type=\'submit\' value='send' id=\"button\"></form></legend></form>")
  res.write("<div id=\"c1\"><hr></div><div id=\"c2\">Contact us :<a href=\"https://github.com/AnonymousCancer\">AnonymousCancer.org</a></div><div id=\"cancer\">© 2016 AnonymousCancer</div>");
  res.end("</body></html>");
});

var refreshInbox= function(){
	filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
	db = new sql.Database(filebuffer);
	inbox = db.exec("SELECT SENTFROM,CONTENT FROM MESSAGES WHERE SENTTO=\'"+email+"\';");
	console.log(inbox)
	if(inbox[0]==undefined){
		inbox=[{'values':[["", "", ""]]}];
	}
}

var refreshOutbox = function(){
	filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
	db = new sql.Database(filebuffer);
	outbox = db.exec("SELECT SENTTO,CONTENT FROM MESSAGES WHERE SENTFROM=\'"+email+"\';");
	if(outbox[0]==undefined){
		outbox=[{'values':[["", "", ""]]}];
	}
}

var refreshContact = function(){
	filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
	db = new sql.Database(filebuffer);
	contact = db.exec("SELECT NOM,NICKNAME FROM CONTACTS WHERE USERNAME=\'"+email+"\';");
	if(contact[0]==undefined){
		contact=[{'values':[["",""]]}];
	}
}

app.post("/login", function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
   //on your application.
	email = util.inspect(fields.email);
	email = email.substring(1, (email.length-1));
	email = email.toLowerCase();
	var password = util.inspect(fields.pswd);
	password = password.substring(1, (password.length-1));
	filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
	//username et password
	db = new sql.Database(filebuffer);
	stmt = db.prepare("SELECT * FROM LOGIN WHERE USERNAME=:aval");
	var result = stmt.getAsObject({':aval' : email,});
	var pass = result.PASSWORD;
	
	console.log(result.PASSWORD);
	if(result.PASSWORD==password){
		//obtient les valeurs du inbox, outbox et contact
		inbox = db.exec("SELECT SENTFROM,CONTENT FROM MESSAGES WHERE SENTTO=\'"+email+"\';");
		if(inbox[0]==undefined){
			inbox=[{'values':[["", "", ""]]}];
		}
		/*
		inbox:
			les valeurs de inbox sont pris dans un tableau global avec une position, qui
			à l'intérieur contient 2 catégories: columns, qui contient les noms de colonnes
			sélectionnées du tableau de la database (dans ce cas ci SENTFROM et CONTENT) et la
			catégories values, qui contient les valeurs de chacunes des cellules de la database.
			Après ça, les messages sont dans un tableau à 2 dimensions avec la première dimension qui
			est la rangée, ou le message en tant que tel, et la deuxième dimension est les colonnes,
			donc l'index 0 est la personne qui a envoyé le message, et l'index 1 est le contenu du message.
			Pour le javascript courriel, il faudra modifier les boucles for pour:
			inbox[0]['values'][i][0] pour afficher les personnes qui ont envoyé les messages,
			et inbox[0]['values'][i][1] pour afficher le contenu des message.

			NOTE: Rapellez moi plus tard de faire une fonction pour effacer un message du inbox. Et
			enlevez les boutons de delete pour l'outbox, sinon ça va être sketch.
		*/
		outbox = db.exec("SELECT SENTTO,CONTENT FROM MESSAGES WHERE SENTFROM=\'"+email+"\';");
		if(outbox[0]==undefined){
			outbox=[{'values':[["", "", ""]]}];
		}
		/*
		outbox:
			Si vous avez compris comment fonctionne inbox, outbox sera pas plus difficile.
			Fonctionne encore sous format outbox[0]['values'][i][0||1] pour les index où 0 est
			la personne à qui tu l'envoyes et 1 est le contenu du message.
		*/
		contact = db.exec("SELECT NOM,NICKNAME FROM CONTACTS WHERE USERNAME=\'"+email+"\';");
		if(contact[0]==undefined){
			contact=[{'values':[["",""]]}];
		}
		/*
		contact:
			même format que outbox: 0 est le username et 1 est le nickname.
		*/
		console.log(outbox);
		res.render("courriel.jade");
	}
	else{
		res.render("OpeningScreen.jade");
	}
	db.close;
	console.log(email);
	console.log(password);
	});
});

var getDate= function(){
	var d = new Date();
  if(d.getDate()<10){
    var day="0"+d.getDate()
  }
  else{
    var day=d.getDate()
  }
  if(d.getMonth()<10){
    var month="0"+(d.getMonth()+1)
  }
  else{
    var month=(d.getMonth()+1)
  }
  if(d.getHours()<10){
    var hour="0"+d.getHours()
  }
  else{
    var hour=d.getHours()
  }
  if(d.getMinutes()<10){
    var minute="0"+d.getMinutes()
  }
  else{
    var minute=d.getMinutes()
  }
  if(d.getSeconds()<10){
    var second="0"+d.getSeconds()
  }
  else{
    var second=d.getSeconds()
  }
  return d.getFullYear()+" "+month+" "+day+" "+hour+":"+minute+":"+second;
}

app.post("/nouvMess", function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
	var sendTo = util.inspect(fields.msgContact);
	sendTo = sendTo.substring(1, (sendTo.length-1));
	if(sendTo==""){
		sendTo=email;
	}
	sendTo = sendTo.toLowerCase();
	var msgBody = util.inspect(fields.mailBodyForm);
	msgBody = msgBody.substring(1, (msgBody.length-1));
	if(msgBody==""){
		msgBody="null";
	}
	var date = getDate();
	console.log(date);
	console.log(email);
	console.log(sendTo);
	console.log(msgBody);
	var statement="INSERT INTO MESSAGES VALUES (\""+sendTo+"\", \""+email+"\", \""+date+"\", \""+msgBody+"\");";
	db.run(statement);
	var data = db.export();
	var buffer = new Buffer(data);
	var otherBuffer=fs.writeFileSync('users.sqlite', buffer);
	db.close;
	console.log("Message envoyé!");
  res.render("courriel.jade");
});
});

app.post("/addContact", function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
	var contName = util.inspect(fields.contactName);
	contName = contName.substring(1, (contName.length-1));
	if(contName==""){
		contName=email;
	}
	contName = contName.toLowerCase();
	var contNick = util.inspect(fields.contactNick);
	contNick = contNick.substring(1, (contNick.length-1));
	if(contNick==""){
		contNick="null";
	}
	var statement="INSERT INTO CONTACTS VALUES (\""+email+"\", \""+contName+"\", \""+contNick+"\");";
	db.run(statement);
	var data = db.export();
	var buffer = new Buffer(data);
	var otherBuffer=fs.writeFileSync('users.sqlite', buffer);
	db.close;
	console.log("Message envoyé!");
  res.render("courriel.jade");
});
});

app.post("/register", function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
	email = util.inspect(fields.email);
	email = email.substring(1, (email.length-1));
	email = email.toLowerCase();
	var password = util.inspect(fields.pswd);
	password = password.substring(1, (password.length-1));
	filebuffer = fs.readFileSync(path.join(__dirname, 'users.sqlite'));
	db = new sql.Database(filebuffer);
	stmt = db.prepare("SELECT * FROM LOGIN WHERE USERNAME=:aval");
	var result = stmt.getAsObject({':aval' : email,});
	console.log(res.PASSWORD);
	if(result.PASSWORD!==undefined){
		res.render("OpeningScreen.jade");
		console.log("Un compte avec ce nom existe deja!");
	}
	else{
		var statement="INSERT INTO LOGIN VALUES (\'"+email+"\', \'"+password+"\');";
		db.run(statement);
		console.log("INSERT INTO LOGIN VALUES (\'"+email+"\', \'"+password+"\');");
		res.render("OpeningScreen.jade");
		var data = db.export();
		var buffer = new Buffer(data);
		var otherBuffer=fs.writeFileSync('users.sqlite', buffer);
	}
	db.close;
	console.log(email);
	console.log(password);
	});
})

app.use(express.static('public'));

app.listen(8888);
console.log("Server hosted on port 8888");
