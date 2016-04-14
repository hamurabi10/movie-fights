import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../imports/ui/friends.js';

Template.friends.helpers({
	totalFriends: function(){
		if(Meteor.user().profile){
			return Meteor.user().profile.friends.length;
		}else{
			return 0;
		}
	}
});