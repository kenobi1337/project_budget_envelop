const express = require('express');
const budget = express.Router();
const bodyParser = require('body-parser');

module.exports = budget;

const budgets = [];



budget.get('/', (req, res, next) => {
    res.send(budgets);
})
budget.get('/:id', (req, res, next) => {
    let index = Number(req.params.id);
    if (index <= budgets.length) {
        index--;
        const specific = budgets[index];
        res.send(specific);
    } else {
        res.status(404).send();
    }
})
budget.post('/', (req, res, next) => {
    const toAdd = req.body;
    let length = budgets.length;
    length+=1;
    toAdd["id"] = length;
    if (toAdd.name && toAdd.total) {
        budgets.push(toAdd);
        res.status(201).send(budgets[budgets.length-1]);
    } else {
        res.status(400).send();
    }
})
budget.delete('/:id', (req, res, next) => {
    let index = req.params.id;
    if (index <= budgets.length) {
        index--;
        budgets.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})
budget.put('/:id', (req, res, next) => {
    let index = req.params.id;
    if (index <= budgets.length) {
        index--;
        let ID = Number(index);
        ID++;
        req.body["id"] = ID;
        budgets[index] = req.body;
        res.send(budgets[index]);
    } else {
        res.status(404).send();
    }
})
budget.post('/transfer/:from/:to', (req, res, next) => {
    const from = req.params.from;
    const to = req.params.to;
    const sendFrom = budgets.findIndex(e => {
        return e["name"] == from;
    })
    const receive = budgets.findIndex(e => {
        return e["name"] == to;
    })
    if (sendFrom !== -1 && receive !== -1) {
        budgets[sendFrom]["total"]-=Number(req.query.amount);
        budgets[receive]["total"]+=Number(req.query.amount);
        res.send(201).send([budgets[sendFrom], budgets[receive]]);
    } else {
        res.status(404).send();
    }
})


