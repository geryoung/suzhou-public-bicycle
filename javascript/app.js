
(function() {
	//http://218.93.33.59:85/map/szmap/img/44.jpg
	//http://218.93.33.59:85/map/szmap/ibikegif.asp?id=44&flag=1
	var IMAGE_URL_TEMP = "http://218.93.33.59:85/map/szmap/ibikegif.asp?id={station_id}&flag=3";
	// console.log(ibike.station.length);
	function $ ( id ) {
		return document.getElementById(id.substr(1));
	}
	window.$ = $;

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
		console.log('clicked');
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
