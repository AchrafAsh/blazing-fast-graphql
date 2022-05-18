import { faker } from "@faker-js/faker"
import { createClient } from "./db"

const createAccount = () => ({
  channelUrl: faker.internet.url(),
  picture: faker.image.imageUrl(),
  displayName: faker.name.findName(),
  subscribers: parseInt(faker.random.numeric(3)),
})

const createVideo = () => ({
  thumbnail: faker.image.imageUrl(),
  title: faker.lorem.sentence(5),
  description: faker.lorem.paragraph(),
  publishedAt: faker.date.past(),
  uri: faker.image.imageUrl(),
})

const createVideoStats = () => ({
  likes: parseInt(faker.random.numeric(3)),
  dislikes: parseInt(faker.random.numeric(3)),
  views: parseInt(faker.random.numeric(5)),
})

const createComment = () => ({
  text: faker.lorem.sentence(10),
  publishedAt: faker.date.past(),
})

const ACCOUNTS = 10
const VIDEOS = 10
const COMMENTS = 10

async function seed() {
  let db = createClient()
  // TODO: insert 10 accounts
  console.log(`Inserting ${ACCOUNTS} accounts`)
  const accountIds = await Promise.all(
    [...Array(ACCOUNTS).keys()].map(() =>
      db.account.create({
        data: { ...createAccount() },
        select: { id: true },
      })
    )
  )

  // TODO: insert 20 videos
  console.log(`Inserting ${VIDEOS} videos`)
  const videoIds = await Promise.all(
    [...Array(VIDEOS).keys()].map((index) =>
      db.video.create({
        data: {
          accountId: accountIds[Math.floor(Math.random() * ACCOUNTS)].id,
          ...createVideo(),
        },
        select: { id: true },
      })
    )
  )

  // TODO: insert video stats
  console.log(`Inserting ${VIDEOS} video stats`)
  await Promise.all(
    videoIds.map(({ id }) =>
      db.videoStats.create({
        data: {
          videoId: id,
          ...createVideoStats(),
        },
        select: { id: true },
      })
    )
  )

  await db.$disconnect()

  // TODO: link the video stats
  console.log(`Linking video stats to their videos`)
  await Promise.all(
    videoIds.map(async ({ id }, index) => {
      db = createClient()
      db.video.update({
        where: { id },
        data: {
          videoStatsId: index,
        },
        select: { id: true },
      })
      await db.$disconnect
    })
  )

  // TODO: insert 20 comments for each
  console.log(`Inserting ${COMMENTS} comments for each video`)
  await Promise.all(
    videoIds.map(async ({ id }) => {
      db = createClient()
      ;[...Array(COMMENTS).keys()].map(() =>
        db.comment.create({
          data: {
            videoId: id,
            authorId: Math.floor(Math.random() * ACCOUNTS),
            ...createComment(),
          },
          select: { id: true },
        })
      )
      await db.$disconnect()
    })
  )

  console.log("Done.")
}

seed()
