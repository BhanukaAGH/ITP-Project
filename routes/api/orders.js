const router = require('express').Router()
let Order = require('../../models/Order')
let fastCsv = require('fast-csv');
const PDFDocument = require("pdfkit-table");
const fs = require('fs');
const { Base64Encode } = require("base64-stream");

//adding order
router.route('/add').post((req, res) => {

    const Cname = req.body.Cname;
    const phone = req.body.phone;
    const email = req.body.email;
    const orderitems = req.body.orderitems;
    const quantity = Number(req.body.quantity);
    const orderdate = req.body.orderdate;

    const newOrder = new Order({

        Cname,
        phone,
        email,
        orderitems,
        quantity,
        orderdate
    })

    newOrder.save().then(() => {
        res.json("Order Added")
    }).catch((err) => {
        console.log(err);
    })
})


router.route('/').get((req, res) => {

    Order.find().then((orders) => {
        res.json(orders)
    }).catch((err) => {
        console.log(err)
    })
})

//order update
router.route('/update/:id').put(async(req, res) => {
    let userId = req.params.id;
    const {Cname,phone,email,orderitems,quantity,orderdate} = req.body;

    const updateOrder = {
        Cname,
        phone,
        email,
        orderitems,
        quantity,
        orderdate
    }
    const update = await Order.findByIdAndUpdate(userId, updateOrder).then(() => {
        res.status(200).send({ status: "Order updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

//order delete
router.route('/delete/:id').delete(async(req, res) => {
    let userId = req.params.id;

    await Order.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Order deleted" })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

//order display
router.route('/get/:id').get(async(req, res) => {
    let userId = req.params.id;
    const user = await Order.findById(userId).then((order) => {
        res.status(200).send({ status: "User fetched", order })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

// search orders
router.route('/search/:searchText').get(async(req, res) => {
    const searchText = req.params.searchText;
    if (searchText == '*'){
        await Order.find({}).then((orders)=>{
            res.status(200).json(orders);
        });
    } else{
        await Order.find({ $text : { $search : searchText }}).then((orders) => {
            res.status(200).json(orders);
        });
    }
  
});

router.route('/report').get(async(req, res) => {
    const cursor = Order.find();

    const transformer = (doc)=> {
      return {
          CustomerName: doc.Cname,
          PhoneNumber: doc.phone,
          Email: doc.email,
          OrderItems: doc.orderitems,
          Quantity: doc.quantity,
          OrderDate: doc.orderdate
      };
    }
  
    const filename = 'orders.csv';
  
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.writeHead(200, { 'Content-Type': 'text/csv' });
  
    res.flushHeaders();
    
    var csvStream = fastCsv.format({headers: true}).transform(transformer)
    cursor.stream().pipe(csvStream).pipe(res);
});

//pdf order report
router.route('/pdf').get(async(req, res) => {

    let pdf = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=test.pdf`
    );
  
    await Order.find({}).then((orders) => {
         rows = [];
         orders.forEach((order)=> {
           row = [];
           row.push(order.Cname);
           row.push(order.phone);
           row.push(order.email);
           row.push(order.orderitems);
           row.push(order.quantity);
           row.push(order.orderdate);
           rows.push(row);
        });  
    });
  
    res.status(200);
    const table = { 
      title: 'All Orders Report',
      headers: ['Customer_Name', 'Phone_Number', 'E-mail' , 'Order_Items', 'Quantity', 'Order_Date'],
      rows: rows,
    }
    const options = {}
    pdf.table( table, options );
    pdf.pipe(new Base64Encode()).pipe(res);
    pdf.end();
    
  });

module.exports = router;