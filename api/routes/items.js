const db = require('../sqlHandler')
const cors = require('cors')

module.exports = function (app) {

    app.get('/items', cors(), (req, res) => {        
        const {pageSize, page} = req.query;        
        const parameters = [
            { name: 'pageSize', value: pageSize },
            { name: 'page', value: page },
        ];
        db.callProcedure('items_getList', parameters, (data) => { res.send(data) });
    })

    app.get('/items/:id', cors(), (req, res) => {
        const parameters = [
            { name: 'id', value: req.params.id },
        ];
        db.callProcedure('items_getDetails', parameters, (data) => { res.send(data) });
    })
}