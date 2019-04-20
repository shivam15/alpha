

angular.module('blockchain').controller("leftMenuBarController", function($scope, $http) {
	
	$scope.load = function(){
		$(document).ready(function (){
			$('.nav li').removeClass("active");
			$('.aboutLink').parent().addClass("active");
			
		});
	};
	$scope.load();
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