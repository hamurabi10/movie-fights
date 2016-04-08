import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FriendRequests } from '../api/friend-requests.js';
import './friends.html';

Template.friends.onCreated(function(){
	this.searchFriend = new ReactiveVar('none');
});

Template.friends.helpers({
	friends: function(){
		return FriendRequests.find({});
	},
	users: function(){
		const search = Template.instance().searchFriend.get();
		if(search != 'none'){
			return Meteor.users.find({username: {$regex: search}});
		}
	},
	isSearching: function(){
		const search = Template.instance().searchFriend.get();
		if(search == 'none'){
			return false;
		}else{
			return true;
		}
	}
});

Template.friends.events({
	'submit .search-users': function(event, instance){
		event.preventDefault();
		const word = event.target.searchUserWord.value;
		instance.searchFriend.set(word);
	},
	'click .add-friend': function(event, instance){
		event.preventDefault();
		FriendRequests.insert({user: this._id, sender: {_id: Meteor.userId(), username: Meteor.user().username}, accepted: false});
	},
	'click .back-friends': function(event, instance){
		event.preventDefault();
		instance.searchFriend.set('none');
	}
});