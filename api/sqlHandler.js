const settings = require('./settings');
const mysql = require('mysql');

module.exports = {
    callProcedure(procedureName, parameters, onSuccess) {

        const connection = mysql.createConnection(settings.sqlConnection);

        const paramInputStr = parameters.map(p => `?`).join();
        const sql = `call ${procedureName}(${paramInputStr})`

        const values = parameters.map(p => p.value);

        connection.query(sql, values, (err, data) => {
            if (err) throw err;

            if (onSuccess) {
                onSuccess(data)
            }
        });

        connection.end();
    }
}