const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList
} = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    categories: { type: GraphQLString },
    isAvailable: { type: GraphQLBoolean },
    sold: { type: GraphQLBoolean },
    rented: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    rentType: { type: GraphQLString },
    sellPrice: { type: GraphQLInt },
    rentPrice: { type: GraphQLInt },
    datePosted: { type: GraphQLString },
    createdBy: { type: GraphQLInt },
  }),
});

module.exports = ProductType;