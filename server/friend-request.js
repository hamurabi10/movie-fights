import { Meteor } from 'meteor/meteor';
import { FriendRequests } from '../imports/api/friend-requests.js';

Meteor.methods({
	acceptFriend: function(userId, doc){
		// update request
		FriendRequests.update({_id: doc._id}, {$set: {status: 'accepted'}});
		// update users
		Meteor.users.update({_id: doc.user._id}, {$set: {'profile.friends': doc.user.profile.friends}});
		return Meteor.users.update({_id: doc.sender._id}, {$set: {'profile.friends': doc.sender.profile.friends}});
	},
	denyFriend: function(userId, id){
		return FriendRequests.update({_id: id}, {$set: {status: 'denied'}});
	},
	addFriend: function(userId, doc){
		return FriendRequests.insert(doc);
	}
});

Meteor.publish('myFriendRequests', function(userId){
	return FriendRequests.find({user: userId});
});

Meteor.publish('sendedFriendRequests', function(userId){
	return FriendRequests.find({'sender._id': userId});
});
