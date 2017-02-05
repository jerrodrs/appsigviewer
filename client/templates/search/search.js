
Template.search.events({
	'click #goSearch': function(event, template){
		//get search term and call server side method for retrieving search
		var searchTerm = $('#searchInput').val();
		Meteor.call('searchData', searchTerm, function(error, result){
			Session.set('listData', result);
		});
	},
	'keypress #searchInput': function (evt, template) {
		//same event as above but for ENTER key press
		if (evt.which === 13) {
			var searchTerm = $('#searchInput').val();
			Meteor.call('searchData', searchTerm, function(error, result){
				Session.set('listData', result);
			});
		}
	}
});