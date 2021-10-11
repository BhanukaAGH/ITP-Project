const express = require('express');
const router = express.Router();
const FAQ = require("../../models/Faq");


//Get single Question
router.get("/get", async (req, res) => {
    try {
        const faqList = await FAQ.find();
        res.status(200).json({
            status: "success",
            message: "success",
            data: JSON.parse(JSON.stringify(faqList))
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Something Went Wrong"
        })
    }
})

router.post("/add", async (req, res) => {
    if (req.body.question === "" || req.body.topic === "") {
        res.status(400).json({
            message: "Incomplete Request"
        })
    } else {
        let faqObj = {
            question: req.body.question,
            answer: "",
            topic: req.body.topic,
            category: req.body.category === "" ? "General" : req.body.category,
            date: new Date(),
            state: "pending"
        }
        try {
            await FAQ.create(faqObj);
            res.status(200).json({
                status: "success",
                message: "Successfully added",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "Something Went Wrong"
            })
        }
    }
})

// Update FAQ
router.put("/edit", async (req, res) => {

    if (req.body.id === "" || req.body.answer === "") {
        res.status(400).json({
            message: "Incomplete Request"
        })
    } else {
        try {                        //get by id and update 
            await FAQ.findOneAndUpdate({ _id: req.body.id }, {
                $set: {
                    answer: req.body.answer,
                    state: "answered"
                }
            });
            res.status(200).json({
                status: "success",
                message: "Successfully updated",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "Something Went Wrong"
            })
        }
    }

})

router.delete("/delete", async (req, res) => {
    if (req.body.id === "") {
        res.status(400).json({
            message: "Incomplete Request"
        })
    } else {
        try {                    // Firstly get ID then Delete
            await FAQ.deleteOne({ _id: req.body.id });
            res.status(200).json({
                status: "success",
                message: "Successfully deleted",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "Something Went Wrong"
            })
        }
    }

})

module.exports = router;

