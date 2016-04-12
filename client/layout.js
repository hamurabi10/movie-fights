import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../imports/startup/accounts-config.js';

Template.mainLayout.onCreated(function(){
	Session.set('searchUser', 'none');
});

Template.mainLayout.helpers({
});

Template.mainLayout.events({
	'submit .search-users': function(event, instance){
		event.preventDefault();
		// set session
		const word = event.target.searchUserWord.value;
		Session.set('searchUser', word);
		// show modal
		$('#user-search').modal('show');
	},
});