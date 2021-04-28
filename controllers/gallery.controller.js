const { GalleryModel: Gallery } = require('../models/gallery.model')

const dummyGalleryData = {
  slider: [
    {
      image: './assets/images/gallery.jpg',
      title: 'Some Title',
      description: 'Some long text'
    },
    {
      image: './assets/images/gallery.jpg',
      title: 'Some Title2',
      description: 'Some long text2'
    },
    {
      image: './assets/images/gallery.jpg',
      title: 'Some Title3',
      description: 'Some long text3'
    }
  ],
  images: [
    {
      image: './assets/images/1.jpg',
      description: 'Some description1'
    },
    {
      image: './assets/images/2.jpg',
      description: 'Some description2'
    },
    {
      image: './assets/images/3.jpg',
      description: 'Some description3'
    },
    {
      image: './assets/images/4.jpg',
      description: 'Some description4'
    },
    {
      image: './assets/images/bb.jpg',
      description: 'Some description5'
    },
    {
      image: './assets/images/sir.jpg',
      description: 'Some description6'
    },
    {
      image: './assets/images/aa.jpg',
      description: 'Some description7'
    },
    {
      image: './assets/images/members.png',
      description: 'Some description8'
    },
    {
      image: './assets/images/img-6.jpg',
      description: 'Some description9'
    }
  ]
}

exports.getGalleryItems = async (req, res) => {
  try {
    const gallery = await Gallery.find()
    if (gallery.length === 0) {
      console.log('Gallery Not Found in DB! Saving dummy data...')
      const newGallery = new Gallery(dummyGalleryData)
      await newGallery.save()
      res.status(200).json({ gallery: newGallery })
    } else {
      console.log('Gallery Found In DB')
      res.status(200).json({ gallery: gallery[0] })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
