import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Channel {
  id: ID!
  name: String
}

type Categories {
  name: String!
  path: String!
}

type Posts {
  id: ID!
  timestamp: Float!
  title: String!
  body: String
  author: String!
  category: String!
  voteScore: Int
  deleted: Boolean
  commentCount: Int
}

type Query {
  channels: [Channel]
  categories: [Categories]
  posts: [Posts]
  postByCategory(category: String!): [Posts]
  singlePost(id: ID!): [Posts]
}

type Mutation {
  addChannel(name: String!): Channel
  addCategory(name: String!, path: String!): Categories
  addPost(
    timestamp: String
    title: String!
    body: String
    author: String
    category: String
  ): Posts
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
