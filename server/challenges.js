import { Meteor } from 'meteor/meteor';
import { Challenges } from '../imports/api/challenges.js';

Meteor.methods({
	'insertChallenge': function(userId, friend){
		const doc = {challenger: userId, friend: friend, status: 'pending', created: new Date()};
		return Challenges.insert(doc);
	}
});

Meteor.publish('challenges', function(userId){
	return Challenges.find({});
});
