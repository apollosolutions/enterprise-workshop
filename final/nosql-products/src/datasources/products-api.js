const { MongoDataSource } = require("apollo-datasource-mongodb");

// @WORKSHOP: Document this in the story
class ProductsAPI extends MongoDataSource {
  constructor({ collection, cache, contextValue }) {
    super(collection);
    // Mongodb datasource requires the context, which is done differently 
    // in Apollo v4, so we need to reinitialize with the 
    // request context and cache
    // Need to find a better migration as this as this is becoming circular reference
    super.initialize({
      context: contextValue,
      cache
    });
  }

  categoriesMatch = {
    CLOTHING: "clothing",
    TOPS: "tops",
    BOTTOMS: "bottoms",
    COLLECTIONS: "collections",
    WOMEN: "women", 
    MEN: "men",
    HOODIES: "hoodies & sweatshirts",
    SHORTS: "shorts",
    PERFORMANCE: "performance fabrics",
    UNDERWEAR: "bras & tanks",
    ECO: "eco friendly",
    PROMOTIONS: "promotions",
    PANTS: "pants",
    RECOMMENDATIONS: "erin recommends",
    TEES: "tees",
    YOGA: "new luma yoga collection"
  }

  async getProduct({id, sku}) {
    const params = {type: "variable"};

    if (id) {
      params.id = id;
      const products = await this.findByFields({
        type: "variable",
        id: id
      });

      return products && products[0] ? products[0] : null;
    }

    if (sku) {
      params.sku = sku;

      const products = await this.findByFields({
        type: "variable",
        sku: sku
      });

      return products && products[0] ? products[0] : null;
    }
    return null;

  }

  async getVariant(variantId) {
    const variations = await this.findByFields({
      id: variantId,
      type: "variation"
    });

    return variations && variations[0] ? variations[0] : null;
  }

  async getProductVariants(parentSku) {
    const variations = await this.findByFields({
      type: "variation",
      parent: parentSku
    });

    return variations && variations[0] ? variations : null;
  }

  async searchProducts(titleContains, categories = [], limit = 15, featured) {
    // Query by search text
    const query = { type: "variable" };

    if (titleContains) {
      query.$text = { $search: titleContains };
    }

    if (featured === true) {
      query.featured = "1";
    }

    if (categories && categories.length > 0) {
      query.categories = {
        // Mongodb array matching is case-sensitive
        // To make it easier for front-end teams, we lowercase inputs automatically
        $all: categories.map(category => this.categoriesMatch[category])
      }
    }

    // Include only the `title` and `score` fields in each returned document
    const projection = {
      _id: 0,
      id: 1,
      name: 1,
      regular_price: 1,
      in_stock: 1,
      images: 1,
      featured: 1,
      attribute_1_values: 1,
      attribute_2_values: 1,
      attribute_1_name: 1,
      attribute_2_name: 1,
      sku: 1,
      description: 1,
      short_description: 1
    };

    const cursor = this.collection
      .find(query)
      .project(projection)
      .limit(limit);

    if (titleContains) {
      // Sort by relevance
      const sort = { score: { $meta: "textScore" } };
      cursor.sort(sort);
    }

    return await cursor.toArray();
  }

  async searchVariants(sizeStartsWith) {
    // Query by search text
    const query = {
      type: "variation",
      attribute_1_name: "Size",
      $text: { 
        $search: sizeStartsWith
      }
    };

    // Sort by relevance
    const sort = { score: { $meta: "textScore" } };

    const projection = {
      _id: 0,
      id: 1,
      name: 1,
      regular_price: 1,
      in_stock: 1,
      images: 1,
      attribute_1_values: 1,
      attribute_2_values: 1
    };

    const cursor = this.collection
      .find(query)
      .sort(sort)
      .project(projection)
      .limit(15);

    return await cursor.toArray();
  }
}

module.exports = ProductsAPI;
