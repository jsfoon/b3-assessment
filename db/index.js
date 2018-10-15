const Sequelize = require("sequelize");
const { database, username, password, host } = require('../config');

const db = new Sequelize(
    database,
    username,
    password, 
    {
        host,
        dialect:"mysql",
        pool:{
            max: 5,
            min: 0,
            idle:10000
        },
        force:false
    });

const Grocery = require('../model/grocery')(db);

db.sync()
    .then(function () {
        console.log("DB in sync")
    });

module.exports = {
    Grocery
};

