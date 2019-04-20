var app = angular.module('blockchain').controller("buyCattleController", function($scope, $http,$cookies,$rootScope,$route) {
	
	$scope.load = function()
	{
		$(document).ready(function (){
			$('.nav li').removeClass("active");
			$('.aboutLink').parent().addClass("active");
			
		});
		$scope.list = $http.get('http://localhost:8000/get_product_vendor?vendorId=' + $cookies.userId);	
		$scope.list.then(function(response){
      $scope.products = response.data;
      $scope.productCopy = angular.copy($scope.products);
    });
   $scope.category = $http.get('http://localhost:8000/getParentCategory');	
   $scope.category.then(function(response){
    $scope.category = response.data;
    $scope.payment_mode = ['Debit','Credit','Cod','Wallets','Cheque','Draft'];
    $scope.p={};
    $scope.p.payment_cheque = "false";
    $scope.p.payment_e = "false";
    $scope.p.payment_draft = "false";
    $scope.p.payment_credit = "false";
    $scope.p.payment_debit = "false";
    $scope.p.payment_cod = "false";
  });
   $scope.default = "All Products";
 };

 $scope.navigateProd = function(id) 
 {
  $rootScope.productDetails = $scope.products[id];
  window.location = "#/productDesc";
}

$scope.getChild = function() 
{
  $scope.subcategory = [];
  $scope.subcat = $http.get('http://localhost:8000/getChildCategory?pid='+$scope.p.category_id);  
   $scope.subcat.then(function(response){
    $scope.subcategory = response.data;
  });
}

$scope.uploadFiles = function () {
  console.log($scope.myFile);
  $scope.files = $scope.myFile;
  if (files && files.length) {
    console.log("hello");
    Upload.upload({
      url: '/blockchain-backend/assets/',
      data: {
        files: files
      }
    }).then(function (response) {
      $timeout(function () {
        $scope.result = response.data;
      });
    }, function (response) {
      if (response.status > 0) {
        $scope.errorMsg = response.status + ': ' + response.data;
      }
    }, function (evt) {
      $scope.progress = 
      Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  }
};

$scope.filterData = function(id,index)
{
  if(id==0)
  {
    $scope.products = angular.copy($scope.productCopy);
    $scope.default = "All Products";
    return;
  }
  $scope.dup = {};
  for (var i = 0; i < $scope.productCopy.length; i++) 
  {
   if($scope.productCopy[i].category==id)
   {
    $scope.dup[i] = $scope.productCopy[i];
  }
}
$scope.default = $scope.category[index].category_name;
$scope.products = angular.copy($scope.dup);
}
$scope.load();
$scope.submitPro = function()
{
  $scope.showloading();
		//console.log($scope.p);
		$scope.p.vendor_id = $cookies.userId;
		$scope.p.items_remaining = $scope.p.product_quantity;
    $scope.p.product_image_1 = $cookies.imageName1;
    $scope.p.product_image_2 = $cookies.imageName2;
    $scope.p.product_image_3 = $cookies.imageName3;
    $scope.p.product_image_4 = $cookies.imageName4;
    $scope.p.dispatch = "1";
    $scope.p.availability= "1";
    $scope.p.payment_cheque = $scope.p.payment_cheque.toString();
    $scope.p.payment_e = $scope.p.payment_e.toString();
    $scope.p.payment_draft = $scope.p.payment_draft.toString();
    $scope.p.payment_credit = $scope.p.payment_credit.toString();
    $scope.p.payment_debit = $scope.p.payment_debit.toString();
    $scope.p.payment_cod = $scope.p.payment_cod.toString();
    $scope.res = $http.post('http://localhost:8000/add_product', $scope.p);
    $scope.res.then(function successCallback(response){
      $scope.da = response.data;
      $scope.p = {};
      $scope.hideloading();
      $scope.success = "Sucessfully Added!!!";
      $cookies.imageName1 = "";
      $cookies.imageName2 = "";
      $cookies.imageName3 = "";
      $cookies.imageName4 = "";
      $route.reload();
    },function errorCallback(response) {
      $scope.hideloading();
      $scope.error = "Some Error Occured!!! Make sure all fields are properly filled or refresh page and try again";
      $cookies.imageName1 = "";
      $cookies.imageName2 = "";
      $cookies.imageName3 = "";
      $cookies.imageName4 = "";
      //$route.reload();
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
 };
 $scope.productDescription = function(id) {
    $rootScope.productDetails = $scope.products[id];
    window.open('#/productDescription/' + id, '_blank');
  };

});