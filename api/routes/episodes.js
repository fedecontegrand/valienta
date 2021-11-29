var express = require('express');
var router = express.Router();
const axios=require("axios")
/* GET users listing. */
router.get('/:page', function(req, res, next) {
  const {name}=req.query
  const {page}=req.params
  let nameSt
  name!=="any" ? nameSt=`&name=${name}` : nameSt=""

  let url=`https://rickandmortyapi.com/api/episode?page=${page}${nameSt}`
    axios.get(url)
    .then(result=>{
      res.json(result.data)}
    )
    .catch(err=>console.log(err))

});

module.exports = router;
