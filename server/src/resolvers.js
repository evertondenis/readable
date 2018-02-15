const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];

const categories = [
  {
    name: 'react',
    path: 'react'
  },
  {
    name: 'redux',
    path: 'redux'
  },
  {
    name: 'udacity',
    path: 'udacity'
  }
]

const posts = [
  {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
]

let nextId = 3;

export const resolvers = {
  Query: {
    channels: () => channels,
    categories: () => categories,
    posts: () => posts.filter(post => !post.deleted),
    postByCategory: (root, { category }) => posts.filter(post => post.category === category)
  },
  Mutation: {
    postById: (root, { id }) => posts.filter(post => post.id === id),
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addCategory: (root, args) => {
      const newCategories = { name: args.name, path: args.path };
      categories.push(newCategories);
      return newCategories;
    },
    addPost: (root, args) => {
      const newPost = {
        id: nextId++,
        timestamp: args.timestamp,
        title: args.title,
        body: args.body,
        author: args.author,
        category: args.category,
        voteScore: 1,
        deleted: false,
        commentCount: 0
      };
      posts.push(newPost)
      return newPost;
    }
  },
};
