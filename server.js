import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import moment from 'moment-timezone'
import { telegramApi } from './axios.js'
import GroupRoute from './src/group.js'
import MessageRoute from './src/message.js'
import PhotoRoute from './src/photo.js'

const app = express()

export const prisma = new PrismaClient()

app.use(
  cors({
    origin: true,
  })
)
app.use(express.json())
app.use('/message', MessageRoute)
app.use('/photo', PhotoRoute)
app.use('/group', GroupRoute)

const sendMessage = async (chatId, text) => {
  try {
    await telegramApi.post('/sendMessage', {
      chat_id: chatId,
      text: text,
    })
  } catch (error) {
    console.error('Error sending message to Telegram:', error)
  }
}

const sendPhoto = async (chatId, photo, caption) => {
  try {
    await telegramApi.post('/sendPhoto', {
      chat_id: chatId,
      photo: photo,
      caption: caption,
    })
  } catch (error) {
    console.error('Error sending photo to Telegram:', error)
  }
}

const processMessages = async (messages, groups, sendFn) => {
  const currentTime = moment().tz('Asia/Tashkent').format('HH:mm')
  const currentMinute = parseInt(moment().tz('Asia/Tashkent').format('mm'))
  const currentDay = moment().tz('Asia/Tashkent').format('dddd')

  for (const message of messages) {
    const messageMinute = parseInt(message.sendTime.split(':')[1])
    const isHourly =
      message.interval === 'HOURLY' && currentMinute === messageMinute
    const isDaily =
      message.interval === 'DAILY' && currentTime === message.sendTime
    const isWeekly =
      message.interval === 'WEEKLY' &&
      message.weekday?.includes(currentDay) &&
      currentTime === message.sendTime

    if (isHourly || isDaily || isWeekly) {
      console.log(
        `${message.interval} xabar yuborildi:`,
        message.caption || message.text
      )
      for (const group of groups) {
        if (sendFn === sendPhoto) {
          await sendPhoto(
            `${group.groupId}`,
            message.image || '',
            message.caption || ''
          )
        } else if (sendFn === sendMessage) {
          await sendMessage(`${group.groupId}`, message.text || '')
        }
      }
    }
  }
}

const checkAndSendAll = async () => {
  const groups = await prisma.group.findMany()
  const textMessages = await prisma.message.findMany()
  const photoMessages = await prisma.photoMessage.findMany()

  console.log('Hozirgi vaqt:', moment().tz('Asia/Tashkent').format('HH:mm'))

  await processMessages(textMessages, groups, sendMessage)
  await processMessages(photoMessages, groups, sendPhoto)
}

setInterval(checkAndSendAll, 60000)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
