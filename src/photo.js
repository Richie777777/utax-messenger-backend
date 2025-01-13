import { Router } from 'express'
import { prisma } from '../server.js'
const PhotoRoute = Router()
const middleware = (req, res, next) => {
  if (req.headers.admin === '858063187') {
    next()
  } else {
    return res.status(401).json({ message: 'You are not admin' })
  }
}
PhotoRoute.post('/find-many', middleware, async (req, res) => {
  try {
    const photos = await prisma.photoMessage.findMany(req.body)
    res.json(photos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
PhotoRoute.post('/create', middleware, async (req, res) => {
  try {
    const photo = await prisma.photoMessage.create(req.body)
    res.json(photo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
PhotoRoute.patch('/update', middleware, async (req, res) => {
  try {
    const photo = await prisma.photoMessage.update(req.body)
    res.json(photo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
PhotoRoute.post('/delete', middleware, async (req, res) => {
  try {
    const photo = await prisma.photoMessage.delete(req.body)
    res.json(photo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
export default PhotoRoute
