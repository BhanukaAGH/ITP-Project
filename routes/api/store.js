const router = require('express').Router()
const mongo = require('mongodb')
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
require('../../models/Store');
const Store = mongoose.model('Store');

router.post('/add-product', async (request, response) => {
  const details = request.body.productDetails
  const productID = request.body.productID
  const images = request.body.images

  const product = {
    category: details.category,
    images,
    brand: details.brand,
    model: details.model,
    weight: details.weight,
    dimensions: details.dimensions,
    description: details.description,
    price: details.price,
  }

  if (productID) {
    Product.findOneAndUpdate(
      {_id: new mongo.ObjectId(productID)},
      product,
      {upsert: true},
      (error, product) => {
        if (error) {
          return response
            .status(500)
            .send({status: false, error: 'server error'})
        }

        response.status(200).send(product)
      }
    )
  } else {
    const productSchema = new Product(product)

    await productSchema.addStore(details.available)

    productSchema.save().then((info, error) => {
      if (error) {
        return response
          .status(500)
          .send({status: false, error: 'server error'})
      }

      response
        .status(200)
        .send({message: 'Product details successfully saved to database!'})
    })
  }
})


//get products
router.post('/get-products', (request, response) => {
  const filterData = request.body.projection

  const categories =
    filterData && filterData.categories.length !== 0
      ? filterData.categories.map((category) => {
        switch (category) {
          case '0':
            return 'mobile'
          case '1':
            return 'television'
          case '2':
            return 'laptop'
        }
      })
      : ['mobile', 'television', 'laptop']
  let min = filterData ? filterData.range.from : 0,
    max = filterData ? filterData.range.to : Number.MAX_SAFE_INTEGER
  if (min <= 0 || max < min) {
    min = 0
    max = Number.MAX_SAFE_INTEGER
  }

  Product.find(
    {category: {$in: categories}, price: {$gte: min, $lte: max}},
    {images: {$slice: 1}, __v: 0, createdAt: 0}
  )
    .sort({price: filterData ? (filterData.order === 'asc' ? 1 : -1) : 1})
    .then((product, error) => {
      if (error) {
        return response
          .status(500)
          .send({errors: {serverError: 'session could not be saved'}})
      }
      response.status(200).send(product)
    })
})

// get product details
router.post('/get-product-details', (request, response) => {
  const productID = request.body.productID

  Product.findOne({_id: new mongo.ObjectId(productID)}, (error, product) => {
    if (error) {
      return response
        .status(500)
        .send({errors: {serverError: 'session could not be saved'}})
    }

    response.status(200).send(product)
  })
})


//delete
router.post('/delete-product', (request, response) => {
  const productID = request.body.productID

  Product.deleteOne(
    {_id: new mongo.ObjectId(productID)},
    (error, product) => {
      if (error) {
        return response
          .status(500)
          .send({errors: {serverError: 'session could not be saved'}})
      }

      response.status(200).send(product)
    }
  )
});


//search
router.post('/search-products', async (request, response) => {

  const searchKey = request.body.searchKey;
  if (!searchKey) {
    response.status(400).send({
      status: false,
      message: 'Search key is required!'
    });
  }

  try {

    const key = new RegExp(searchKey, 'i');

    const products = await Product.aggregate([{
      $project: {
        newField: {$concat: ["$brand", " ", "$model"]},
        _id: 1,
        brand: 1,
        model: 1,
        images: {$arrayElemAt: ["$images", 0]},
        category: 1,
        available: 1,
        weight: 1,
        dimensions: 1,
        descriptions: 1,
        price: 1
      }
    }, {$match: {newField: key}}]);

    response.status(200).send(products);

  } catch (error) {
    response.status(500).send({
      status: false,
      message: 'Server error..!'
    });
  }

});


//post
router.post('/refill', async (request, response) => {

  const {productID, amount} = request.body;

  if (!productID || !amount || isNaN(amount)) {
    return response.status(400).send({
      status: false,
      message: 'Malformed request..!'
    });
  }

  try {

    const store = new Store({
      productId:  new mongo.ObjectId(productID),
      amount,
      date: new Date()
    });

    await store.save();

    const product = await Product.findOne({_id: new mongo.ObjectId(productID)});
    product.available += parseInt(amount);
    await product.save();

    response.status(200).send({
      status: true,
      message: 'Product details updated successfully..!'
    });

  } catch (error) {
    response.status(500).send({
      status: false,
      message: 'Server error..!'
    });
  }

});


//report
router.post('/generate-report', async (request, response) => {

  try {

    const d = new Date();
    d.setDate(d.getDate() - 5);

    const products = await Product.aggregate([{
      $lookup: {
        from: "stores",
        localField: "_id",
        foreignField: "productId",
        as: "refills"
      }
    },
      {$project: {__v: 0, updatedAt: 0, images: 0, dimensions: 0, weight: 0}},
      {$match: {'refills.date': {$gt: d}}}
    ]);

    response.status(200).send(products);

  } catch (error) {
    response.status(500).send({
      status: false,
      message: 'Server error..!'
    });
  }

});

module.exports = router
