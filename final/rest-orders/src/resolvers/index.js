const resolvers = {
  Query: {
    // Returns the order
    order: (_, { id }, { dataSources }) => dataSources.ordersAPI.getOrder(id)
  },
  // @WORKSHOP: Add story here about resolving by references
  Order: {
    __resolveReference: (order, { dataSources }) => dataSources.ordersAPI.getOrder(order.id),
    buyer: root => ({ id: root.customerId }),
    items: root => root.variantIds.map(variantId => ({id: variantId}))
  }
};

module.exports = resolvers;
