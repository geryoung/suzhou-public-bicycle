(function() {

	//http://218.93.33.59:85/map/szmap/img/44.jpg
	//http://218.93.33.59:85/map/szmap/ibikegif.asp?id=44&flag=1
	var IMAGE_URL_TEMP = "http://218.93.33.59:85/map/szmap/ibikegif.asp?id={station_id}&flag=3";

	var $ = function ( id ) {
		return document.getElementById(id.substr(1));
	}
	window.$ = $;

/*	var asynLoadScrpt = function (jsSrc, _callback) {
		var	el = document.createElement('script');
		el.src = 'js/bicycle-station.js';
		var body = document.body;
		body.appendChild(el);
		// $('#stationInfo').appendChild(el);
		el.onload = function () {
			console.log('ibike is %o', ibike);
			_callback(ibike);
			// alert(ibike);
			//alert('not supported localStorage, stationjs loaded');
		};
	}

	if(!window.JSON){
		alert('not soupported window.JSON');
	}

	//check the storage
	if( typeof window.localStorage == "object") {
		var bicycleStationItem = localStorage.getItem('bikeStation');
		var bicycleStation = JSON.parse(bicycleStationItem);
		if(!bicycleStationItem) {
			localStorage.clear();
		}else{
			window.ibike = bicycleStation;
			alert('supported localStorage, and localStorage has strage the station data');
		}
	} 

	//当前环境没有 ibike，加载 bicycle-station.js，记载完毕之后，localStorage
	if(!window.ibike || !window.ibike.station) {
		var stationjsSrc = 'js/bicycle-station.js';
		asynLoadScrpt(stationjsSrc, function(data){
			// alert(data);
			var bicycleStationItem = null;
			if(data && data.station ) {
				window.ibike = data;
				bicycleStationItem = JSON.stringify(data);
			}
			//alert(data);
			if(bicycleStationItem ) {
				if(typeof window.localStorage == "object") {
					localStorage.setItem('bikeStation', bicycleStationItem);	
					alert('supported localStorage, but the station data haven\'t been storaged, now storage');	
				}else{
					alert('not supported localStorage, can not storage the station data');	
				}
			}
			
		});
	}*/


	// else {
	// 	var ibike = localStorage.getItem('bikeStation');

		
	// 	if(!ibike || ibike == "null"){
	// 		el = document.createElement('script');
	// 		el.src = 'js/bicycle-station.js';
	// 		$('#stationInfo').appendChild(el);
	// 		el.onload = function () {
	// 			alert(ibike);
	// 			alert('supported localStorage, stationjs loaded');
	// 			localStorage.setItem('bikeStation', ibike);
	// 		};
	// 	}else{
	// 		window.ibike = ibike;
	// 		alert(ibike);
	// 		alert('supported localStorage, and localStorage has strage the station data');
	// 	}

	// }

	// console.log(ibike.station.length);


	window.onload = function() {
		var infoHtml = 'info :';
		switch(window.applicationCache.status) {
			case window.applicationCache.UPDATEREADY :
				infoHtml += 'cache update ready';
				break;
			case window.applicationCache.UNCACHED :
				infoHtml += 'uncached';
				break;
 		}

		$('#stateInfo').innerHTML = infoHtml;
	}


	function showStation ( _station ) {
		var _stationId = _station.id;
		if ( !_stationId ) {_stationId = _station};
		$('#stationInfo').src = IMAGE_URL_TEMP.replace('{station_id}', _stationId);
	}
	window.showStation = showStation;

	function removeStationList () {
		$('#filterContent').innerHTML = '';
	}

	function addStationList ( _stationArr ) {
		removeStationList();
		var _htmlStr = '<ul>';
		for( var i = 0; i<_stationArr.length; i++ ) {
			_htmlStr += "<li onclick='showStation(" + _stationArr[i].id + ")'>" + _stationArr[i].name + "</li>";
		}
		_htmlStr += '</ul>';
		$('#filterContent').innerHTML = _htmlStr;
	}

	

	$('#searchBtn').addEventListener('click', function() {
		// console.log('clicked');
		//$('numContent').src = IMAGE_URL_TEMP.replace('{station_id}', 1153);
		if ( !ibike || !ibike.station) { 
			console.log('station array not loaded');
			return;
		};

		for (var i = 0; i < ibike.station.length; i++) {
			ibike.station[i].index = i;
		};

		var searchContent = $('#searchContent').value;
		var filterStationTempArr = [];
		
		for(var j = 0; j < searchContent.length; j++) {

			if (j == 0) {
				filterStationTempArr = _.filter(ibike.station, function(num) {
					return num.name.indexOf(searchContent[j]) >= 0;
				});
			} else if(filterStationTempArr.length < 1) {
				console.log("no station matched");
				return;
			} else {
				filterStationTempArr = _.filter(filterStationTempArr, function (num) {
					return num.name.indexOf(searchContent[j]) >= 0;
				});
			}
			console.log(j+'-%o', filterStationTempArr);	
		}
		
		console.log(filterStationTempArr);
		addStationList(filterStationTempArr);
	});

} ());
