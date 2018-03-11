import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
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

type Comments {
  id: ID!
  parentId: String!
  timestamp: Float!
  body: String
  author: String!
  voteScore: Int
  deleted: Boolean
  parentDeleted: Boolean
}

type Query {
  categories: [Categories]
  posts: [Posts]
  postByCategory(category: String!): [Posts]
  singlePost(id: ID!): [Posts]
  comments(parentId: String!): [Comments]
}

type Mutation {
  addCategory(name: String!, path: String!): Categories
  addPost(
    timestamp: String
    title: String!
    body: String
    author: String
    category: String
  ): Posts
  deletePost(id: ID!): [Posts]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
