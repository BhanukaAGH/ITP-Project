const router = require('express').Router();
let Delivery = require('../../models/Delivery');
let fastCsv = require('fast-csv');
const PDFDocument = require("pdfkit-table");
const fs = require('fs');
const { Base64Encode } = require("base64-stream");


//adding delivery
router.route('/add').post((req, res) => {

    const destination = req.body.destination;
    const pstate = req.body.pstate;
    const dtype = req.body.dtype;
    const ddate = req.body.ddate;
    const dname = req.body.dname;
    const dstate = req.body.dstate;

    const newDelivery = new Delivery({
        destination,
        pstate,
        dtype,
        ddate,
        dname,
        dstate
        
    })

    newDelivery.save().then(() => {
        res.json("Delivery Added")
    }).catch((err) => {
        console.log(err);
    })
})


router.route('/').get((req, res) => {

    Delivery.find().then((deliverys) => {
        res.json(deliverys)
    }).catch((err) => {
        console.log(err)
    })
})

//delivery update
router.route('/update/:id').put(async(req, res) => {
    let userId = req.params.id;
    const {destination,pstate,dtype,ddate,dname,dstate} = req.body;

    const updateDelivery = {
        destination,
        pstate,
        dtype,
        ddate,
        dname,
        dstate
    }
    const update = await Delivery.findByIdAndUpdate(userId, updateDelivery).then(() => {
        res.status(200).send({ status: "Delivery updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

//delivery delete
router.route('/delete/:id').delete(async(req, res) => {
    let userId = req.params.id;

    await Delivery.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Delivery deleted" })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

//delivery display
router.route('/get/:id').get(async(req, res) => {
    let userId = req.params.id;
    const user = await Delivery.findById(userId).then((delivery) => {
        res.status(200).send({ status: "User fetched", delivery })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

// search deliveries
router.route('/search/:searchText').get(async(req, res) => {
    const searchText = req.params.searchText;
    if (searchText == '*'){
        await Delivery.find({}).then((deliveries)=>{
            res.status(200).json(deliveries);
        });
    } else{
        await Delivery.find({ $text : { $search : searchText }}).then((deliveries) => {
            res.status(200).json(deliveries);
        });
    }
  
});

router.route('/report').get(async(req, res) => {
    const cursor = Delivery.find();

    const transformer = (doc)=> {
      return {
          Destination: doc.destination,
          PaymentState: doc.pstate,
          DeliveryType: doc.dtype,
          DeliveryDate: doc.ddate,
          DeliveryName: doc.dname,
          DeliveryState: doc.dstate
      };
    }
  
    const filename = 'deliveries.csv';
  
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.writeHead(200, { 'Content-Type': 'text/csv' });
  
    res.flushHeaders();
    
    var csvStream = fastCsv.format({headers: true}).transform(transformer)
    cursor.stream().pipe(csvStream).pipe(res);
});


//pdf delivery
router.route('/pdf').get(async(req, res) => {

    let pdf = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=test.pdf`
    );
  
    await Delivery.find({}).then((deliveries) => {
         rows = [];
         deliveries.forEach((delivery)=> {
           row = [];
           row.push(delivery.destination);
           row.push(delivery.pstate);
           row.push(delivery.dtype);
           row.push(delivery.ddate);
           row.push(delivery.dname);
           row.push(delivery.dstate);
           rows.push(row);
        });  
    });
  
    res.status(200);
    const table = { 
      title: 'All Deliveries Report',
      headers: ['Destination', 'Payment_state', 'Delivery_type' ,'Delivery_date','Deliver_name','Delivery_state'],
      rows: rows,
    }
    const options = {}
    pdf.table( table, options );
    pdf.pipe(new Base64Encode()).pipe(res);
    pdf.end();
    
  });


module.exports = router;