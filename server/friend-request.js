import { Meteor } from 'meteor/meteor';
import { FriendRequests } from '../imports/api/friend-requests.js';

Meteor.methods({
	acceptFriend: function(userId, doc){
		FriendRequests.update({_id: doc._id}, {$set: {status: 'accepted'}});
		return Meteor.users.update({_id: userId}, {$set: {'profile.friends': doc.friends}});
	},
	denyFriend: function(userId, id){
		return FriendRequests.update({_id: id}, {$set: {status: 'denied'}});
	},
	addFriend: function(userId, doc){
		return FriendRequests.insert(doc);
	}
});

Meteor.publish('myFriendRequests', function(userId){
	console.log(FriendRequests.find({user: userId}).count());
	return FriendRequests.find({user: userId});
});

Meteor.publish('sendedFriendRequests', function(userId){
	return FriendRequests.find({'sender._id': userId});
});
