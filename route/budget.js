const express = require('express');
const budget = express.Router();

module.exports = budget;

const budgets = {};

budget.param('name', (req, res, next, nameId) => {
    const name = nameId.toLowerCase();
    if (!budgets[name]) {
        return res.status(404).send();
    }
    this.name = name;
    next();
})
budget.post('/', (req, res, next) => {
    const name = req.query.name.toLowerCase();
    const budget = req.query.budget;
    if (name && budget) {
        budgets[name] = {'budget': Number(budget)};
        res.status(201).send(budgets[name]);
    } else {
        res.status(400).send();
    }
})
budget.get('/', (req, res, next) => {
    res.send(budgets);
})
budget.get('/:name', (req, res, next) => {
    res.send(budgets[this.name]);
})
budget.put('/:name', (req, res, next) => {
    const budget = req.query.budget;
    budgets[this.name].budget = Number(budget);
    res.send(budgets[this.name]);
})
budget.delete('/:name', (req, res, next) => {
    delete budgets[this.name];
    res.status(204).send();
})


