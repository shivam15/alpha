angular.module('blockchain').controller("manageAccountController", function($scope, $http,$cookies,$rootScope) {
	
	$scope.u;
	$scope.load = function(){
		$(document).ready(function (){
			$('.nav li').removeClass("active");
			$('.aboutLink').parent().addClass("active");
			
		});
		// $scope.showSubmit = true;
		// $scope.dis = {};
		// $scope.list = $http.get('http://localhost:8000/get_user');	
		// $scope.list.then(function(response){
		// 	$scope.products = response.data;
		// });
		// $scope.list1 = $http.get('http://localhost:8000/getVendorDiscount?vendor_id=' + $cookies.userId);	
		// $scope.list1.then(function(response){
		// 	$scope.discounts = response.data;
		// });
	};
	$scope.load();
	$scope.addUser = function() 
	{
		console.log($scope.u);
		$scope.u.password = "1234";
		$scope.u.confirm = "1234";
		$scope.u.username = "Shivam";
		$scope.showSubmit = false;
		$scope.list = $http.post('http://localhost:8000/blockTesting/',$scope.u);	
		$scope.list.then(function(response){
			$scope.response = response.data;
			$scope.hideloading();
			$scope.showSubmit = true;
		});
	}

	$scope.showDetailsDiscount = function(id) 
	{
		console.log(id);
		$scope.discountId = id;
		
	}

	$scope.deleteDiscount = function() 
	{
		$scope.showloading();
		console.log($scope.discountId.id);
		$scope.list = $http.delete('http://localhost:8000/discount/'+$scope.discountId.id);	
		$scope.list.then(function(response){
			$scope.response = response.data;
			$scope.hideloading();
			$scope.load();
		});
	}

	$scope.editDiscount = function() 
	{
		$scope.showloading();
		console.log($scope.discountId.id);
		$scope.list = $http.put('http://localhost:8000/discount/'+$scope.discountId.id,$scope.discountId);	
		$scope.list.then(function(response){
			$scope.response = response.data;
			$scope.hideloading();
			$scope.load();
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