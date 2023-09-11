const { Query } = require("./Query");

const reviews = [
  {
    id: 1,
    body: "This was a great find! would highly recommend.",
    product: {
      id: "1",
    },
    user: {
      id: "1",
    },  
  },
  {
    id: 2,
    body: "Awesome t-shirt. I really like the material",
    product: {
     id: "2",
    },
    user: {
      id: "2",
    }, 
  },
  {
    id: 3,
    body: "Smooth! Look no further, this will answer all your questions!",
    product: {
     id: "3",
    },
    user: {
      id: "1",
    }, 
  },
  {
    id: 4,
    body: "So glad I found this product. Hidden gem!",
    product: {
      id: "4",
    },
    user: {
      id: "1",
    }, 
  },
];
   

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
  Subscription: {
    reviewAdded: {
      subscribe: async function* () {
        let count = 0;
        while (true) {
          const review = reviews[count++];
          yield { reviewAdded: review };
          await new Promise((resolve) => setTimeout(resolve, 3000));
          if (count === reviews.length) count = 0;
        }
      },
    },
  }
};

module.exports = resolvers;
