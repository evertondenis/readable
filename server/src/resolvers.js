import uuidv4 from 'uuid/v4'

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

const comments = [
  {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
]

export const resolvers = {
  Query: {
    categories: () => categories,
    posts: () => posts.filter(post => !post.deleted),
    singlePost: (root, { id }) => posts.filter(post => post.id === id),
    comments: (root, { parentId }) => comments.filter(comment => comment.parentId === parentId),
    postByCategory: (root, { category }) => posts.filter(post => post.category === category)
  },
  Mutation: {
    addCategory: (root, args) => {
      const newCategories = { name: args.name, path: args.path };
      categories.push(newCategories);
      return newCategories;
    },
    addPost: (root, args) => {
      const newPost = {
        id: uuidv4(),
        timestamp: args.timestamp,
        title: args.title,
        body: args.body,
        author: args.author,
        category: args.category,
        voteScore: 0,
        deleted: false,
        commentCount: 0
      };
      posts.push(newPost)
      return newPost;
    },
    votePost: (root, args) => {
      const { id, type } = args
      posts.map(post => {
        return post.id === id
          ? type === 'upVote' ? post.voteScore++ : post.voteScore !== 0 ? post.voteScore-- : 0
          : post.voteScore
      })
      return posts
    },
    deletePost: (root, args) => {
      const indexPost = posts.map(post => post.id).indexOf(args.id)
      posts.splice(indexPost, 1)
      return posts
    },
    addComment: (root, args) => {
      const newComment = {
        id: uuidv4(),
        parentId: args.parentId,
        timestamp: args.timestamp,
        body: args.body,
        author: args.author,
        voteScore: 0,
        deleted: false
      };
      comments.push(newComment)
      updateTotalComments(args.parentId)

      return newComment;
    },
    deleteComment: (root, args) => {
      const indexComment = comments.map(comment => comment.id).indexOf(args.id)
      comments.splice(indexComment, 1)
      updateTotalComments(args.parentId)

      return comments
    },
  },
};


const updateTotalComments = parentId => {
  const indexPost = posts.map(post => post.id).indexOf(parentId)
  const totalComments = comments.filter(comment => comment.parentId ===  parentId)
  return posts[indexPost].commentCount = totalComments.length
}