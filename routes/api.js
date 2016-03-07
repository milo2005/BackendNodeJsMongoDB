var express = require('express');
var router = express.Router();
var mID = require('mongodb').ObjectID;

router.param("collection", function(req, res, next, c){
  req.c = req.db.collection(c);
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

//GET
router.get("/:collection/:id", function(req,res,next){

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

/*router.get("/:collection", function(req,res,next){

  res.send("parametro "+req.query.hola);

  /*req.c.find().toArray( function(err, result) {
    if(err == null)
      res.send(result);
    else
      res.send([]);
  });
});*/

router.get("/:collection", function(req,res,next){
  var q = req.query.q;
  var l = req.query.limit;
  var s = req.query.skip;
  var o = req.query.sort;

  if(q != null)
    q = JSON.parse(q);

  if(l == null){
    l = 0;
  }else {
    l = parseInt(l);
  }

  if(s == null){
    s =0;
  }else{
    s = parseInt(s);
  }

  if(o != null)
    o = JSON.parse(o);



  req.c.find(q).limit(l).skip(s).sort(o).toArray( function(err, result) {
    if(err == null)
      res.send(result);
    else
      res.send([]);
  });
});

//POST
router.post("/:collection", function(req,res,next){
  req.c.insert(req.body, {w:1}, function(err, result) {
    if(err == null)
      res.send({result:1, id:result.insertedIds[0]});
    else
      res.send({result:0});
  });
});

//Delete
router.delete("/:collection/:id", function(req,res,next){
  req.c.delete({_id: new mID(req.params.id)}, function(err, result) {
    if(err == null)
      res.send({result:1});
    else
      res.send({result:0});
  });
});

//Update
router.put("/:collection/:id", function(req,res,next){
  req.c.update({_id: new mID(req.params.id)},{$set:req.body}, {w:1}, function(err, result) {
    if(err == null)
      res.send({result:1});
    else
      res.send({result:0});
  });
});

router.put("/:collection/push/:id", function(req,res,next){
  req.c.update({_id: new mID(req.params.id)},{$push:req.body},{w:1}, function(err, result) {
    if(err == null)
      res.send({result:1});
    else
      res.send({result:0});
  });
});

router.put("/:collection/pull/:id", function(req,res,next){
  req.c.update({_id: new mID(req.params.id)},{$pull:req.body}, {w:1}, function(err, result) {
    if(err == null)
      res.send({result:1});
    else
      res.send({result:0});
  });
});

module.exports = router;
