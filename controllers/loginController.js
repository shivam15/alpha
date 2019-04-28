angular.module('blockchain',[ 'ngCookies']).controller("loginController", function($scope, $http,$cookies) {
	($cookies.loggedIn == 'false' || $cookies.loggedIn == undefined)? $scope.logged = false : $scope.logged = true;
	if($scope.logged){
		$scope.username = $cookies.userName;
	}
	$scope.checkbox = false;
	$scope.checkbox_rec = false;
    $scope.test = function() 
	{
		data = {};
		data.message = 'This is test message';
		data.subject = 'testing'
		data.to = 'shivam.sarawagi68@gmail.com';
		$scope.list = $http.post('http://localhost:8000/sendEmail/',data); 
		$scope.list.then(function(response){

		});
	}
	$scope.loginVendor = function() {
		//console.log($scope.userName);
		if ($scope.userName) {
			$scope.showloading();
			var promise = $http.get('http://localhost:8000/get_admin?email=' + $scope.userName + '&pwd=' + $scope.password);
			promise.then(
				function(payload) {
					$scope.hideloading();
					console.log(payload.data)
					if(payload.data.length == 0){	
						$scope.error = 'Please Enter valid credentials';
					}else{
						$cookies.loggedIn = 'true';
					$cookies.user = JSON.stringify(payload.data[0]);//json decode
					$cookies.userId = payload.data[0].id.toString();
					$cookies.username = payload.data[0].username.toString();
					$scope.logged = true;
					window.location = "#/";
					location.reload;
				}
				});

		}else{
			$scope.error = 'Please enter your credentials!';
		}
	};
	$scope.load = function(){
		$(document).ready(function (){
			$('.nav li').removeClass("active");
			$('.aboutLink').parent().addClass("active");
			
		});
	};
	$scope.load();
    $scope.checkbox_rec = false;
	$scope.createAccVendor = function()
	{
		$scope.showloading();
		$scope.user.active = 1;
		if($scope.checkbox==true)
		{
            $scope.user.gst_number = 0;
		}
		if($scope.checkbox_rec == true)
		{
			$scope.user.gst_number = 15;
		}
		else
		{
			if($scope.user.gst_number ==" " || $scope.user.gst_number =="" || $scope.user.gst_number== undefined)
			{
				$scope.hideloading();
				return;
			}
		}
		$scope.user.unique_code = "SN"+(Math.floor(Math.random()*90000) + 10000);
		$scope.list = $http.post('http://localhost:8000/vendor/',$scope.user);	
		$scope.list.then(function successCallback(response){
			$scope.userData = response.data;
			$scope.hideloading();
			$scope.user = {};
			$scope.error_1 = "Account Created Successfully";
		},function errorCallback(response) {
            $scope.hideloading();
            $scope.error_1 = "Error Occured";
		});
	}
	$scope.showloading = function () 
	{
		var loading = angular.element( document.querySelector( '#divLoading'));
		loading.addClass("show");
	}
	$scope.hideloading = function () 
	{
		var loading = angular.element( document.querySelector( '#divLoading'));
		loading.removeClass("show");
	}
	
})