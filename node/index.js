const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);
const insertName = 'INSERT INTO people(name) values("Paulo Braga")';
const createTable = 'CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))';
connection.query(createTable);
connection.query(insertName);

app.get('/', (req, res) => {
  const selectPeoples = `SELECT * FROM people`;
  connection.query(selectPeoples , function (err, result){
    if(err) throw err;
    const html = `<h1>Full Cycle Rocks!</h1>\n
    <ul>
      ${result.map(character => `<li>${character.name}</li>`).join('')}
    </ul>`
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Server rodando http://localhost:${port}`);
});