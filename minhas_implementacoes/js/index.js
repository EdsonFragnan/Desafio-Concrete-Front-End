var app = angular.module('app', []);

app.controller('ctrl', function($scope, $http) {
    
    $scope.options = {
        sort: 'views'
    };
    
    $scope.shots = [];
    
    $scope.getShots = function() {
        var url = 'https://api.dribbble.com/v1/shots?access_token=ee1914ee47ff2dd03b342c66c1b26ab924d95765122eec30dadb56ef72a4a8cc';
        if($scope.options.sort) url += '&sort='+$scope.options.sort;
        
        $http.get(url)
        .success(function(data) {
            $scope.shots = data;
        });
    }
    
    $scope.$watchCollection('options', $scope.getShots);
    
});

