var express = require('express');
var router = express.Router();
const axios=require("axios")
/* GET users listing. */
router.get('/:page', function(req, res, next) {
    const {page}=req.params
    const {type,dimension}=req.query

    let typeSt
    let dimensionSt

    type !=="any" ? typeSt=`&type=${type}` : typeSt=""
    dimension !=="any" ? dimensionSt=`&dimension=${dimension}` : dimensionSt=""

    let url=`https://rickandmortyapi.com/api/location?page=${page}${typeSt}${dimensionSt}`

    axios.get(url)
    .then(result=>{
        res.json(result.data)
    })
    .catch(err=>console.log(err))
});

module.exports = router;