import { Router } from 'express'
import { prisma } from '../server.js'

const MessageRoute = Router()

const middleware = (req, res, next) => {
  if (req.headers.admin === '858063187') {
    next()
  } else {
    return res.status(401).json({ message: 'You are not admin' })
  }
}

MessageRoute.post('/find-many', middleware, async (req, res) => {
  try {
    const messages = await prisma.message.findMany(req.body)
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

MessageRoute.post('/create', middleware, async (req, res) => {
  try {
    const message = await prisma.message.create(req.body)
    res.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

MessageRoute.patch('/update', middleware, async (req, res) => {
  try {
    const message = await prisma.message.update(req.body)
    res.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

MessageRoute.post('/delete', middleware, async (req, res) => {
  try {
    const message = await prisma.message.delete(req.body)
    res.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default MessageRoute
