$(document).ready(function(){
  $("#inbox").click(function(){
    location.href = "/inbox";
});
  $("#outbox").click(outboxRefresh =function(){
    location.href = "/outbox";
 });
  $("#contact").click(contactRefresh=function(){
    location.href = "/contact";
    });

  $("#NewM").click(function(){
    window.location.href = "/nouveauM";
  });

  $("#dec").click(function(){
    var x;
    if (confirm("Êtes-vous certain de vouloir vous déconnecter?")== true) {
      window.location.href = "/loggedout"
    }
  });
});


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
/*function cancelRefresh(){
$(window).unload(function() {
      alert('Handler for .unload() called.');
});
}
*/
var etat = {

  "User": [
    {
      "Username":""} ],
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
window.history.forward();
