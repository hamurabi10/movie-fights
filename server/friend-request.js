import { Meteor } from 'meteor/meteor';
import { FriendRequests } from '../imports/api/friend-requests.js';

Meteor.methods({
	acceptFriend: function(userId, doc){
		FriendRequests.update({_id: doc._id}, {$set: {status: 'accepted'}});
		return Meteor.users.update({_id: userId}, {$set: {'profile.friends': doc.friends}});
	}
});

Meteor.publish('friendRequests', function(){
	return FriendRequests.find({});
})