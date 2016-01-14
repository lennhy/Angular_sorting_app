//ANGULARJS MODULE FOR WEB APP

var articlesApp= angular.module('articlesApp', []);  

//LOOP FUNCTION

articlesApp.filter('formatDate', function(){
	return function ( formatDate ) {//==============================Create custom filter to display date in more readable format 
	var dateOfPost= new Date(formatDate.substring(0, 10)).toString().substring(0,16); //Loop thrugh the JSON file and only use the first 10 items in the array object for the date
							return dateOfPost; 
	}
});	


//CONTROLLER

//==============================================================================Get request for the first JSON file
//==============================================================================Controls the html in the body that is produced by the http service
articlesApp.controller('MainController', ['$scope', '$http', function($scope, $http) {//Set the display limit for the items from the JSON file to 10  
	$scope.limit = 10;			 
	$scope.loadedMore = false;

//HTTP SERVICE

	$http.get('js/data/articles.json').success(function(data) {
	  $scope.articles = data;   //==================Save the data from the JSON file in a variable and attach it to the scope to use in the html
	
		$scope.loadMore = function(){
			$scope.limit += 10;     //========================Load 10 at a time from the new JSON file
			// console.log(data.length, $scope.articles.length);
			
		   	if( $scope.limit > $scope.articles.length && $scope.loadedMore === false ){ //===========If all the items in the first JSON file is loaded then load from the second JSON file.
		   		// console.log($scope.articles); 
				$http.get('js/data/more-articles.json').success(function(moreData){
					$scope.articles = $scope.articles.concat(moreData);
				});
				$scope.loadedMore = true;
		  	}
		}
    });
}]);

