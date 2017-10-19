angular.module('starter.controllers', [])


.controller('ScrollCtrl', function($scope, $ionicScrollDelegate) {
  $scope.data = {
    title : ""
  };
  $scope.onComplete = function() {    
    var scrollTop = $ionicScrollDelegate.getScrollPosition().top;        
    if (($(window).height() - scrollTop) < 300){
        loadMore();
    }    
    
  };
  
})


.controller('NavCtrl', function($scope, $location, $ionicHistory, $state){
        $scope.myGoBack = function() {
           $backView = $ionicHistory.backView();
           if ($backView != null){
               $backView.go();
           } else {
               $location.path('tab.home');
           }
        };
        $scope.go = function ( path ) {
	       $location.path( path );
        };
        
        
});

