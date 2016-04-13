import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import {FriendRequests} from '../api/friend-requests.js';

import './sended-requests.html';

Template.sendedRequests.onCreated(function(){
	Meteor.subscribe('sendedFriendRequests', Meteor.userId());
	Meteor.subscribe('users');
});

Template.sendedRequests.helpers({
	requests: function(){
		return FriendRequests.find({'sender._id': Meteor.userId()});
	},
	userName: function(id){
		const user = Meteor.users.findOne({_id: id});
		if(user){
			return user.username;
		}
	},
	icon: function(status){
		var icon;
		switch(status){
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
	colorIcon: function(status){
		var icon;
		switch(status){
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
