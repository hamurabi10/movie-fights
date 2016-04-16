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
		// add friend to sender
		const sender = Meteor.users.findOne({_id: doc.sender._id})
		const user = Meteor.user();
		if(sender && user){
			// add friend to logged user
			if(user.profile){
				if(!user.profile.friends){
					user.profile.friends = [];
				}
			}else{
				user['profile'] = {friends: []};
			}
			user.profile.friends.push({_id: sender._id, username: sender.username});

			// add friend to sender
			if(sender.profile){
				if(!sender.profile.friends){
					sender.profile.friends = [];
				}
			}else{
				sender['profile'] = {friends: []};
			}
			sender.profile.friends.push({_id: Meteor.userId(), username: Meteor.user().username});

			// update user
			Meteor.call('acceptFriend', Meteor.userId(), {_id: doc._id, user: user, sender: sender}, function(error){
				console.log(error);
			});
		}
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