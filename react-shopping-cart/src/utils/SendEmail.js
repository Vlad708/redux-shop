import axios from 'axios'

export const sendEmail = (formData) => {
	const postUrl = 'https://socio.paktcompany.com/wp-json/contact-form-7/v1/contact-forms/71/feedback'
	return axios.post(postUrl, formData)
		.then(response => {			
			if (response.data.status === 'mail_sent') {				
				return true
			}
		})
}