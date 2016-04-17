import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Challenges } from '../api/challenges.js';

import './modal-challenge.html';

Template.modalChallenge.onCreated(function(){
	Meteor.subscribe('users');
});

Template.modalChallenge.helpers({
	challenges: function(){
		return Challenges.find({friend: Meteor.userId(), status: 'pending'});
	},
	username: function(id){
		const user = Meteor.users.findOne({_id: id});
		if(user){
			return user.username;
		}
	},
	challengerOnline: function(id){
		const user = Meteor.users.findOne({_id: id});
		return user.status.online;
	}
});

Template.modalChallenge.events({
	'click .deny-challenge': function(event, instance){
		event.preventDefault();
		Meteor.call('statusChallenge', Meteor.userId(), this._id, 'denied', function(error){
			console.log(error);
		});
	},
	'click .accept-challenge': function(event, instance){
		event.preventDefault();
		Meteor.call('statusChallenge', Meteor.userId(), this._id, 'accepted', function(error){
			console.log(error);
			if(!error){
				$('#challenge').modal('hide');
			}
		});
	}
});