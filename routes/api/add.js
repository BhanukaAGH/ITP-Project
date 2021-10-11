const router = require('express').Router()
const mongo = require('mongodb')
const mongoose = require('mongoose')
const Advertisment = require('../../models/Advertisment')

router.post('/add-add', (request, response) => {
  const details = request.body.productDetails
  const productID = request.body.productID
  const images = request.body.images

  const product = {
    category: details.category,
    images,
    //brand: details.brand,

    description: details.description,
  }

  if (productID) {
    Advertisment.findOneAndUpdate(
      { _id: new mongo.ObjectId(productID) },
      product,
      { upsert: true },
      (error, product) => {
        if (error) {
          console.log(error)
          return response
            .status(500)
            .send({ errors: { serverError: 'session could not be saved' } })
        }

        response.status(200).send(product)
      }
    )
  } else {
    const productSchema = new Advertisment(product)

    productSchema.save().then((info, error) => {
      if (error) {
        return response
          .status(500)
          .json({ errors: { serverError: 'session could not be saved' } })
      }

      response
        .status(200)
        .send({ message: 'Product details successfully saved to database!' })
    })
  }
})

router.post('/get-adds', (request, response) => {
  const filterData = request.body.projection

  const categories =
    filterData && filterData.categories.length !== 0
      ? filterData.categories.map((category) => {
          switch (category) {
            case '0':
              return 'offer'
            case '1':
              return 'product'
            case '2':
              return 'notice'
          }
        })
      : ['offer', 'product', 'notice']
  let min = filterData ? filterData.range.from : 0,
    max = filterData ? filterData.range.to : Number.MAX_SAFE_INTEGER
  if (min <= 0 || max < min) {
    min = 0
    max = Number.MAX_SAFE_INTEGER
  }

  Advertisment.find(
    { category: { $in: categories } /*, price: {$gte: min, $lte: max}*/ },
    { images: { $slice: 1 }, __v: 0, createdAt: 0 }
  )
    .sort({ price: filterData ? (filterData.order === 'asc' ? 1 : -1) : 1 })
    .then((product, error) => {
      if (error) {
        return response
          .status(500)
          .send({ errors: { serverError: 'session could not be saved' } })
      }
      response.status(200).send(product)
    })
})

router.post('/get-add-details', (request, response) => {
  const productID = request.body.productID

  Advertisment.findOne(
    { _id: new mongo.ObjectId(productID) },
    (error, product) => {
      if (error) {
        return response
          .status(500)
          .send({ errors: { serverError: 'session could not be saved' } })
      }

      response.status(200).send(product)
    }
  )
})

router.post('/delete-add', (request, response) => {
  const productID = request.body.productID

  Advertisment.deleteOne(
    { _id: new mongo.ObjectId(productID) },
    (error, product) => {
      if (error) {
        return response
          .status(500)
          .send({ errors: { serverError: 'session could not be saved' } })
      }

      response.status(200).send(product)
    }
  )
})

// @route   GET api/admin/advertisments
// @desc    Get all advertisments
// @access  public
router.get('/advertisments', async (req, res) => {
  try {
    const adds = await Advertisment.find()
    res.json(adds)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})




module.exports = router
