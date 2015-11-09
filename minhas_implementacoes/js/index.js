var app = angular.module('app', []);

app.controller('controllerAPP', function($scope, $http) {  
  $scope.options = {
    sort: 'views'
  };
  
  $scope.shots = [];
  
  $scope.obterShots = function() {
    var url = 'https://api.dribbble.com/v1/shots?access_token=ee1914ee47ff2dd03b342c66c1b26ab924d95765122eec30dadb56ef72a4a8cc';
    if($scope.options.sort) url += '&sort='+$scope.options.sort;
    $http.get(url).success(function(data) {
      for(var texto in data){
        var descricaoTratado = tratamento(data[texto].description);
        var objeto = {
          url: data[texto].html_url,
          imagem: data[texto].images.normal,
          descricao: descricaoTratado,
          titulo: data[texto].title,
          avatar: data[texto].user.avatar_url,
          nome: data[texto].user.name 
        };
        $scope.shots.push({
          objetoMontado: objeto
        });
      }
    });
  }

  var tratamento = function(texto) {
    var textoFormatado;  
    if (texto == undefined) {
      var textoFormatado = "Não possui descrição!";
      return textoFormatado;
    } else {
      textoFormatado = texto.replace(/<.*?>/g, '');
      return textoFormatado;
    }
  };
  
  $scope.$watchCollection('options', $scope.obterShots);
  
});

