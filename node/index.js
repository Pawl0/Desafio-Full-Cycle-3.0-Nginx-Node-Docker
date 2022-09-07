const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const makeHtmlContent = (names) => `<p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>
<p>
    ${names.map(name => `<p>- ${name}</p>`).join('')}
</p>`

app.get('/', (req, res) => {
    const tableName = 'people'
    const sqlCreate = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY(id)
    );`
    const sqlInsert = `INSERT INTO ${tableName}(name) values('Wesley')`
    const sqlSelectNames = `SELECT name FROM ${tableName}`

    const connection = mysql.createConnection(config)
    connection.query(sqlCreate)
    connection.query(sqlInsert)
    connection.query(sqlSelectNames, (_, result) => {
        const names = Array.from(result).map(item => item.name)
        const content = makeHtmlContent(names)
        res.send(content)
    })
    connection.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})