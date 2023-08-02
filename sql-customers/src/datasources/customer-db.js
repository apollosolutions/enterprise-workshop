const { SQLDataSource } = require("datasource-sql");

class CustomerDB extends SQLDataSource {
  constructor({ config, cache, contextValue }) {
    super(config);
    super.initialize({
      context: contextValue,
      cache
    });
  }

  async getCustomers() {
    const customer = await this.knex.select('*').from('customers');
    return customer;
  };

  async getCustomer(id) {
    const customers = await this.knex.select('*').from('customers').where('customer_id', id);
    return customers.length > 0 ? customers[0] : null;
  }
}

module.exports = CustomerDB;
