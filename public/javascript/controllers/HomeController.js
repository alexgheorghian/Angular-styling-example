
// Declare the controller and pass in the factory object which we will be working with.
// 99% of the time, a Controller is the middleman between a Factory and an html file, thus we will need to pass in the Factory object it needs to talk with
angular.module('app').controller('HomeController', function(AnimalFactory) {
  var vm = this;  // vm is the equivalent of $scope and is available in home.html
  vm.animals = [];  // Declare an empty array of animal objects
  AnimalFactory.getAllAnimals().then(function(animals) {  // Ask the Factory to give us all the animals and store the response in animals array
    vm.animals = animals;  // Make the animals available to the home.html file as an array to iterate thru
    console.log(animals);
  }, function(errRes) {

  });

// This function will be called from within home.html with 2 arguments.  Then in turn, it calls
// deleteAnimal within the Factory
vm.deleteAnimal = function(animalId, arrayIndex) {
  console.log(animalId, arrayIndex);
  AnimalFactory.deleteAnimal(animalId).then(function() {
     vm.animals.splice(arrayIndex, 1);
  })
};

});
