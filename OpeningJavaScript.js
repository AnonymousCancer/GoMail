//$("#button2").click(function(loadpage));
$(document).ready(function(){
    $("#insc").click(function(){
      $("#Connexion").html("<tr><td id=\"coxIns\">Inscription à Go!Mail<td></tr><tr><td id=\"adrr\"><br><form id=\"form2\"><input  type=\"text\" placeholder=\"Adresse courriel\" id=\"AccountName\" size=\"45\"></form></td></tr><tr><td id=\"pass\"><input type=\"PassWord\" class=\"masked\" placeholder=\"Mot de passe\" id=\"PassWord\" autocomplete=\"off\" size=\"45\"></td></tr><tr><td id=\"bu\"><br><input type=\"submit\" onclick= \"NewCompte()\" value=\"Créer\" id=\"button2\"></form></td></tr>");
    });
});

function loadpage(){
  window.location.href = "//Fichiersetu/etudiants/mouf04/My%20Documents/Atom/GoMail-master/Courriel.html"
}
//window.history.forward();

function NewCompte(){
    $("#Connexion").html("<tr><td id=\"coxIns\">Connexion à Go!Mail<td></tr><tr><td id=\"adrr\"><br><form id=\"form2\"><input  type=\"text\" placeholder=\"Adresse courriel\" id=\"AccountName\" size=\"45\"></form></td></tr><tr><td id=\"pass\"><input type=\"PassWord\" class=\"masked\" placeholder=\"Mot de passe\" id=\"PassWord\" autocomplete=\"off\" size=\"45\"></td></tr><tr><td id=\"bu\"><div id=\"insc\">Inscription</div><br><input type=\"submit\" onclick= \"loadpage()\" value=\"Soumettre\" id=\"button2\"></form></td></tr>");
}
