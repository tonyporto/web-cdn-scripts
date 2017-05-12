angular
  .module("webSiteSearchApp", [])
  .controller('webSiteSearchController', function ($scope, $http) {
    $scope.getArticles = function () {

      if ($scope.keyword === '' || $scope.keyword === undefined) {
        $scope.emptyText = 'Type something to search.';
        return;
      }
 
      $http
        .get('http://tonyporto.github.io/web-cdn-scripts/json/angularSearch.json')
        .error(function (data, status) {
          $scope.errorText = 'ERROR: Cannot fetch articles.';
        })
        .success(function (data, status) {
          var articles = [];
 
          data.forEach(function(article) {
            // Search keyword at any place in article title. 
            if ((article.title.toLowerCase().indexOf($scope.keyword.toLowerCase()) > -1) || (article.desc.toLowerCase().indexOf($scope.keyword.toLowerCase()) > -1)) {
              articles.push({
                title: article.title,
                url: article.url,
				
				desc: article.desc
              });
            }
			
          });

          if (articles.length) {
            $scope.articles = articles;
          }
		  
		  
		  
        });
    }
  });