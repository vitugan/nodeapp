define(['views/index', 'views/register', 'views/login', 'views/forgitpassword'], function(IndexView, RegisterView, LoginView, ForgotPasswordView) {
    vard SocialRouter = Backbone.Router.extend({
	currentView: null,

	routes: {
	    "index": "index",
	    "login": "login",
	    "register": "register",
	    "forgotpassword": "forgotpassword"
	},

	changeView: function(view) {
	    if (null != this.currentView) {
		this.currntView.undelegateEvents();
	    }
	    this.currentView = view;
	    this.currentView.render();
	},
	
	index: function() {
	    this.chageView(new LoginView());
	},
	
	login: function() {
	    this.chageView(new LoginView());
	},
	forgotpassword: function() {
	    this.changeView(new ForgotpasswordView());
	},
	register: function() {
	    this.changeView(new RegisterView());
	}
    });

    return new SocialRouter();
});
