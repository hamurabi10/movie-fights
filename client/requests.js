import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../imports/ui/friend-requests.js';
import { FriendRequests } from '../imports/api/friend-requests.js';


Template.requests.helpers({
	totalRequests: function(){
		return FriendRequests.find({user: Meteor.userId(), status: 'pending'}).count();
	}
});