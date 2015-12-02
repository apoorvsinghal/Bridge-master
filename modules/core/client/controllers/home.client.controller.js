'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','$rootScope', '$http', '$location',
  function ($scope, Authentication, $rootScope, $http, $location) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $rootScope.current_user_banner = "";
    //$scope.editProfile = {firstName: '',bannerImageURL: ''};
    $rootScope.value="";
    $rootScope.name="";
    $rootScope.city="";
    console.log('in home controller');

$scope.there = function() {
  console.log('there');
}
        /* browse functions from home page  */

      $scope.browse_delhi = function() {

        $rootScope.city = "Delhi";
        $http.get('/api/core/browseLocation/' + 'Delhi').success(function(response){
          $rootScope.value = response;
          $rootScope.name = "location Delhi";
          $location.path('browse');
        })
      }

    $scope.browse_noida = function() {
        $http.get('/api/core/browseLocation/' + 'Noida').success(function(response){
          $rootScope.value = response;
          $rootScope.name = "location Noida";
          $location.path('browse');
        })
      }

      $scope.browse_mumbai = function() {
        $http.get('/api/core/browseLocation/' + 'Mumbai').success(function(response){
          $rootScope.value = response;
          $rootScope.name = "location Mumbai";
          $location.path('browse');
        })
      }

      $scope.browse_bangalore = function() {
        $http.get('/api/core/browseLocation/' + 'Bangalore').success(function(response){
          $rootScope.value = response;
          $rootScope.name = "location Bangalore";
          $location.path('browse');
        })
      }

      $scope.browse_web = function() {
        $http.get('/api/core/browseLocation/' + 'Web Services').success(function(response){
          $rootScope.value = response;
          $rootScope.name = "Web Services industry";
          $location.path('browse');
        })
      }

      $scope.browse_food = function() {
        $http.get('/api/core/browseLocation/' + 'Food Services').success(function(response){
          $rootScope.value = response;
          $rootScope.name = "Food Services industry";
          $location.path('browse');
        })
      }

      $scope.browse_health = function() {
          $http.get('/api/core/browseLocation/' + 'Health Services').success(function(response){
            $rootScope.value = response;
            $rootScope.name = "Health Services industry";
            $location.path('browse');
          })
        }
        $scope.browse_education = function() {
            $http.get('/api/core/browseLocation/' + 'Educational Services').success(function(response){
              $rootScope.value = response;
              $rootScope.name = "Educational Services industry";
              $location.path('browse');
            })
          }

          $scope.browse_finance = function() {
              $http.get('/api/core/browseLocation/' + 'Financial Services').success(function(response){
                $rootScope.value = response;
                $rootScope.name = "Financial Services industry";
                $location.path('browse');
              })
            }
          $scope.browse_it = function() {
              $http.get('/api/core/browseLocation/' + 'IT Services').success(function(response){
                $rootScope.value = response;
                $rootScope.name = "IT Services industry";
                $location.path('browse');
              })
            }
        $scope.browse_business = function() {
            $http.get('/api/core/browseLocation/' + 'Business Services').success(function(response){
              $rootScope.value = response;
              $rootScope.name = "Business Services industry";
              $location.path('browse');
            })
          }

      $scope.browse_consumer = function() {
          $http.get('/api/core/browseLocation/' + 'Consumer Services').success(function(response){
            $rootScope.value = response;
            $rootScope.name = "Consumer Services industry";
            $location.path('browse');
          })
        }

      $scope.browse_media = function() {
          $http.get('/api/core/browseIndustry/' + 'Media Services').success(function(response){
            $rootScope.value = response;
            $rootScope.name = "Media Services industry";
            $location.path('browse');
          })
        }

  }
]).controller('editCompanyProfileController', ['$scope','$timeout', '$window', 'Authentication','FileUploader', '$http', '$rootScope', '$modal',
  function ($scope, $timeout, $window, Authentication, FileUploader, $http, $rootScope, $modal ) {
    // This provides Authentication context.
    $scope.editProfile = Authentication.editProfile;
    $scope.editProfile = {firstName: '',bannerImageURL: '', videoURL: ''};
    $scope.bannerImageURL = $scope.editProfile.bannerImageURL;
   // $scope.videoURL = $scope.editProfile.videoURL;

    // $rootScope.current_user_banner = $scope.editProfile.bannerImageURL;
    // $scope.bannerimageURL = $rootScope.current_user_banner;

    console.log($rootScope.current_user_banner);


    $scope.showCreateModal = function () {

		$scope.createModal = $modal({
			scope: $scope,
			template: '/templates/modal.create.tpl.html',
			show: true
		});
  }
    $scope.editProfile = function() {
      $http.post('/api/core/editProfile' , $scope.editProfile).success(function(data){
          if(data.state == 'success'){
            console.log('in success state');
            $location.path('home.profile');
          }
      });
    }
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: '/api/core/uploadBanner'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|mp4|avi|webm|flv'.indexOf(type) !== -1;
      }
    });

    // Called after the editProfile selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.bannerImageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the editProfile has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      console.log(response);
        // Populate editProfile object
      $scope.editProfile = Authentication.editProfile = response;

      // Clear upload buttons
    //  $scope.cancelUpload();
    };

    // Called after the editProfile has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
    //  $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change editProfile profile picture
    $scope.uploadBanner = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };
    // $scope.uploader = new FileUploader({
    //   url: 'api/core/uploadVideo'
    // });
    // //
    // $scope.uploadVideo = function() {
    //   console.log('hello upload');
    //   $scope.success = $scope.error = null;

    //   // Start upload
    //   $scope.uploader.uploadAll();

      // $http.post('/api/core/uploadVideo' , $scope.editProfile).success(function(data){
      //     if(data.state == 'success'){
      //       console.log('in success state');
      //       $location.path('home.profile');
      //     }
      // });
    

}
]).controller('BrowseController', ['$scope', '$rootScope', '$location', '$http','Authentication',
  function ($scope, $rootScope, $location, $http, Authentication) {
      $scope.authentication = Authentication;


      $scope.init = function() {
          $scope.startups = $rootScope.value;
          $scope.id = $rootScope.name;
          $scope.companies = $rootScope.value;

        }

        $scope.init();

      $scope.browse = function() {

        switch($scope.browse_by) {

          case 'startups' :

              console.log('hello');

              $http.get('/api/core/browseStartup').success(function(response){
                $rootScope.value = response;
                $rootScope.name = "Enterpreneurs";
                //console.log(response);
                //$location.path('/browse_startup');
                $scope.init();
              }).error(function(response){
                console.log(response);
              })
              break;
          case 'investors' :
            $http.get('/api/core/browseInvestor').success(function(response){
              $rootScope.value = response;
              $rootScope.name = "Investing Organizations";
              $scope.init();
            })
            break;

          case '' :

          $http.get('/api/core/browseStartup').success(function(response){
            $rootScope.value = response;
            $rootScope.name = "Enterpreneurs";
            //$location.path('/browse_startup');
            $scope.init();
          })
          break;


        }
      }


      $scope.location_browse = function() {

        $http.get('/api/core/browseLocation/' + $scope.location).success(function(response){
          $rootScope.value = response;
          $rootScope.name = "location" + $scope.location;
          $scope.init();
        });


      }

    $scope.industry_browse = function() {

      $http.get('/api/core/browseIndustry/' + $scope.industry).success(function(response){
        $rootScope.value = response;
        $rootScope.name = "Industry" + $scope.industry;
        $scope.init();
      });


    }


    $scope.search = function(id){

      console.log('search particular');
      //only investor has url
        $http.get('/api/core/browse_Startup/' + id).success(function(response){
          $rootScope.value = response;
          $rootScope.name = id;
          $location.path('browse_startup');
      //    $scope.init();
        })

      }


    $scope.follow = function() {

        $http.get('/api/core/follow/' + $rootScope.name +'/'+ $scope.authentication.user.username).success(function(data){
          console.log('in minorApp');
          $scope.id = "Following";
          $location.path('browse_startup');
        });



    }






  }

]);
