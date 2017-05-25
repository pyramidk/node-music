var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Songs = require('../models/songs');

var Verify = require('./verify');

var songRouter = express.Router();

// 将router response解析成json
songRouter.use(bodyParser.json());
songRouter.route('/')
// .all()

.get(function(req,res,next){
	
	Songs.find({})
		.populate('comments.postedBy')
		.exec(function (err, dish) {
			if (err) throw err;
			res.json(dish);
		});
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Songs.create(req.body, function (err, dish) {
		console.log('test');
		if (err) throw err;
		console.log('Dish created!');

		var id = dish._id;
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		res.end('Added the dish with id: ' + id);
	});

})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){

	Songs.findByIdAndRemove({}, function (err, resp) {
		if (err) throw err;
		res.json(resp);
	});

});

songRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	Songs.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function (err, dish) {
			if (err) throw err;
			res.json(dish);
		});
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Songs.findByIdAndUpdate(req.params.dishId, {
		$set: req.body
	}, {
		new: true
	}, function (err, dish) {
		if (err) throw err;
		res.json(dish);
	});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Songs.findByIdAndRemove(req.params.dishId, function (err, resp) {        
		if (err) throw err;
		res.json(resp);
	});
});


songRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
	Songs.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function (err, dish) {
			if (err) throw err;
			res.json(dish.comments);
		});
})

.post(function (req, res, next) {
	Songs.findById(req.params.dishId, function (err, dish) {
		if (err) throw err;

		req.body.postedBy = req.decoded._doc._id;

		dish.comments.push(req.body);
		dish.save(function (err, dish) {
			if (err) throw err;
			console.log('Updated Comments!');
			res.json(dish);
		});
	});
})

.delete(Verify.verifyAdmin, function (req, res, next) {
	Songs.findById(req.params.dishId, function (err, dish) {
		if (err) throw err;
		for (var i = (dish.comments.length - 1); i >= 0; i--) {
			dish.comments.id(dish.comments[i]._id).remove();
		}
		dish.save(function (err, result) {
			if (err) throw err;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Deleted all comments!');
		});
	});
});

songRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
	Songs.findById(req.params.dishId)
    .populate('comments.postedBy')
    .exec(function (err, dish) {
	    if (err) throw err;
	    res.json(dish.comments.id(req.params.commentId));
		})
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Songs.findById(req.params.dishId, function (err, dish) {
    	if (err) throw err;
    	dish.comments.id(req.params.commentId).remove();
    	dish.comments.push(req.body);
    	dish.save(function (err, dish) {
    		if (err) throw err;
    		console.log('Updated Comments!');
    		res.json(dish);
    	});
    });
  })

.delete(function (req, res, next) {
	Songs.findById(req.params.dishId, function (err, dish) {
		//
		if (dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
			var err = new Error('You are not authorized');
			err.status = 403;
			return next(err);
		}

		dish.comments.id(req.params.commentId).remove();
		dish.save(function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});
});
module.exports = songRouter;