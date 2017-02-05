Template.list.helpers({
	//data context for list items
	listItems: function(){
		return Session.get('listData');
	},
	//date context for modal popup
	modalItem: function(){
		//retrieve sessiion variable date context
		return Session.get('modalData');
	}
});

Template.list.events({
	'click .modalLauncher': function(){
		//set session variable for the modal data context
		Session.set('modalData', this);
	},
	'click .showLimit': function(event, template){
		//event function for showing different sizes
		$('#loadingRow').show();
		//get the requested limit
		var limit = $(event.target).text();
		if(limit == "All"){
			limit = -1;
		}
		//call server method to get data slice
		Meteor.call('fetchDataSlice', limit, function(error, result){
			Session.set('listData', result);
			$('#loadingRow').hide();
		});
	},
	'click .sortAsc': function(event, template){
		//sort in ascending order

		//get session variable list
		var arr = Session.get('listData');
		//get column to sort on
		var colNum = $(event.target).attr('data-colNum');
		//sort function for 2d array
		arr.sort(function(a,b){
		    if (a[colNum].toLowerCase() === b[colNum].toLowerCase()) {
		        return 0;
		    }
		    else {
		        return (a[colNum].toLowerCase() < b[colNum].toLowerCase()) ? -1 : 1;
		    }
		});
		//put sorted list back into session variable
		Session.set('listData', arr);
	},
	'click .sortDsc': function(event, template){
		//sort descending order

		//get sessionn variable list
		var arr = Session.get('listData');
		//get column to sort on
		var colNum = $(event.target).attr('data-colNum');
		//sort function for 2d array
		arr.sort(function(a,b){
		    if (a[colNum].toLowerCase() === b[colNum].toLowerCase()) {
		        return 0;
		    }
		    else {
		        return (a[colNum].toLowerCase() > b[colNum].toLowerCase()) ? -1 : 1;
		    }
		});
		//put sorted list back into session variable
		Session.set('listData', arr);
	}
});

Template.list.rendered = function() {
	//when template is rendered, default to displaying 100 items
	var numberOfItems = 100;
	//call server method to fetch data slice
	Meteor.call('fetchDataSlice', numberOfItems, function(error, result){
		Session.set('listData', result);
		$('#loadingRow').hide();
	});
};