// The Factory file communicates with the database and controllers.  It does not communicate with  html files.
// The functions herein will only be called by other controllers
// We need one Factory per object type that we wish to work with; in this case, one.

// Instantiate a factory with access to http and promise objects ($q is a promise)
angular.module('app').factory('AnimalFactory', function($http, $q) {
  var o = {};  // Create a factory object

// Declare the database url
  var firebase = 'https://animal-app.firebaseio.com/';

  o.getAllAnimals = function () { // Since we are requesting all data from the db, there is no need to pass anything into the function
    var q = $q.defer();  // Create a promise object.
    // Send an http request to the database and store the response in res
    $http.get(firebase + '.json').then(function(res) {
      var animals = [];  // Create an array to hold the objects we will be receiving from the database
      for(var prop in res.data) {  // Iterate thru the response and...
        res.data[prop]._id = prop;  // create an id property on our object and assign it the guid which is received as part of the object from the database
         // prop is the guid, and it will be available for us to use throughout the rest of our code
         animals.push(res.data[prop]); // Add an object from the response to the array
         // *** The id on the object and the array are only available on the HomeController who calls this function ***
      }
      q.resolve(animals);
    }, function(err) {
      q.reject(err);
    });
    return q.promise;
  }

  o.createAnimal = function(animal) {  // We are asking the db to create an object, and we are passing it the object that we need to create
    var q = $q.defer();
    $http.post(firebase + '.json', animal).then(function(res) {
      q.resolve();
    }, function(err) {
      q.reject();
    });
    return q.promise;
  };

o.getAnimalById = function(id) {
  var q = $q.defer();
  // uild the GET url request.  And ask the db to return only the object that matches the id we are passing into the function
  $http.get(firebase + id + '/.json').then(function(res) {
    q.resolve(res.data);
  }, function(err) {
    q.reject(err);
  });
  return q.promise;
};

o.editAnimal = function(animal, id) {
  var q = $q.defer();
  // Issue a PUT request to the db whenever we wish to modify an object.
  $http.put(firebase + id +'/.json', animal).then(function(res) {
    q.resolve();
}, function(err) {
  q.reject();
});
return q.promise;
};

o.deleteAnimal = function(objectGuid) {
  var q = $q.defer();
  $http.delete(firebase + objectGuid + '/.json' ).then(function(res) {
    q.resolve();
  }, function(err) {
    q.reject();
  });
  return q.promise;
};

return o; // The factory always needs to return itself as an object
});
