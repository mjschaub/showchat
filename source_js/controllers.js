var myApp      = angular.module('myApp', []);
var theaterApp = angular.module('theaterApp', ['moment-picker']);
var postApp    = angular.module('postApp', []);
var info = document.getElementById('mapInfo');

myApp.controller('movieSearchApp', ['$scope', '$http', '$window', function($scope, $http, $window) {
    //console.log('myApp.controller hello');

    $scope.search = function(){
        console.log('in the search function');
        $http.post('/search/movieFile', $scope.movie).success(function(results){
            $scope.movielist = results;
        }).error(function(results){
            alert("You must enter a title");
        });
    };

    $scope.data = {model: null,
                   availableOptions: [
                     {id: '1', name: "episode"},
                     {id: '2', name: "movie"},
                     {id: '3', name: "tv mini series"},
                     {id: '4', name: "tv movie"},
                     {id: '5', name: "tv series"},
                     {id: '6', name: "video game"},
                     {id: '7', name: "video movie"}
                  ]
                };
    }]);

theaterApp.controller('theaterSearchController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    console.log('theaterSearchController');
    $scope.options = function(){
        console.log("starting options");
        $http.get('/theater/recentMovies').success(function(results){
            console.log("results: ",results);
            $scope.movieList = results;
            return results;
        }).error(function(results){
            console.log("This shouldn't really happen");
            return 0;
        });
    };
    $scope.SearchMovieNearby = function(){
        console.log('in SearchMovieNearby');
        var movieName = $scope.MovieName;
        var address   = $scope.Address;
        //var genre     = $scope.Genre;
        $http.post('/theater/search',
        {
            movieName: movieName,
            address: address,
            // genre: genre
        }).success(function(results){
            console.log("yoooo", results);
            $scope.tlist = results;
            initialLocation = 'place_id:'+results.initialLocation;
            theaterLocation = 'place_id:'+results.theaterLocation;
            console.log("initialLocation", initialLocation);
            console.log("theaterLocation", theaterLocation);
            var url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBkrymcokjrHuRvMa5EIcmrOsVqFlmMLGw&origin="+initialLocation+"&destination="+theaterLocation;
            document.getElementById("map").setAttribute("src", url);
        });
    };

    $scope.logStuff = function(){
        console.log("feedback given");
    };
}]);

postApp.controller('postCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
	$http.get('/postlist/data').success(function(results){
		$scope.postlist=results;
	});

	$scope.createPost = function(){
		$http.post('/postlist/data', $scope.post);
		$window.location.reload();
	};
    
    $scope.deletePost = function(PostContent){
		$http.post('/postlist/deletePost', {
           PostContent: PostContent
        });
		$window.location.reload();
	};

    $scope.like = function(PostContent, Likes){
		$http.post('/postlist/like', {
           PostContent: PostContent,
           Likes: Likes
        });
		$window.location.reload();
	};
}]);

myApp.controller('loginApp', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.login1 = function(){
        console.log('in the login function');
        $http.post('/login/loginUser', $scope.user).success(function(results){
          
                $window.location.href=('/index.html');
        })
        .error(function(results){
           
                alert("Please enter correct email and password.");
        });
    };

    $scope.signup1 = function(){
        console.log('in the signup function');
        $http.post('/signup/signupUser', $scope.user).success(function(results){
            $window.location.href=('/login.html');
            
        })
         .error(function(results){
            alert("Incorrect signup form(username already taken or wrong email format)");
        });
    };

    $scope.moveToSignUp= function(){
        $window.location.href=('/signup');
    };

    $scope.moveToLogin= function(){
        $window.location.href=('/login');
    };
    
 }]);

myApp.controller('twitterApp', ['$scope', '$http', '$window', function($scope, $http, $window) {
    
    $scope.getTweets = function(){
        console.log('in the tweets function');
        $http.post('/twitter/refreshTrends').success(function(results){
            console.log('results: ', results.currMovies);
            
            $scope.tweetlist = results.currMovies;
            //$window.location.reload();
        })
        .error(function(results){
            alert("no trending movies at the moment.");

        });
    }

}]);


//movieSearchApp.controller('AppCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
//	console.log("hello");
//	$http.get('/movieList').success(function(results){
//		$scope.contactlist=results;
//	});
//	// $scope.addContact = function(){
//	// 	$http.post('/contactlist', $scope.contact);
//    //     $window.location.reload();
//	// };
//}]);

//
