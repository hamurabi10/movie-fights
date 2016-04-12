FlowRouter.route('/', {
	action: function(){
		BlazeLayout.render('mainLayout', {main: 'requests'});
	},
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