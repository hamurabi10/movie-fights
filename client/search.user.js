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
	},
	icon: function(id){
		const request = FriendRequests.findOne({user: id, 'sender._id': Meteor.userId()});
		var icon;
		switch(request.status){
			case 'pending':
				icon = 'fa-clock-o';
			break;
			case 'accepted':
				icon = 'fa-user';
			break;
			case 'denied':
				icon = 'fa-times';
			break;
		}
		return icon;
	},
	colorIcon: function(id){
		const request = FriendRequests.findOne({user: id, 'sender._id': Meteor.userId()});
		var icon;
		switch(request.status){
			case 'pending':
				icon = 'btn-warning';
			break;
			case 'accepted':
				icon = 'btn-success';
			break;
			case 'denied':
				icon = 'btn-danger';
			break;
		}
		return icon;
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