import { db } from 'src/lib/db'

import { comments, createComment } from './comments'

scenario(
  'returns all comments for a single post from the database',
  async (scenario) => {
    const result = await comments({ postId: scenario.comment.jane.postId })
    const post = await db.post.findUnique({
      where: { id: scenario.comment.jane.postId },
      include: { comments: true },
    })
  })

  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const comment = await createComment({
      input: {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark?',
        post: {
          connect: { id: scenario.post.bark.id },
        },
      },
    })

    expect(comment.name).toEqual('Billy Bob')
    expect(comment.body).toEqual('What is your favorite tree bark?')
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })

  scenario('returns all comments', async (scenario) => {
    const result = await comments({ postId: scenario.comment.jane.postId })
    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })
})
