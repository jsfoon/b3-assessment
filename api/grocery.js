const { Grocery } = require("../db");
const { Op } = require('Sequelize');

const list = (req,res) => {
    let { page, items, sortBy, searchType, keyword } = req.query;
    let whereCondition = {};
    page = parseInt(page) || 1;
    items = parseInt(items) || 20;
    sortBy = sortBy || 'ASC';
    let offset = (page - 1) * items;
    let limit = items;
    let brand = '';
    let name = '';
    let order = ['name', sortBy];

    if((typeof searchType !== 'undefined')) {
        if(typeof searchType === 'string'){
            if(searchType=='Brand') {
                brand = keyword;
                order = ['brand', sortBy];
            }
            if(searchType=='Name') {
                name = keyword;
            }
        } else {
            brand = keyword;
            name = keyword;
        }
    }
    order = order.filter(d => d !== 'ASC');

    if(brand && name) {
        whereCondition = {
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                },
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            order: [order],
            offset: offset,
            limit: limit
        }
    } else {
        if(brand) {
            whereCondition = {
                where: {
                    brand: {
                       [Op.like]: `%${brand}%`
                    }
                },
                order: [order],
                offset: offset,
                limit: limit
            }
        }
        else if(name) {
            whereCondition = {
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: [order],
                offset: offset,
                limit: limit
            }
        }
        else {
            whereCondition = {
                order: [order],
                offset: offset,
                limit: limit
            }
        }
    } 

    Grocery
        .findAndCountAll(whereCondition)
        .then(function (result) {
            if (result) {
                console.log(result);
                res.json(result);
            } else {
                res.status(400).send(JSON.stringify("Record Not Found"));
            }
        });
};

const show = (req,res) => {
    Grocery
        .findOne({
            where: {
                id: Number(req.params.productId)
            }
        })
        .then(function(result){
            if (result) {
                console.log(result);
                res.json(result);
            } else {
                res.status(400).send(JSON.stringify("Record Not Found"));
            }
        });
};

const update = (req,res) => {
    Grocery
        .find({
            where: {
                id: Number(req.params.productId)
            }
        })
        .then(function(result){
            result.updateAttributes({
                upc12: req.body.upc12,
                brand: req.body.brand,
                name: req.body.name
            }).then(function (){
                console.log("update done");
                res.status(200).end();
            }).catch(function (){
                console.log("update failed",req.body);
                res
                    .status(500)
                    .json({error: true, errorText: "Update Failed"})
            });
        })
        .catch(function(err){
            console.log("err", err);
            res
                .status(500)
                .json({error: true, errorText: "Record not found"})
        });

};

const remove = (req,res) => {
    Grocery
        .destroy({
            where: {
                id: req.params.productId
            }

        })
        .then(function(result) {
            console.log("deleted");
            res
                .status(200)
                .json(result)
        })
        .catch(function(err){
            console.log("err", err);
            res
                .status(500)
                .json({error: true})
        })

};


module.exports = {
    list,
    show,
    update,
    remove
}