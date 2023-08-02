const { Query } = require("./Query");

const resolvers = {
  Query,
  Product: {
    __resolveReference: async (reference, { dataSources }) => {
      if (reference.id) {
        return await dataSources.productsAPI.getProduct({ id: reference.id });
      }

      if (reference.sku) {
        return await dataSources.productsAPI.getProduct({ sku: reference.sku });
      }
    },
    price: (root) => root.regular_price,
    description: (root) => root.description,
    attributes: (root) => {
      return [
        {
          name: root.attribute_1_name,
          values: root.attribute_1_values
        },
        {
          name: root.attribute_2_name,
          values: root.attribute_2_values
        },
      ]
    },
    variants: async (root, __, { dataSources }) => {
      const variants = await dataSources.productsAPI.getProductVariants(root.sku);
      // Attach the root to the variant
      return variants.map(variant => ({ ...variant, root }));
    },
    featured: (root) => {
      return root.featured === "1"
    },
    shortDescription: (root) => root.short_description
  },
  ProductVariant: {
    __resolveReference: async (reference, { dataSources }) => {
      const variant = await dataSources.productsAPI.getVariant(reference.id);
      return variant;
    },
    colorway: (root) => root.attribute_2_values[0],
    size: (root) => root.attribute_1_values[0],
    price: (root) => root.regular_price,
    parent: async (root, __, { dataSources }) => {
      return await dataSources.productsAPI.getProduct({sku: root.parent });
    },
    inStock: (root) => (root.in_stock === "1")
  }
};

module.exports = resolvers;
