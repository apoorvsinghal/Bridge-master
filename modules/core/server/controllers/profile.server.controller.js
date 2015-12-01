var mongoose = require('mongoose');
var editProfile = mongoose.model('Profile');
var fs = require('fs');
var User = mongoose.model('User');

var _ = require('lodash');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);


exports.editProfile = function(req, res){

			var newProfile = new editProfile();
			//newProfile.name = req.body.text;
			console.log('in editProfile func ' + req.body);
			newProfile.firstName = req.body.email;
			newProfile.save(function(err, newProfile) {
					if (err){

							return res.send(500, err);
					}
					console.log('successfully edited profile');
					//return res.json(newProfile);
				 res.send({state: 'success', newProfile: newProfile || null});
			});
		};

exports.editBanner = function (req, res) {
			//var profile = new editProfile();
			var profile = new editProfile();
		  var message = null;
			console.log('in profile api function');

		  if (profile) {
				console.log('in profile accepted');
		    fs.writeFile('./modules/core/client/img/banner/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
		      if (uploadError) {
		        return res.status(400).send({
		          message: 'Error occurred while uploading profile picture'
		        });
		      } else {
		        profile.bannerImageURL = 'modules/core/client/img/banner/uploads/' + req.files.file.name;
						console.log('image uploaded');

						profile.save(function (saveError) {
		          if (saveError) {
		            return res.status(400).send({
		              message: errorHandler.getErrorMessage(saveError)
		            });
		          } else {
								console.log('image saved');
								res.send(profile);
		            // req.login(user, function (err) {
		            //   if (err) {
		            //     res.status(400).send(err);
		            //   } else {
		            //     res.json(user);
		            //   }
		             //});
		          }
		        });
		      }
		    });
		  } else {
		    res.status(400).send({
		      message: 'User is not signed in'
		    });
		  }
};

exports.uploadVideo = function(req, res) {
	var profile = new editProfile();
	var message = null;
	console.log('in video api function');

	if (profile) {
		console.log('in video accepted');
		fs.writeFile('./uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
			if (uploadError) {
				return res.status(400).send({
					message: 'Error occurred while uploading profile picture'
				});
			} else {
				profile.bannerImageURL = '/uploads/' + req.files.file.name;
				console.log('video uploaded');

				profile.save(function (saveError) {
					if (saveError) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(saveError)
						});
					} else {
						console.log('image saved');
						res.send(profile);
						// req.login(user, function (err) {
						//   if (err) {
						//     res.status(400).send(err);
						//   } else {
						//     res.json(user);
						//   }
						 //});
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}


	//console.log(req.files);
	// console.log('in uploadVideo func server');
	// console.log(req.files.filefield);
	//     	var part = req.files.filefield;
  //       var writeStream = gfs.createWriteStream({
  //             filename: part.name,
	// 						mode: 'w',
  //             content_type:part.mimetype
  //         });
	//
  //         writeStream.on('close', function() {
  //              return res.status(200).send({
	// 							 message: 'Success'
	// 						 });
  //         });
	//
  //         writeStream.write(part.data);
	//
  //         writeStream.end();

};

// exports.uploadVideo = function(req, res) {
// 	console.log('in upload video');
// }
//
// exports.streamVideo = function(req, res) {
//
// 	gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
//
//  	    if(files.length===0){
// 			return res.status(400).send({
// 				message: 'File not found'
// 			});
//  	    }
//
// 		res.writeHead(200, {'Content-Type': files[0].contentType});
//
// 		var readstream = gfs.createReadStream({
// 			  filename: files[0].filename
// 		});
//
// 	    readstream.on('data', function(data) {
// 	        res.write(data);
// 	    });
//
// 	    readstream.on('end', function() {
// 	        res.end();
// 	    });
//
// 		readstream.on('error', function (err) {
// 		  console.log('An error occurred!', err);
// 		  throw err;
// 		});
// 	});
//
// };
