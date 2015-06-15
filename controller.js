function contentController ($scope, $location,$http) {
	$scope.access_token= "";
	$scope.page_name = "";
	$scope.show = false;
	$scope.qdata = [];
	$scope.next = false;
	$scope.prev = false;
	$scope.count = 0;
	$scope.searching = false;
	$scope.countDirection = true; //true for positive (++)

	//for clearfix class;
	$scope.indexDivByThree = function (index) {
		if((index+1) % 3 == 0 )
			return true;
		else return false;
	}

	$scope.lessPost = function () {
		if($scope.count<=25)
			return true;
		return false;
	}

	$scope.GetDate = function (date) {
		var d = new Date(date);
      return d;
	}
	window.fbAsyncInit = function() {
	FB.init({
	  appId      : '1415143362107952',
	  cookie     : true,  // enable cookies to allow the server to access 
	                      // the session
	  xfbml      : true,  // parse social plugins on this page
	  version    : 'v2.0', // use version 2.0
	  status     : true
	});

	FB.Event.subscribe('auth.authResponseChange', function(response) {
	     if (response.status === 'connected') 
	     {
	     	console.log(response);
	        $scope.access_token = response.authResponse.accessToken;
	        $scope.show = true;
	        $scope.$apply();
	     }   
	     else if (response.status === 'not_authorized') 
	    {
	        console.log('logged In fail');
	    } else
	    {
	        //UNKNOWN ERROR. Logged Out
	        $scope.access_token = '';
	        $scope.show = false;
	        console.log('logged In failed');
	    }
	});
	FB.Event.subscribe('auth.login', function(response) {
	  console.log(response);
	});
	};
	$scope.findPage = function (type) {
		$scope.message = '';
		$scope.qdata=[];
		if(type=='fresh'){
			$scope.countDirection = true;
			$scope.searching = false;
			$scope.count = 0;
			url = "https://graph.facebook.com/"+$scope.page_name+"/posts/?access_token="+$scope.access_token;
		}
		if(type =='next'){
			$scope.countDirection = true;
			url = $scope.paging.next;
		}
		if(type =='prev'){
			$scope.countDirection = false;
			url = $scope.paging.previous;
		}
		$.ajax({
		url: url,
		type: "GET",
		success : function (data) {
			console.log(data);
			search = data.data;
			if(search.length==0){
				$scope.message = 'No posts available to search';
			}
			console.log($scope.search_string);
			if($scope.search_string == undefined ||$scope.search_string == ' '){
				$scope.message = 'wrong query';
				return;
			}
			$scope.searching = true;
			for (var i = 0; i < search.length; i++) {
				if($scope.countDirection)
					$scope.count++;
				else
					$scope.count--;
				console.log(search[i].message);
				if(search[i].message!==undefined){
					if(search[i].message.toLowerCase().search($scope.search_string.toLowerCase())!=-1){
						$scope.qdata.push(search[i]);
					}else if(search[i].name!==undefined){
						if(search[i].name.toLowerCase().search($scope.search_string.toLowerCase())!=-1){
							$scope.qdata.push(search[i]);
						}	
					}
				}else if(search[i].description!==undefined){
					if(search[i].description.toLowerCase().search($scope.search_string.toLowerCase())!=-1){
						$scope.qdata.push(search[i]);
					}
				}
			};
			if(data.paging !==undefined){
				$scope.paging = data.paging;
				$scope.next = true;	
				$scope.prev = true;
			} 
			if($scope.qdata.length==0){
				$scope.findPage('next');
			}else{
				$scope.message = '';
			}
			console.log($scope.qdata);
			// if(data.paging !==undefined){
			// 	$scope.paging = data.paging;
			// 	$scope.next = true;	
			// 	$scope.prev = true;
			// } 
			console.log($scope.paging);
			$scope.$apply();			
		},
		error: function (data) {
			$scope.message = data.responseJSON.error.message;
			$scope.$apply();
		}
	});
	}
}