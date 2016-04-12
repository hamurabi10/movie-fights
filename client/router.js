FlowRouter.route('/', {
	action: function(){
		BlazeLayout.render('mainLayout', {main: 'requests'});
	},
});