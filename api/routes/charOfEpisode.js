var express = require('express');
var router = express.Router();
const axios=require("axios")

/* GET home page. */
router.get('/',async function(req, res, next) {
     const {episodeId}=req.query
     try {
         let url=`https://rickandmortyapi.com/api/episode/${episodeId}`
         let allCharactersResponse=[]
    
         let allCharacters=await axios.get(url)
    
         for(let i=0;i<allCharacters.data.characters.length;i++){
             let charData=await axios.get(allCharacters.data.characters[i])
             allCharactersResponse.push(charData.data)
         } 
         res.json(allCharactersResponse)
         
     } catch (error) {
        res.status(404).send(error.response.data.error)    
     }
});

module.exports = router;
