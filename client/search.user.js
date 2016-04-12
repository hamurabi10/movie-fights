import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FriendRequests } from '../imports/api/friend-requests.js';

Template.searchUser.onCreated(function(){
	Meteor.subscribe('users');
	Meteor.subscribe('sendedFriendRequests', Meteor.userId());
});

Template.searchUser.helpers({
	users: function(){
		return Meteor.users.find({username: {$regex: Session.get('searchUser')}});
	},
	word: function(){
		return Session.get('searchUser');
	},
	isSended: function(id){
		const request = FriendRequests.findOne({user: id, 'sender._id': Meteor.userId()});
		if(request){
			return true;
		}
	}
});

Template.searchUser.events({
	'click .add-friend': function(event, instance){
		event.preventDefault();
		const sendData = {user: this._id, sender: {_id: Meteor.userId(), username: Meteor.user().username}, status: 'pending'};
		Meteor.call('addFriend', Meteor.userId(), sendData, function(error){
			console.log(error);
		});
	},
});