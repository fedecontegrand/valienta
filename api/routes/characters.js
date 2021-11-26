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
  status!=="any" ? statusSt=`&specis=${status}` : statusSt=""
  
  let url=`https://rickandmortyapi.com/api/character?page=${page}${genderSt+nameSt+statusSt}`

  axios.get(url)
  .then(result=>{
    console.log(result.data.results)
    res.json(result.data.results)}
  )
  .catch(err=>console.log(err))

});

module.exports = router;
