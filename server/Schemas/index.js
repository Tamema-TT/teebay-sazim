const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
let productData = require("../data/products.json");
let userData = require("../data/users.json");

const ProductType = require("./TypesDef/ProductType");
const UserType = require("./TypesDef/UserType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return productData;
      },
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
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
        createdBy: { type: GraphQLInt }
      },
      resolve(parent, args) {
        productData.push({
          id: productData.length + 1,
          title: args.title,
          categories: args.categories,
          isAvailable: args.isAvailable,
          sold: args.sold,
          rented: args.rented,
          description: args.description,
          rentType: args.rentType,
          sellPrice: args.sellPrice,
          rentPrice: args.rentPrice,
          datePosted: args.datePosted,
          createdBy: args.createdBy,
        });
        return args;
      },
    },

    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        const id = args.id;
        productData = productData.filter(product => product.id !== parseInt(id));
        return {successful: true, message: "Deleted"};
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });