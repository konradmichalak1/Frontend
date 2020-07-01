var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};

  $scope.title = "";
  $scope.allTodos = []
  $scope.selectedTab = 'all';

  // when landing on the page, get all todos and show them
  $scope.getTodo = function(){
    $http
    .get("/api/todos")
    .success(function(data) {
      $scope.allTodos = data;
      $scope.selectTab($scope.selectedTab);
    })
    .error(function(data) {
      console.log("Error: " + data);
    });
  }();
    
  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        $("input").val("");
        $scope.allTodos = data;
        $scope.selectTab($scope.selectedTab);
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(id) {
    let todo = $scope.allTodos.find(x =>x._id === id);
    $http
      .put("/api/todos/"+id, todo)
      .success(function(data){
        $scope.allTodos = data;
        $scope.selectTab($scope.selectedTab);
      })
      .error(function(data){
        console.log("Error: "+data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.allTodos = data;
        $scope.selectTab($scope.selectedTab);
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
  $scope.editButton = function(id,editing){
    if(editing){
      $scope.updateTodo(id);
      editing=false;
    }else{
      editing=true;
    }
    return editing;
}
  $scope.selectTab = function(type){
    $scope.selectedTab = type;
    switch(type){
      case 'all':
        $scope.todos= [...$scope.allTodos];
        $scope.title = "all";
        break;
      case 'todo':
        $scope.todos= $scope.allTodos.filter(x=> x.done === false);
        $scope.title = "todo";
        break;
      case 'done':
        $scope.todos= $scope.allTodos.filter(x=> x.done === true);
        $scope.title = "done";
        break;
    }

  }


}
