angular.module('blockchain').controller("dashboardController", function($scope, $rootScope,$http,$cookies,$filter) {
	$scope.load = function(){
		$scope.username = $cookies.username;
		$scope.list = $http.get('http://localhost:8000/get_order_vendor?vendorId=' + $cookies.userId);  
		$scope.list.then(function(response){
			$scope.orders = response.data;
			var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		if(day<=9)
			day = "0"+day;

		if(month<10){
			$scope.date = year + "-0" + month + "-" + day;
			$scope.onemonthago = year + "-0" + (month-1) + "-" + day;
		}
		else if(month==10){
			$scope.date = year + "-" + month + "-" + day;
			$scope.onemonthago = year + "-0" + (month-1) + "-" + day;
		}
		else{
			$scope.date = year + "-" + month + "-" + day;
			$scope.onemonthago = year + "-" + (month-1) + "-" + day;
		}
		$scope.totalsales = 0;
		$scope.totalAmount = 0;
		$scope.actualPending = 0;
		$scope.actualCleared = 0;
		$scope.monthlysold = 0;
		$scope.monthlydamage = 0;
		$scope.monthlyBilling = 0;
		$scope.issues={};
		$scope.monthData = {};
		$scope.todayData = {};
		$scope.allData = {};
		var j=0;
		var x=0;
		var y=0;
		var k =0;
		for (var i = 0; i < $scope.orders.length; i++) 
		{
			$scope.billing = $http.get('http://localhost:8000/getBilling?orders_id=' + $scope.orders[i].id);
			$scope.billing.then(function(response)
			{
				$scope.billingDetails = response.data;
				if($scope.billingDetails.length>0)
				{
					$scope.allData[k++] = $scope.billingDetails[0];
					$scope.actualPending += Number($scope.billingDetails[0].amount_pending);
					$scope.actualCleared += Number($scope.billingDetails[0].amount_cleared);
					var dateObj = new Date($scope.billingDetails[0].date_created);
					var month = dateObj.getUTCMonth() + 1; //months from 1-12
					var day = dateObj.getUTCDate();
					var year = dateObj.getUTCFullYear();
					if(day<=9)
						day = "0"+day;
					var date;
					if(month<10)date = year + "-0" + month + "-" + day;
					else date = year + "-" + month + "-" + day;
					if(date==$scope.date)
					{
						$scope.totalAmount += Number(Number($scope.billingDetails[0].amount_cleared)+Number($scope.billingDetails[0].amount_pending)); 
						$scope.todayData[x++] = $scope.billingDetails[0];
					}
					if(date>$scope.onemonthago && date<=$scope.date)
					{
						if($scope.billingDetails[0].damaged ==0)
						{
							$scope.monthlysold += Number($scope.billingDetails[0].products_sold); 
							$scope.monthlyBilling += Number(Number($scope.billingDetails[0].amount_cleared)+Number($scope.billingDetails[0].amount_pending));
							$scope.monthData[y++] = $scope.billingDetails[0];
						}
						else
						{
							$scope.monthlydamage += Number($scope.billingDetails[0].products_sold); 
						}
					}
				}
			});
			$scope.issue = $http.get('http://localhost:8000/getIssues?orderId=' + $scope.orders[i].id);
			$scope.issue.then(function(response)
			{
				$scope.is = response.data;
				if($scope.is.length>0)
				{
					$scope.issues[j++] = $scope.is; 
				}
			});
			console.log($scope.orders[i].order_date);
			console.log($scope.date);
			if($scope.orders[i].order_date === $scope.date)
			{
				$scope.totalsales++;
			}
		}
		//$scope.hideloading();
	});
	};
	$scope.load();
	$scope.logout = function () 
	{
		$cookies.loggedIn = 'false';
		$cookies.user = ""
		$cookies.userId = ""
		$cookies.firstName = ""
		$cookies.lastName = ""
		$cookies.userEmail = ""
		$cookies.userpwd = ""
		window.location = '#/loginVendor';
		$scope.username = "";
		$scope.logged = false;
	};
})