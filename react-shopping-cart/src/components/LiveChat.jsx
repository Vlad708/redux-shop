import React, { Component } from 'react'; 

export default class LiveChat extends Component {
	
	componentWillMount() {
    	setTimeout(() => {
			console.log('==RUN')
			this.loadLiveChatApi.bind(this)();
    	}, 2000)    	
  	}

  	loadLiveChatApi() {
		var widget_id = 'e9tUepAMXx',
	    	d = document,
	    	w = window;

	    function l() {
	        var s = document.createElement('script');
	        s.type = 'text/javascript';
	        s.async = true;
	        s.src = '//code.jivosite.com/script/widget/' + widget_id;
	        var ss = document.getElementsByTagName('script')[0];
	        ss.parentNode.insertBefore(s, ss);
	    }
	    if (d.readyState == 'complete') {
	        l();
	    } else {
	        if (w.attachEvent) {
	            w.attachEvent('onload', l);
	        } else {
	            w.addEventListener('load', l, false);
	        }
	    }		
  	}


	render() {
		return null
	}
}
