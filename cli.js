/** Commander para leer cosas */
const { program } = require('commander');
const { listExpenses, addExpense, summaryExpenses, deleteExpenseWithId, summaryExpensesByMonth } = require('./index');
/**
 * $ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)

$ expense-tracker add --description "Dinner" --amount 10
# Expense added successfully (ID: 2)

$ expense-tracker list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10

$ expense-tracker summary
# Total expenses: $30

$ expense-tracker delete --id 2
# Expense deleted successfully

$ expense-tracker summary
# Total expenses: $20

$ expense-tracker summary --month 8
# Total expenses for August: $20
 */

program.name('expense-tracker').description('CLI para manejar gastos')
/** Comando para agregar un gasto */
program
    .command('add')
    .description('Agregar un gasto')
    .requiredOption('--description <desc>', 'Descripción del gasto')
    .requiredOption('--amount <amount>', 'Monto del gasto')
    .action((options) => {
        // Llamo a mi funcion para pasarle las options
        console.log(addExpense(options.description, options.amount));
    });

/** Comando para listar los gastos */
program
    .command('list')
    .description('Listar gastos')
    .action(() => {
        console.log(listExpenses());
    })

/** Comando para sumar los gastos */
program
  .command('summary')
  .description('Suma de gastos totales o por mes')
  .option('--month <month>', 'Mes para sumar gastos') // Hacer el mes opcional
  .action((options) => {
      if (options.month) {
          console.log(summaryExpensesByMonth(parseInt(options.month))); // Convertir a número
      } else {
          console.log(summaryExpenses()); // Si no se pasa mes, sumar todos los gastos
      }
  });


/** Comando para borrar un gasto por id */
program
    .command('delete')
    .description('Borrar un gasto')
    .requiredOption('--id <id>', 'Id del gasto')
    .action((options) => {
        console.log(deleteExpenseWithId(options.id))
    });





program.parse(process.argv);  // <- No olvidar esta linea asi lee los archivos el cli
