// The app.js file is like the main() function of a javascript application
// Connects a Controller with its corresponding html file.

(function() {
angular.module('app', ['ngMaterial', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {   // ??? What do these parameters do ??????

$stateProvider.state('Home', {                    // What is $stateProvider ???
  url: '/', // if someone goes to this url, go to that state
  templateUrl: '/templates/home.html',
  controller: 'HomeController as vm'
})

.state('Create', {
  url: '/Create',
  templateUrl: '/templates/create.html',
  controller: 'CreateController as vm'
})

.state('EditAnimal', {
  url: '/Animal/Edit/:whatever',   // the colon indicates a variable called whatever
  templateUrl: 'templates/edit_animal.html',
  controller: 'EditAnimalController as vm'
})

.state('404', {
  url:'/404',
  templateUrl: 'templates/404.html'
});

$urlRouterProvider.otherwise('/404')                  // What is $urlRouterProvider ???

});
})();  // The () indicates this is a self calling function
