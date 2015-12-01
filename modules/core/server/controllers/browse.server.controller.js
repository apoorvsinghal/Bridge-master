var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');

exports.browseStartup = function(req, res){
		User.find(function(err, data){
			if(err){res.send(500, err);}
			res.send(data);
			return data;
		})
	};

	exports.browse_Startup = function(req, res){

			console.log('are you here in browse_startup');

			User.find({companyname: req.params.id}, function(err, data){
				if(err){res.send(500, err);}
				console.log(data);
				res.send(data);
				return data;

			})
		};

exports.browseInvestor = function(req, res){
		User.find(function(err, data){
			if(err){res.send(500, err);}
			res.send(data);
			return data;
		})
	};


exports.browseLocation = function(req, res){
    console.log(req.params.name);
      User.find({location: req.params.name}, function(err, data){
      if(err){res.send(500, err);}
      console.log(data);
      res.send(data);
      //return data;
    });
	};

exports.browseIndustry= function(req, res){

			User.find({industry: req.params.name}, function(err, data){
			if(err){res.send(500, err);}
			console.log(data);
			res.send(data);
			//return data;
		})

	};


exports.follow = function(req, res){

	User.update({username: req.params.id}, {$push: {follow_investor: {investor_company: req.params.name}}}, {upsert: true}, function(err, data){
		if(err){ res.send(500, err);}
		console.log('in success data  ' + data);
		res.send(data);
	});
};
