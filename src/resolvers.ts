import { faker } from "@faker-js/faker"

export default {
  Video: {
    stats: async ({ id }: { id: string }, _args: null, _ctx: null) => {
      return {
        likes: faker.random.numeric(3),
        dislikes: faker.random.numeric(3),
        views: faker.random.numeric(5),
      }
    },
    account: async (
      { accountId }: { accountId: number },
      _args: null,
      _ctx: null
    ) => {
      return {
        id: accountId,
        displayName: faker.name.findName(),
        channelUrl: faker.internet.url(),
        picture: faker.internet.avatar(),
        subscribers: faker.random.numeric(3),
      }
    },
    comments: async (
      { id }: { id: string },
      { limit }: { limit: number },
      _ctx: null
    ) => {
      return [...Array(limit).keys()].map(() => ({
        id: faker.random.numeric(3),
        authorId: faker.random.numeric(2),
        text: faker.lorem.sentence(10),
        publishedAt: faker.date.past(),
      }))
    },
    next: async (
      { id }: { id: string },
      { limit }: { limit: number },
      _ctx: null
    ) => {
      return [...Array(limit).keys()].map(() => ({
        id: faker.datatype.uuid(),
        thumbnail: faker.image.imageUrl(),
        accountId: faker.random.numeric(2),
        videoUri: faker.image.imageUrl(),
        title: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        publishedAt: faker.date.past(),
      }))
    },
  },

  Comment: {
    author: async (
      { authorId }: { authorId: number },
      _args: null,
      _ctx: null
    ) => {
      return {
        id: authorId,
        displayName: faker.name.findName(),
        channelUrl: faker.internet.url(),
        picture: faker.internet.avatar(),
        subscribers: faker.random.numeric(3),
      }
    },
  },

  Query: {
    video: async (_parent: null, { id }: { id: string }, _ctx: null) => {
      return {
        id,
        accountId: faker.random.numeric(2),
        thumbnail: faker.image.imageUrl(),
        videoUri: faker.image.imageUrl(),
        title: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        publishedAt: faker.date.past(),
      }
    },

    // next: async (
    //   { id }: { id: string },
    //   { limit }: { limit: number },
    //   _ctx: null
    // ) => {
    //   return [...Array(limit).keys()].map(() => ({
    //     id: faker.datatype.uuid(),
    //     thumbnail: faker.image.imageUrl(),
    //     accountId: faker.random.numeric(2),
    //     videoUri: faker.image.imageUrl(),
    //     title: faker.lorem.words(5),
    //     description: faker.lorem.paragraph(),
    //     publishedAt: faker.date.past(),
    //   }))
    // },

    // comments: async (
    //   { id }: { id: string },
    //   { limit }: { limit: number },
    //   _ctx: null
    // ) => {
    //   return [...Array(limit).keys()].map(() => ({
    //     id: faker.random.numeric(3),
    //     authorId: faker.random.numeric(2),
    //     text: faker.lorem.sentence(10),
    //     publishedAt: faker.date.past(),
    //   }))
    // },
  },
}
