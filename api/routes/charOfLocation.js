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
         res.json(allCharactersResponse)
         
     } catch (error) {
        console.log(error)     
     }
});

module.exports = router;