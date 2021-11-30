const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:page', function(req, res, next) {
  const {gender,name,status}=req.query
  const {page}=req.params

  let genderSt
  let nameSt
  let statusSt

  gender!=="any" ? genderSt=`&gender=${gender}` : genderSt=""
  name!=="any" ? nameSt=`&name=${name}` : nameSt=""
  status!=="any" ? statusSt=`&status=${status}` : statusSt=""
  
  let url=`https://rickandmortyapi.com/api/character?page=${page}${genderSt+nameSt+statusSt}`

  axios.get(url)
  .then(result=>{
    res.json(result.data)}
  )
  .catch(err=>res.status(404).send(`${err.response.data.error}`))

});

module.exports = router;
