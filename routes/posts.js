const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

//get all
router.get('/', async (req, res) => {
    try
    {
        const posts = await Post.find();
        res.json(posts);
    }
    catch(error)
    {
        res.status(500).json({messsage: error.message});
    }
});

//get one
router.get('/:id', getPostID, (req, res) => {
    res.send(res.post);
});

//create one
router.post('/', async (req, res) => {
    const post = new Post({
        ID_No : req.body.ID_No,
        CNTRNO : req.body.CNTRNO,
        IMPORTER: req.body.IMPORTER,
        CLIENT: req.body.CLIENT,
        SHIPPING_LINE: req.body.SHIPPING_LINE,
        FRT: req.body.FRT,
        SOB: req.body.SOB,
        ETA: req.body.ETA,
        VESSEL: req.body.VESSEL,
        SUBMIT: req.body.SUBMIT,
        RESULT: req.body.RESULT,
        STATUS: req.body.STATUS,
        DEL:  req.body.DEL
    })
    try
    {
        const newPost = await post.save();
        res.status(201).json(newPost);
        console.log("Record added.");
    }
    catch(error)
    {
        res.status(400).json({message: error.message});
    }
});

//update one 
router.patch('/:id', getPostID, async (req, res) => {
    //req.params.id;
    try
    {
        const updatedPost = await Post.updateOne({"ID_No": req.params.id}, {$set: {ID_No: req.body.ID_No, CNTRNO: req.body.CNTRNO, 
            IMPORTER: req.body.IMPORTER, CLIENT: req.body.CLIENT, SHIPPING_LINE: req.body.SHIPPING_LINE, FRT: req.body.FRT, 
            SOB: req.body.SOB, ETA: req.body.ETA, VESSEL: req.body.VESSEL, SUBMIT: req.body.SUBMIT, RESULT: req.body.RESULT, 
            STATUS: req.body.STATUS, DEL: req.body.DEL}}); 
        res.json(updatedPost);
        console.log("Updated record");
    }
    catch(error)
    {
        res.status(400).json({message: error.message});
    }
});

//delete one
router.delete('/:id', getPostID, async (req, res) => {
    //req.params.id;
    try
    {
        await Post.deleteOne(res.post.ID_No);
        res.json({message: 'Deleted record'})
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

//function middle ware to use in each route that requires a id
async function getPostID(req, res, next)
{
    let post
    try
    {
        post = await Post.find({"ID_No": req.params.id});
        console.log(post);
        if(post == null)
        {
            return res.status(404).json({message: "Cannot find record"});
        }        
    }
    catch(error)
    {
        return res.status(500).json({message: error.message});
    }

    res.post = post;
    next();
}

module.exports = router;