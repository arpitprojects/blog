
blog.config(function($stateProvider, $urlRouterProvider , $locationProvider) {

    $urlRouterProvider.otherwise('/');

   $stateProvider.state('home', {
        url: '/',
        templateUrl : '/public/posts.html',
        controller : 'indexController'
    })
    .state('admin', {
        url: '/admin',
        templateUrl : '/admin/index.html',
        controller : 'adminController'
    }).state('admin-panel', {
        url: '/admin-panel',
        templateUrl : '/admin/fill_posts.html',
        controller : 'adminPanelController'
    })
    .state('post', {
        url: '/post',
        templateUrl : '/public/view_post.html',
        controller : 'postController'
    })
    $locationProvider.hashPrefix('');
});