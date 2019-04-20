angular.module('blockchain').controller("manageCattlesController", function($scope, $http,$cookies,$rootScope) {
	
	$scope.load = function(){
		$(document).ready(function (){
			$('.nav li').removeClass("active");
			$('.aboutLink').parent().addClass("active");
			
		});
		$scope.showSubmit = true;
		$scope.dis = {};
		$scope.list = $http.get('http://localhost:8000/get_product_vendor?vendorId=' + $cookies.userId);	
		$scope.list.then(function(response){
			$scope.products = response.data;
		});
		$scope.list1 = $http.get('http://localhost:8000/getVendorDiscount?vendor_id=' + $cookies.userId);	
		$scope.list1.then(function(response){
			$scope.discounts = response.data;
		});
	};
	$scope.load();
	$scope.addCattle = function() 
	{
		$scope.showloading();
		$scope.showSubmit = false;
		$scope.dis.vendor_id = $cookies.userId;
		$scope.list = $http.post('http://localhost:8000/discount/',$scope.dis);	
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