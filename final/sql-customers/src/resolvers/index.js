const { Query } = require("./Query");

const resolvers = {
  Query,
  User: {
    __resolveReference: async (reference, { dataSources }) => {
      return dataSources.customerDB.getCustomer(reference.id);
    },
    id: (root) => root.customer_id,
    activeCart: (root) => {
      const cart = {
        owner: root
      }

      if (root.active_cart) {
        cart.items = root.active_cart.split(",").map(id => ({id}))
      }

      return cart;
    },
    firstName: (root) => root.first_name,
    lastName: (root) => root.last_name,
    orders: (root) => {
      if (root.orders) {
        const orders = root.orders.split(",");
        return orders.map(orderId => ({ id: orderId }));
      }
      return [];
    }
  },
  Cart: {
    subtotal: (root) => {
      if (root.items && root.items.length > 0) {
        const orders = root.items;
        return orders.reduce(
          (accumulator, currentItem) => accumulator + currentItem.price,
          0
        );
      }
      return 0;
    }
  }
};

module.exports = resolvers;
