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

.controller('TabCtrl', function($scope){
    if (localStorage.getItem('language') == 'kh'){
        $scope.home = 'ទំព័រដើម';
        $scope.search = 'ស្វែងរក';
        $scope.cart = 'កន្ត្រកទំនិញ';
        $scope.my_account = 'គណនី';
        $scope.more = 'ផ្សេងទៀត';
    } else {
        $scope.home = 'Home';
        $scope.search = 'Search';
        $scope.cart = 'Cart';
        $scope.my_account = 'My Account';
        $scope.more = 'More';
    }
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
        $scope.refresh = function (page) {
            if (page == 'order_list'){
                loadOrderList('');
            } else if (page == 'order'){
                loadOrder('refresh');
            }
            $scope.$broadcast('scroll.refreshComplete');
        }
        
});

