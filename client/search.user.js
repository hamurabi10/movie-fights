import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.searchUser.onCreated(function(){
	Meteor.subscribe('users');
});

Template.searchUser.helpers({
	users: function(){
		return Meteor.users.find({username: {$regex: Session.get('searchUser')}});
	},
	word: function(){
		return Session.get('searchUser');
	}
});