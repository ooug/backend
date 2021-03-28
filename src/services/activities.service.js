import { join } from 'path'
import { cwd } from 'process'
// eslint-disable-next-line no-unused-vars
import e from 'express'
import { Storage } from '@google-cloud/storage'

import { ImageSlider, EventDetail } from '../models/index.js'

const storage = new Storage({
  projectId: 'ooug-cc348',
  keyFilename: join(cwd(), '../assets/activities/ooug-cc348.json')
})
const bucket = storage.bucket('gs://ooug-cc348.appspot.com')

/**
 * getImageSlider
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const getImageSlider = async (_req, res) => {
  ImageSlider.find({})
    .then((docs) => {
      res.status(200).send(docs)
    })
    .catch((err) => {
      res.send(err)
    })
}

/**
 * postImageSlider
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const postImageSlider = async (req, res) => {
  const file = req.body.file
  file.buffer = Buffer.from(file.buffer, 'base64')
  file.buffer = Buffer.from(file.buffer, 'utf8')

  if (file) {
    PostImageSliderStorage(file, req.body.url)
      .then(() => {
        res.send({ status: 'success' })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

/**
 * deleteUpcoming
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const deleteUpcoming = async (req, res) => {
  ImageSlider.findByIdAndRemove(req.body.id)
    .then(() => {
      res.send({ status: 'success' })
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * updateUpcomingWithoutImage
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const updateUpcomingWithoutImage = async (req, res) => {
  const file = req.body.file
  const link = req.body.url
  ImageSlider.updateOne({ _id: req.body.id }, { imageName: file, url: link })
    .then(() => {
      res.send({ status: 'success' })
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * updateUpcomingWithImage
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const updateUpcomingWithImage = async (req, res) => {
  const file = req.body.file
  file.buffer = Buffer.from(file.buffer, 'base64')
  file.buffer = Buffer.from(file.buffer, 'utf8')
  const link = req.body.url
  if (file) {
    UpdateUpcomingImage(file)
      .then((success) => {
        ImageSlider.updateOne(
          { _id: req.body.id },
          { imageName: success, url: link }
        )
          .then(() => {
            res.send({ status: 'success' })
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

/**
 * postEventDetail
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const postEventDetail = async (req, res) => {
  const file = req.body.file
  file.buffer = Buffer.from(file.buffer, 'base64')
  file.buffer = Buffer.from(file.buffer, 'utf8')
  const eventType = req.body.eventType
  const date = req.body.date
  const eventOn = req.body.eventOn
  const organizedBy = req.body.organizedBy
  const organizedAt = req.body.organizedAt
  const eventDetails = req.body.eventDetails
  if (file) {
    PostActivityDetail(
      file,
      eventType,
      date,
      eventOn,
      organizedBy,
      organizedAt,
      eventDetails
    )
      .then(() => {
        res.send({ status: 'success' })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

/**
 * getRecentEventDetail
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const getRecentEventDetail = async (_req, res) => {
  EventDetail.aggregate([{ $limit: 6 }])
    .then((docs) => {
      res.status(200).send(docs)
    })
    .catch((err) => {
      res.status(200).send('Error occur in fetching data : ' + err)
    })
}

/**
 * getEventDetail
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const getEventDetail = async (_req, res) => {
  EventDetail.find({})
    .then((docs) => {
      res.status(200).send(docs)
    })
    .catch((err) => {
      res.status(200).send('Error occur in fetching data : ' + err)
    })
}

/**
 * getEventDetailWorkshop
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const getEventDetailWorkshop = async (_req, res) => {
  EventDetail.find({ eventType: 'workshop' })
    .then((docs) => {
      res.status(200).send(docs)
    })
    .catch((err) => {
      res.status(200).send('Error occur in fetching data : ' + err)
    })
}

/**
 * getEventDetailTechbhukkads
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const getEventDetailTechbhukkads = async (_req, res) => {
  EventDetail.find({ eventType: 'techbhukkads' })
    .then((docs) => {
      res.status(200).send(docs)
    })
    .catch((err) => {
      res.status(200).send('Error occur in fetching data : ' + err)
    })
}

/**
 * getEventDetailFarewell
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const getEventDetailFarewell = async (_req, res) => {
  EventDetail.find({ eventType: 'farewell' })
    .then((docs) => {
      res.status(200).send(docs)
    })
    .catch((err) => {
      res.status(200).send('Error occur in fetching data : ' + err)
    })
}

/**
 * deleteEvent
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const deleteEvent = async (req, res) => {
  EventDetail.findByIdAndRemove(req.body.id)
    .then(() => {
      res.send({ status: 'success' })
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * updateEventWithoutImage
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const updateEventWithoutImage = async (req, res) => {
  const event = req.body.eventType
  const date = req.body.date
  const on = req.body.eventOn
  const by = req.body.organizedBy
  const at = req.body.organizedAt
  const details = req.body.eventDetails
  EventDetail.updateOne(
    { _id: req.body.id },
    {
      eventType: event,
      eventDate: date,
      eventOn: on,
      organizedBy: by,
      organizedAt: at,
      eventDetails: details
    }
  )
    .then(() => {
      res.send({ status: 'success' })
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * updateEventWithImage
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const updateEventWithImage = async (req, res) => {
  const file = req.body.file
  file.buffer = Buffer.from(file.buffer, 'base64')
  file.buffer = Buffer.from(file.buffer, 'utf8')

  // const id = req.body.id;
  const type = req.body.eventType
  const date = req.body.date
  const on = req.body.eventOn
  const by = req.body.organizedBy
  const at = req.body.organizedAt
  const details = req.body.eventDetails
  if (file) {
    UpdateActivityDetail(file)
      .then((success) => {
        EventDetail.updateOne(
          { _id: req.body.id },
          {
            eventImage: success,
            eventType: type,
            eventDate: date,
            eventOn: on,
            organizedBy: by,
            organizedAt: at,
            eventDetails: details
          }
        )
          .then(() => {
            res.send({ status: 'success' })
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

/**
 * UpdateActivityDetail
 * @param {*} file
 * @returns {Promise<*>}
 */
