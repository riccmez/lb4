var mongoose = require('mongoose');
var Producto = require("../models/Producto");
var productoController = {};

productoController.list = function(req, res){
    // console.log('this far');
    Producto.find({}).exec(function(err, productos){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/pages/index',{productos}); 
    });
};