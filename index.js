/** Utilizaremos commander.js para leer datos del comando */
const expenses = require('./datos.json');
const fs = require('node:fs');

function addExpense(description, amount) {
    if (parseInt(amount) < 0) {
        return `Amount cannot be negative`
    }
    // Generar un ID único
    const newId = expenses.length > 0 ? expenses[expenses.length - 1].ID + 1 : 1;

    // Crear nuevo gasto
    const newExpense = {
        ID: newId,
        Date: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
        Description: description,
        Amount: parseInt(amount)
    };

    expenses.push(newExpense);

    // Guardar el json 
    fs.writeFileSync('./datos.json',JSON.stringify(expenses,null,2)); // <-- JSON.stringify(value, replacer, space)
    
    return `# Expense added successfully (ID: ${newExpense.ID})`

}

function summaryExpenses() {
    if(expenses.length === 0) {
         return 'There are still no expenses'
    }
    const expensesSummary = expenses.reduce(
        (acc,item) => acc + item.Amount,
        0
    );
    return `# Total expenses: $${parseInt(expensesSummary)}`
};

function summaryExpensesByMonth(month) {
    if (expenses.length === 0) {
        return 'There are still no expenses';
    }

    // Filtrar los gastos del mes indicado
    const filteredExpenses = expenses.filter(expense => {
        const expenseMonth = new Date(expense.Date).getMonth() + 1; // getMonth() devuelve 0-11
        return expenseMonth === month;
    });

    // Calcular el total gastado en ese mes
    const total = filteredExpenses.reduce((acc, item) => acc + item.Amount, 0);

    return total > 0
        ? `# Total expenses for month ${month}: $${total}`
        : `No expenses found for month ${month}`;
}

function deleteExpenseWithId(id) {
    const expense = expenses.find((expense) => parseInt(expense.ID) === parseInt(id));

    if(!expense) return `Expense not found`;
    // Actualizar el json, debo hacer un nuevo array 
    const newExpenses = expenses.filter((expense) => parseInt(expense.ID) !== parseInt(id)); // Me quedo con los que no coinciden para eliminarlo

    fs.writeFileSync('./datos.json',JSON.stringify(newExpenses,null,2));
    return `# Expense deleted successfully`
}
function listExpenses() {
    //Padend para que use siempre una cantidad predeterminada de columnas
    const head = `# ${'ID'.padEnd(4)} ${'Date'.padEnd(15)} ${'Description'.padEnd(15)} ${'Amount'}`;

    if (expenses.length === 0) {
        return 'There are still no expenses'
    }
    const rows = expenses.map((expense) => (
        `\n # ${String(expense.ID).padEnd(4)} ${expense.Date.padEnd(15)} ${expense.Description.padEnd(15)} ${expense.Amount}`
    ));

    return head + rows
}


module.exports = {
    addExpense,
    summaryExpenses,
    summaryExpensesByMonth,
    deleteExpenseWithId,
    listExpenses
}