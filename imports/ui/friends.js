import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Challenges } from '../api/challenges.js';

import './friends.html';
import './modal-challenge.js';

Template.friendsList.onCreated(function(){
	Meteor.subscribe('users');
	Meteor.subscribe('challenges');
});

Template.friendsList.helpers({
	friends: function(){
		if(Meteor.user().profile){
			return Meteor.user().profile.friends;
		}
	},
	userName: function(id){
		const user = Meteor.users.findOne({_id: id});
		if(user){
			return user.username;
		}
	},
	isPending: function(id){
		const challenge = Challenges.findOne({friend: id, status: 'pending'});
		if(challenge){
			return true;
		}
	},
	pendingChallenge: function(){
		// accept fight modal
		const challenges = Challenges.find({friend: Meteor.userId(), status: 'pending'}).count();
		if(challenges >= 1){
			$('#challenge').modal('show');
		}
	}
});

Template.friendsList.events({
	'click .challenge-friend': function(event, instance){
		event.preventDefault();
		Meteor.call('insertChallenge', Meteor.userId(), this._id, function(error){
			console.log(error);
		});
	}
});

Template.friendsList.onRendered(function(){
});
