FlowRouter.route('/', {
	action: function(){
		BlazeLayout.render('mainLayout', {main: 'requests'});
	},
});

FlowRouter.route('/friends', {
	action: function(){
		BlazeLayout.render('mainLayout', {main: 'friends'});
	}
});

FlowRouter.route('/friend-requests', {
	action: function(){
		BlazeLayout.render('mainLayout', {main: 'requests'});
	}
});

FlowRouter.route('/sended-requests', {
	action: function(){
		BlazeLayout.render('mainLayout', {main: 'sended'});
	}
});