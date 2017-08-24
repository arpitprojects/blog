blog.controller('indexController' , ['$scope','$rootScope','$http' ,'$sce', function($scope ,$rootScope, $http){
    $scope.title = "Blog";

}]);

blog.controller('adminController' , ['$scope','$rootScope','$http' ,'$sce' ,'$log' , function($scope ,$rootScope, $http , $sce , $log){
    $scope.submit = function(email , password){
        
        var login_fields = {
            "email" : email , 
            "password" : password
        }
        $scope.login_fields = login_fields;
        if(email !== "" && password !== ""){
            
            $http.post('/admin-login' , $scope.login_fields).then(function(data){
                    if(data.data == "Success"){
                        window.location.href="#/admin-panel";
                    }
                }, function(data){
                    console.error(data);
            });
        }else{
            Materialize.toast('Please correctly fill the admin details', 4000)
        }
    }
}]) 


blog.controller('postController' , ['$scope','$rootScope','$http' ,'$sce', function($scope ,$rootScope, $http){
    $scope.title = "View Post";

}]);

blog.controller('adminPanelController' , ['$scope','$rootScope','$http' ,'$sce', function($scope ,$rootScope, $http , $sce){
    $scope.title = "Fill the posts";
    $http.get('/admin-panel').then(function(data){
        console.log('You are not authorized right now!');
    } , function(data){
        console.log('Error collecting the get protocol');
    })

}])