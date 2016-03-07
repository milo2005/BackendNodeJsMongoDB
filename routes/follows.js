var express = require('express');
var router = express.Router();
var mID = require('mongodb').ObjectID;

app.use(function(req, res, next) {
  req.c = req.db.collection("follows");
  next();
});


router.param("id", function(req, res, next, id){
  var idp = req.params.id.length;
  if( idp == 12 || idp == 24 ){
    next();
  }else{
    res.status(404).send({result:0});
  }
});

router.get("/main/:id", function(req,res,next){

  var id = new mID(req.params.id);
  req.c.findOne({_id: new mID(id)}, function(err, result) {
    if(err == null){
      if(result == null)
        res.status(404).send({result:0});
      else
        res.send(result);
    }else{
        res.status(404).send({result:0});
    }
  });

});

module.exports = router;
