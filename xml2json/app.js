angular.module('myApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(domain,callback,transform){
                $http.get(
                    domain,
                    {transformResponse:transform}
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    callback(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                });
        }
    };
}]);

angular.module('myApp',['myApp.service']);

var AppController = function($scope,DataSource) {

    var url = "http://services.tvrage.com/feeds/full_search.php?show=buffy";
    
    xmlTransform = function(data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json( data );
        return json.Results.show;
    };
    
    setData = function(data) {
        $scope.dataSet = data;
    };
        
    DataSource.get(url,setData,xmlTransform);
    
};
