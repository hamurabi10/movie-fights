import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FriendRequests } from '../api/friend-requests.js';

import './friend-requests.html';

Template.friendRequests.onCreated(function(){
	Meteor.subscribe('myFriendRequests', Meteor.userId());
});

Template.friendRequests.helpers({
	requests: function(){
		return FriendRequests.find({user: Meteor.userId(), status: 'pending'});
	},
});

Template.friendRequests.events({
	'click .accept-friend': function(event, instance){
		event.preventDefault();
		var doc = this;
		// add friend
		var friends = Meteor.user().profile.friends;
		if(friends){
			friends.push({_id: doc.sender._id, username: doc.sender.username});
		}else{
			friends = [];
		}
		// update user
		Meteor.call('acceptFriend', Meteor.userId(), {_id: doc._id, friends: friends}, function(error){
			console.log(error);
		});
	},
	'click .deny-friend': function(event, instance){
		event.preventDefault();
		var doc = this;
		// update user
		Meteor.call('denyFriend', Meteor.userId(), doc._id, function(error){
			console.log(error);
		});
	}
});