var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Producto = require("../models/Producto");

router.get('/', function(req,res){
    Producto.find({}).exec(function(err, productos){
      if( err ){ console.log('Error: ', err); return; }
      console.log("The INDEX");
      res.render('./pages/index',{productos});
  });
});

router.get('/show/:id', function(req,res){
  Producto.findOne({_id: req.params.id}).exec(function(err,producto){
    if( err ){ console.log('Error: ', err); return; }    
  res.render('./pages/show', {producto} );});
});

router.get('/edit/:id', function(req,res){
  Producto.findOne({_id: req.params.id}).exec(function (err, producto){
    if (err) { console.log("Error:", err); return; }
    res.render("./pages/edit", {producto});
  });
});
router.get('/edit/update/:id/:codigo/:descripcion/:precio/:stock/:marca/:categoria', function(req,res){
  console.log(req.params.codigo);
  // res.redirect('/');
    Producto.findByIdAndUpdate( req.params.id, {$set: {
    codigo: req.params.codigo,
    descripcion: req.params.descripcion,
    precio: req.params.precio,
    stock: req.params.stock,
    marca: req.params.marca,
    categoria: req.params.categoria
    }}, 
    { new: true },
  function( err){
    if( err ){ 
        console.log('Error: ', err); 
        res.render('./pages/edit');
    }
    res.redirect('/show/' + req.params.id);
    
});  
});

router.get('/create',function(req,res){
  res.render('./pages/create');
} );

router.get('/save/:codigo/:descripcion/:precio/:stock/:marca/:categoria', function(req,res){
  var producto = new Producto(req.params);
  producto.save(function(err){
      if( err ){ console.log('Error: ', err); return; }  
      console.log("Successfully created a usuario. :)");
      res.redirect("/");
  });
});

router.post('/delete/:id',function(req,res){
  Producto.remove({_id: req.params.id}, function(err){
    if( err ){ console.log('Error: ', err); return; }
    
    console.log("Producto deleted!");
    res.redirect("/");
  });
});



module.exports = router;