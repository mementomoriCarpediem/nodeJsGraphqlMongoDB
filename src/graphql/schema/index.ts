import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchingDirectives } from '@graphql-tools/stitching-directives';
import { resolvers } from '../../resolvers';
const { allStitchingDirectivesTypeDefs, stitchingDirectivesValidator } =
  stitchingDirectives();

const typeDefs = `
  ${allStitchingDirectivesTypeDefs}

  type Query {
    getExchangeRate(src: String!, tgt: String!): ExchangeInfo
  }

  type Mutation {
    postExchangeRate(info: InputUpdateExchangeInfo): ExchangeInfo
    deleteExchangeRate(info: InputDeleteExchangeInfo): ExchangeInfo
  }

  input InputUpdateExchangeInfo {
    src: String!
    tgt: String!
    rate: Float!
    date: String
  }

  input InputDeleteExchangeInfo {
    src: String!
    tgt: String!
    date: String!
  }

  type ExchangeInfo @key(selectionSet:"{src, tgt, date}") {
    src: String!
    tgt: String!
    rate: Float!
    date: String!
  }
`;

const schemaArg = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default stitchingDirectivesValidator(schemaArg);