const UpdateActivityDetail = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('no image file'))
    }
    const newFileName =
      'activities/' + new Date().toISOString() + file.originalname
    const fileUpload = bucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })
    blobStream.on('error', (error) => {
      console.log(error)
    })
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      resolve(url)
    })
    blobStream.end(file.buffer)
  })
}

/**
 * PostActivityDetail
 * @param {*} file
 * @param {*} eventType
 * @param {*} date
 * @param {*} eventOn
 * @param {*} organizedBy
 * @param {*} organizedAt
 * @param {*} eventDetails
 * @returns {Promise<*>}
 */
const PostActivityDetail = (
  file,
  eventType,
  date,
  eventOn,
  organizedBy,
  organizedAt,
  eventDetails
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('no image file'))
    }
    const newFileName =
      'activities/' + new Date().toISOString() + file.originalname
    const fileUpload = bucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })
    blobStream.on('error', (error) => {
      console.log(error)
    })
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      resolve(url)
      const EventDetail$ = new EventDetail({
        eventImage: url,
        eventType,
        eventDate: date,
        eventOn,
        organizedBy,
        organizedAt,
        eventDetails
      })
      EventDetail$.save()
        .then(() => {
          resolve('data saved')
        })
        .catch(() => {
          resolve('error occurred!')
        })
    })
    blobStream.end(file.buffer)
  })
}

/**
 * PostImageSliderStorage
 * @param {*} file
 * @param {*} sliderUrl
 * @returns {Promise<*>}
 */
const PostImageSliderStorage = (file, sliderUrl) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No image file'))
    }
    const newFileName =
      'image-slider/' + new Date().toISOString() + file.originalname
    const fileUpload = bucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })
    blobStream.on('error', () => {
      reject(new Error('Something is wrong! Unable to upload at the moment.'))
    })

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      const ImageSlider$ = new ImageSlider({
        imageName: imageUrl,
        url: sliderUrl
      })
      ImageSlider$.save()
        .then(() => {
          resolve('data saved')
        })
        .catch(() => {
          resolve('error occurred')
        })
    })
    blobStream.end(file.buffer)
  })
}

/**
 * UpdateUpcomingImage
 * @param {*} file
 * @returns {Promise<*>}
 */
const UpdateUpcomingImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No image file'))
    }
    const newFileName =
      'image-slider/' + new Date().toISOString() + file.originalname
    const fileUpload = bucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })
    blobStream.on('error', () => {
      reject(new Error('Something is wrong! Unable to upload at the moment.'))
    })

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      resolve(imageUrl)
    })
    blobStream.end(file.buffer)
  })
}
