$(document).ready(function(){
    $("#insc").click(function(){
      $("#form1").html("<form id=\"form2\" action =\"register\" method=\"post\" enctype=\"multipart/form-data\"><legend id=\"formStyle\"><label for=\"email\"></label><input  type=\"text\" name=\"email\" placeholder=\"Adresse courriel\" id=\"AccountName\" size=\"45\"></form><br><label for=\"pswd\"></label><input type=\"PassWord\" name = \"pswd\" class=\"masked\" placeholder=\"Mot de passe\" id=\"PassWord\" autocomplete=\"off\" size=\"45\"><div id=\"insc\">Inscription</div><br><input type=\"submit\"  value=\"Créer\" id=\"button2\"></legend></form>");
    });
});

function loadpage(){
  
}
//window.history.forward();

function NewCompte(){
    $("#form1").html("<form id=\"form2\" action =\"login\" method=\"post\" enctype=\"multipart/form-data\"><legend id=\"formStyle\"><label for=\"email\"></label><input  type=\"text\" name=\"email\" placeholder=\"Adresse courriel\" id=\"AccountName\" size=\"45\"></form><br><label for=\"pswd\"></label><input type=\"PassWord\" name = \"pswd\" class=\"masked\" placeholder=\"Mot de passe\" id=\"PassWord\" autocomplete=\"off\" size=\"45\"><div id=\"insc\">Inscription</div><br><input type=\"submit\"  value=\"Soumettre\" id=\"button2\"></legend></form>");
}