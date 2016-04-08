$(document).ready(function(){
  $("#inbox").click(inboxRefresh=function(){
    $("#mail").html("");
  $("#mail").append("<tr id=message><th id=th1>FROM</th><th id=th1>DATE</th><th id=th1 colspan=2>MESSAGE</th></tr>");
    var keys=Object.keys(etat.yp[0]);

    for(var i=0;i<etat.inbox.length;i++){
      var name="";
      for(var j=0;j<keys.length;j++){
        if(etat.inbox[i]["from"]==keys[j]){
          name=etat.yp[0][keys[j]]["name"];
        }
      }
      if(name==""){
        name=etat.inbox[i]["from"]
      }
    }
    for(var i=0;i<etat.inbox.length;i++){
      $("#mail").append("<tr id=message><th>"+name+"</th><th>"+etat.inbox[i]["date"]+"</th><th>"+etat.inbox[i]["msg"]+"</th><th><input type='button' name='submit' value='delete' id=\"button\" onclick='delMsgIn("+i+")'></th></tr>");
      }
      $("#mail").append("<tr><td><input type='button' name='submit' value='clear all' id=\"button\" onclick='delMsgInAll()'></td></tr>");
  });
  $("#outbox").click(outboxRefresh =function(){
    $("#mail").html("");
    $("#mail").append("<tr id=message><th id=th1>TO</th><th id=th1>DATE</th><th id=th1 colspan=2>MESSAGE</th></tr>");
    var keys=Object.keys(etat.yp[0]);

    for(var i=0;i<etat.outbox.length;i++){
      var name="";
      for(var j=0;j<keys.length;j++){
        if(etat.outbox[i]["to"]==keys[j]){
          name=etat.yp[0][keys[j]]["name"];
        }
      }
      if(name==""){
        name=etat.outbox[i]["to"]
      }
      $("#mail").append("<tr id=message><th>"+name+"</th><th>"+etat.outbox[i]["date"]+"</th><th>"+etat.outbox[i]["msg"]+"</th><th><input type='button' name='submit' value='delete' id=\"button\" onclick='delMsgOut("+i+")'></th></tr>");
      }
      $("#mail").append("<tr><td><input type='button' name='submit' value='clear all' id=\"button\" onclick='delMsgOutAll()'></td></tr>");
  });
  $("#contact").click(contactRefresh=function(){
    $("#mail").html("");
    var keys=Object.keys(etat.yp[0]);
    $("#mail").append("<table id='contactList'><tr id=message><th id=th1>ADDRESSE</th><th id=th1 colspan=2>NOM DE CONTACT</th></tr>");
    for(var i=0;i<keys.length;i++){
      $("#mail").append("<tr id=message"+i+"><th>"+keys[i]+"</th><th>"+etat.yp[0][keys[i]]["name"]+"</th><th><input type='button' name='submit' value='remove' id=\"button\" onclick='removeCont("+i+")'></th></tr>");
      }
      $("#mail").append("</table><br><table id='ajout'><th><input type='button' name='submit' value='add contact' id=\"button\" onclick='ajoutCont()'></th></tr>");
  });
  $("#NewM").click(function(){
    $("#mail").html("<tr id=\"allo1\"><td><form id='form1'>Send to : <input type=\"text\" id=\"ContactName\"></form><br><textarea placeholder=\"Entrez votre message\" rows=\"10\" cols=\"50\" id=\"messageInput\"></textarea><br><input type='button' name='submit' value='send' id=\"button\" onclick='retrieve(\"ContactName\", \"messageInput\")'></td></tr>");
  });
  $("#sig").click(function(){
    $("#mail").html("<table id=\"sign\"><tr><td id=\"coxIns\">Connexion à Go!Mail<td></tr><tr><td id=\"adrr\"><br><form id='form2'><input  type=\"text\" placeholder=\"Adresse courriel\" id=\"AccountName\"></form></td></tr><tr><td id=\"pass\"><form id='form2'><input type=\"text\" placeholder=\"Mot de passe\" id=\"PassWord\"></form></td></tr><tr><td id=\"bu\"><br><input type='button' name='submit' value='Soumettre' id=\"button2\" onclick='retrieve(\"ContactName\", \"messageInput\")'></td></tr></table>");
  });
  $("#sup").click(function(){
    $("#mail").html("<table id=\"siup\"><tr><td id=\"coxIns\">Inscription à Go!Mail<td></tr><tr><td id=\"adrr\"><br><form id='form3'><input type=\"text\" placeholder=\"Nouvelle Adresse courriel\" id=\"AccountName\"></form></td></tr><tr><td id=\"pass\"><form id='form3'><input type=\"text\" placeholder=\"Mot de passe\" id=\"PassWord\"></form></td></tr><tr><td id=\"bu\"><br><input type='button' name='submit' value='Soumettre' id=\"button2\" onclick='retrieve(\"ContactName\", \"messageInput\")'></td></tr></table>");
  });
});
function retrieve(cont,msg) {
  if(document.getElementById(cont).value==""){
    window.alert("Please enter contact information.")
  }
  else{
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
  etat.outbox[etat.outbox.length]={"to":document.getElementById(cont).value,"date":d.getFullYear()+" "+month+" "+day+" "+hour+":"+minute+":"+second,"msg":document.getElementById(msg).value};
  document.getElementById(cont).value="";
  document.getElementById(msg).value="";
}
}
function removeCont(cont){
  var keys=Object.keys(etat.yp[0]);
  delete etat.yp[0][keys[cont]];
  contactRefresh();
}
function ajoutCont(){
  $("#ajout").html("<tr><td><textarea placeholder=\"addresse\" rows=\"1\" cols=\"20\" id=\"addresseAdd\" form=\"usrform\"></textarea></td><td><textarea placeholder=\"Nom du contact\" rows=\"1\" cols=\"20\" id=\"nameAdd\" form=\"usrform\"></textarea></td></tr><tr><td></td><td><input type='button' name='submit' value='add' id=\"button\" onclick='addCont(\"addresseAdd\",\"nameAdd\")'>    <input type='button' name='submit' value='cancel' id=\"button\" onclick='returnNorm()'></td></tr>");
}
function returnNorm(){
  $("#ajout").html("<th><input type='button' name='submit' value='add contact' id=\"addCont\" onclick='ajoutCont()'></th>")
}
function addCont(addr, name){
  etat.yp[0][document.getElementById(addr).value]={"name": document.getElementById(name).value};
  contactRefresh();
}
function delMsgIn(num){
  etat.inbox.splice(num,1);
  inboxRefresh();
}
function delMsgInAll(){
  etat.inbox.splice(0,etat.inbox.length);
  inboxRefresh();
}
function delMsgOut(num){
  etat.outbox.splice(num,1);
  outboxRefresh();
}
function delMsgOutAll(){
  etat.outbox.splice(0,etat.outbox.length);
  outboxRefresh();
}
var etat = {
  "inbox": [
    {
      "from": "AF22111212232211122",
      "date": "2015 12 28 20:15:42",
      "msg": "Un court message ...." },
    {
      "from": "AF22111212232211122",
      "date": "2016 01 03 10:15:31",
      "msg": "Un autre message ...." } ],
  "outbox": [
    {
      "to": "AF22111212232211122",
      "date": "2016 01 12 20:15:42",
      "msg": "Bla bla bla ...." } ],
  "yp": [
    {
    "AF22111212232211122": {"name": "Jean Fanchon"},
    "90221F212A4200001AA": {"name": "Bob"}
    } ]
}
