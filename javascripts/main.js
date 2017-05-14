app.run((FIREBASE_CONFIG) => {
  firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("mushroomCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	$scope.mushroomItems = [];
	$scope.isEdible = "";
	$scope.searchText = "";
	console.log($scope.isEdible);


	let getMushroomList = () => {
		let mushrooms = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then((fbItems) => {
				let itemCollection = fbItems.data;
			Object.keys(itemCollection).forEach((key) => {
				itemCollection[key].id=key;
				mushrooms.push(itemCollection[key]);
			});
			resolve(mushrooms);
			})
			.catch((fbError) => {
			reject(fbError);
			});
		});
	};

	let getItems = () => {
		getMushroomList().then((itemz) => {
			$scope.mushroomItems = itemz;
		}).catch((error) => {
			console.log("get error", error);
		});
	};
	getItems();
	






});