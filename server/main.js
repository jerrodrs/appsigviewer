import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	//server side data set variable
	var dataSet;

	//on startup fetch the JSON dataset from URL
    Meteor.startup(function () {
		var url = "http://jobs.fortinet.com/test.json";
		dataSet = Meteor.http.get(url, {timeout:30000}).data;
    });

	Meteor.methods({
		//server side method for fetching json app list
		'fetchDataSlice': function(itemCount) {
			//if -1 then we want all
			if(itemCount == -1){
				return dataSet;
			}else{
				return dataSet.slice(0, itemCount);
			}
		},
		//server side method for fetching search result
		'searchData': function(applicationName) {
			var collection = [];
			for(var i = 0; i < dataSet.length; i++){
				//if the search term exists in the row, add it to the return array
				if(dataSet[i][0].toLowerCase().indexOf(applicationName.toLowerCase()) != -1){
					collection.push(dataSet[i])
				}
			}
			return collection;
		},
	});
}