const express = require("express");
const searchRouter = express.Router();
const Search = require("../model/search.model");

searchRouter.post("/create", async (req,res)=>{
    const {email,searches}=req.body;
    if(email && searches){
        try {
            const search = new Search({
                email,
                searches
            })
            await search.save();
            res.status(200).send(search)
        } catch (error) {
            res.status(500).send(error.message);  
        }
    }
})


searchRouter.get("/history", async (req, res)=>{
    const email = req.query;
    try {
      const data = await Search.find({ email: email.email})
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
})



searchRouter.delete("/delete/:id", async (req, res) => {
    let ID = req.params.id

    try {
        await Search.findByIdAndDelete({ _id: ID })
        res.status(202).send({
            "msg": "Search has been deleted"
        })
    } catch (error) {
        res.status(400).send({
            "msg": error.message
        })
    }
})

module.exports = { searchRouter };