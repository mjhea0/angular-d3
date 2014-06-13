'use strict';

angular.module('DataVisualizationApp')
  .controller('MainCtrl', function ($scope, $timeout, dataService) {
	updateData(); 	
 	function updateData(){
 		$scope.barChartData = dataService.getBarChartData();
 		$timeout(function() {
 			updateData();
 		}, 2000);
 	}
  });
