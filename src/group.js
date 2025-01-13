import { Router } from 'express'
import { prisma } from '../server.js'
const GroupRoute = Router()

const middleware = (req, res, next) => {
  if (req.headers.admin === '858063187') {
    next()
  } else {
    return res.status(401).json({ message: 'You are not admin' })
  }
}

GroupRoute.post('/find-many', async (req, res) => {
  try {
    const groups = await prisma.group.findMany(req.body)
    res.json(
      groups.map((group) => {
        const groupJson = { ...group }
        Object.keys(groupJson).forEach((key) => {
          groupJson[key] = String(groupJson[key])
        })
        return groupJson
      })
    )
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

GroupRoute.post('/create', async (req, res) => {
  try {
    const group = await prisma.group.create(req.body)
    res.json(group)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

GroupRoute.patch('/update', middleware, async (req, res) => {
  try {
    const group = await prisma.group.update(req.body)
    res.json(group)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

GroupRoute.post('/delete', async (req, res) => {
  try {
    const group = await prisma.group.delete(req.body)
    res.json(group)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default GroupRoute
