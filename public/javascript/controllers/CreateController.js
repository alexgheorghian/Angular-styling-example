
angular.module('app').controller('CreateController', function(AnimalFactory, $state) {
  var vm = this;  // A vm / $scope is always created in the controller in order to make the info on the vm available in the corresponding html file.
  vm.animal = {}

  vm.createAnimal = function() {
    vm.isDisabled = true;
    AnimalFactory.createAnimal(vm.animal).then(function() {
      $state.go('Home'); // After an animal has been created, navigate to Home
    }, function() {
        alert('oops');
    });
  };
});
