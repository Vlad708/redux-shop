import React, { Component } from 'react'
import Swiper from 'react-id-swiper'

class Slider extends Component {

	render() {

		const params = {
	      pagination: {
	        el: '.swiper-pagination',
	        type: 'bullets',
	        clickable: true
	      },
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev'
	      },
	      spaceBetween: 30
	    }

		return(
			<div>
				<Swiper {...params}>
		          <div>
		          	<img src="/XR.jpg" style={{maxWidth: '100%'}} />
		          </div>
		          <div>
		          	<img src="/1920n.jpg" style={{maxWidth: '100%'}} />
		          </div>
		        </Swiper>
			</div>
		)
	}

}

export default Slider