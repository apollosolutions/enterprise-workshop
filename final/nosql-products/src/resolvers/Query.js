module.exports = {
  Query: {
    // Returns the product
    product(_, { id }, { dataSources }) {
      return dataSources.productsAPI.getProduct({id});
    },
    productVariant(_, { id }, { dataSources }) {
      return dataSources.productsAPI.getVariant(id);
    },
    getFeaturedProducts(_, { limit = 10 }, { dataSources }) {
      return dataSources.productsAPI.searchProducts(null, null, limit, true);
    },
    getProductsByCategory(_, { category, limit = 10 }, { dataSources }) {
      return dataSources.productsAPI.searchProducts(null, [category], limit);
    },
    // Searches the product database
    searchProducts(_, { searchInput }, { dataSources }) {
      const { titleContains, categories, limit, featured } = searchInput;
      return dataSources.productsAPI.searchProducts(titleContains, categories, limit, featured);
    },
    searchProductVariants(_, { searchInput }, { dataSources }) {
      const { sizeStartsWith } = searchInput;
      return dataSources.productsAPI.searchVariants(sizeStartsWith);
    }
  }
};
