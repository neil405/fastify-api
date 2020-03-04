// Import our Controllers
const customerController = require('../controllers/customerController');
//const customerImportController = require('../controllers/customerImportController');

const routes = [
    {
        method: 'GET',
        url: '/api/customers',
        handler: customerController.getCustomers,
    },
    {
        method: 'GET',
        url: '/api/customers/:id',
        handler: customerController.getSingleCustomer
    },
    {
        method: 'POST',
        url: '/api/customers',
        handler: customerController.addCustomer,
        //schema: documentation.addCustomerSchema
    },
    {
        method: 'PUT',
        url: '/api/customers/:id',
        handler: customerController.updateCustomer
    },
    {
        method: 'DELETE',
        url: '/api/customers/:id',
        handler: customerController.deleteCustomer
    },
    {
      method: 'GET',
      url: '/api/customers/import',
      handler: customerController.importCustomerCsvToDb
    }
];

module.exports = routes;