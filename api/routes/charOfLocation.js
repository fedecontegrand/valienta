var express = require('express');
var router = express.Router();
const axios=require("axios")

/* GET home page. */
router.get('/',async function(req, res, next) {
     const {locationId}=req.query
     try {
         let url=`https://rickandmortyapi.com/api/location/${locationId}`
         let allCharactersResponse=[]
    
         let allCharacters=await axios.get(url)
         for(let i=0;i<allCharacters.data.residents.length;i++){
             let charData=await axios.get(allCharacters.data.residents[i])
             allCharactersResponse.push(charData.data)
         } 
         if(!allCharactersResponse.length) res.status(404).send("There is nothing here")
         else res.json(allCharactersResponse)
         
     } catch (error) {
        res.status(404).send(`Error on getting characters of location`)    
     }
});

module.exports = router;