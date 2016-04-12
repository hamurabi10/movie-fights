import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FriendRequests } from '../api/friend-requests.js';

Template.friendRequests.onCreated(function(){
	Meteor.subscribe('friendRequests');
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
		var friendRequests = Meteor.user().profile.friendRequests;
		if(friendRequests){
			friendRequests.push({_id: doc.sender._id, username: doc.sender.username});
		}else{
			friendRequests = [];
		}
		// update user
		Meteor.call('acceptFriend', Meteor.userId(), {_id: doc._id, friendRequests: friendRequests}, function(error){
			console.log(error);
		});
	}
});