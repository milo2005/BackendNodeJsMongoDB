var express = require('express');
var router = express.Router();
var mID = require('mongodb').ObjectID;

app.use(function(req, res, next) {
  req.c = req.db.collection("events");
  next();
});

router.get("/date", function(req,res,next){

  var city = req.query.city;
  if(city != null){
    city = {city:city};
  }
  var today, week, month, next;

  req.c.find();

  //Today
  //week
  //month
  //next

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

router.get("/date/:d", function(req,res,next){

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

router.get("/favorites/:id", function(req,res,next){

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
