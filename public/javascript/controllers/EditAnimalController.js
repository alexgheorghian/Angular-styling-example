// Why is this a self invoking controller function???????????????????????????????????????????

(function() {  // Immediately invoked function expression.  Prevents variables from leaking out into the global scope.
  'use strict';
   angular.module('app').controller('EditAnimalController', function(AnimalFactory, $state, $stateParams, $mdToast) {
// $state is used to take us to another page.  $stateParams is used to get route parameters which are passed into the url in home.html
var vm = this;
var guid = $stateParams.whatever;
if(!guid) {
  $mdToast.show(
    $mdToast.simple()
    .content('Redirecting to the home page.')
    .position('top right')
    .hideDelay(2250)
  );
  $state.go('Home');
}
//  How come we don't have a function called vm.displayAnimalToEdit(id) function?
// It would call the function below.
AnimalFactory.getAnimalById(guid).then(function(res){
  // res will be null if the animal can't be found

if(res) vm.animal = res;  // display the animal
else {  // res = null.  Means the object can't be found
$mdToast.show(
  $mdToast.simple()
  .content('Redirecting to the home page.')
  .position('top right')
  .hideDelay(2250)
);
$state.go('Home');
}

}, function() {  // a function() as a 2nd argument is intended to catch an error
  $mdToast.show(
  $mdToast.simple()
  .content('Could not get the animal from the database.')
  .position('top right')
  .hideDelay(2000)
);
}); // end of editAnimalById

// This function is called when the Save edits button is pressed
vm.editAnimal = function() {
  AnimalFactory.editAnimal(vm.animal, guid).then(function() {
    $mdToast.show(
    $mdToast.simple()
    .content('Your changes have been saved.')
    .position('top right')
    .hideDelay(2000)
)
$state.go('Home')
  }, function() {  // a function() as a 2nd argument is intended to catch an error
    $mdToast.show(
    $mdToast.simple()
    .content('Could not save changes.')
    .position('top right')
    .hideDelay(2000)
)
});    // end then
};     // end editAnimal
});    // end of controller
})();  // the () indicates that this is a self calling function.
