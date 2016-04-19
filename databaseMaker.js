exports.test = function(SQL, assert) {
	var fs = require('fs');
	var path = require('path');

	var db = new SQL.Database();


	//Works

	var stmt = "CREATE TABLE LOGIN (USERNAME string, PASSWORD string);";
	stmt+="CREATE TABLE MESSAGES (SENTTO string, SENTFROM string, DATE string, CONTENT string);";
	stmt+="CREATE TABLE CONTACTS (USERNAME string, NOM string, NICKNAME string);";

	db.run(stmt);
	var data = db.export();
	var buffer = new Buffer(data);
	var filebuffer = fs.writeFileSync('users.sqlite', buffer);

	var res = db.exec("SELECT * FROM LOGIN;");

	console.log(res);

	db.close();
}

if (module == require.main) {
	var sql = require('sql.js');
	var assert = require("assert");
	exports.test(sql, assert);
}
