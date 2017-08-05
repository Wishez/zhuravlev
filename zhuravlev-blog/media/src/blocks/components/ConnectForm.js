import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as Cookies from 'js-cookie';

const required = value => value ? undefined : 'Заполните, пожалуйста, это поле, и спасибо',
	  email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный e-mail адрес' : undefined;

const renderField = ({ input, type, label, meta: { touched, error, warning }, textarea, maxLength}) => {
	let field;

	if (!textarea)
		field =	<input 
			{...input}
			type={type}
			placeholder={label}
			className='controller__item'
			maxLength={maxLength}
		/>
	else
	 	field = <textarea 
			{...input}
			type={type}
			placeholder={label}
			className='controller__item controller__item-textarea'
			rows='5'
			maxLength={maxLength}
		/>

	return (
		<div className='connectForm__controller controller'>
			<label
				htmlFor={name}
				className='controller__label'>
				{label}
			</label>
			{field}
			{touched && ((error && <span className='controller__error'>{error}</span>) || (warning && <span>{warning}</span>))}
		</div>	
	)
}


class ConnectForm extends Component  {
	submit(values, dispatch) {
		

		const csrftoken = Cookies.get('csrftoken');
		const csrfSafeMethod = (method) => (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));

		$.ajaxSetup({
			url: '/connect/',
			type: 'POST',
			data: values, 
			beforeSend: (xhr, settings)  => {
	          	if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        	}
			}
		});

		$.ajax({
			success: (respond) => {
				$('.connect').hide();
				$('#main').append(respond)
			},
			error: (xhr, errmsg, err) => {
				console.log(errmsg);
			}
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className='connect__form'>
				<form 
					id='connectForm' 
					className='connectForm'
					method='post'
					onSubmit={handleSubmit(this.submit.bind(this))}>
					<Field 
						name='first_name'
						type='text'
						component={renderField}
						label='Имя'
						maxLength='18'
						validate={[ required ]}
					/>
					<Field 
						name='last_name'
						type='text'
						component={renderField}
						label='Фамилия'
						maxLength='24'
						validate={[ required ]}
					/>
					<Field 
						name='email'
						type='email'
						component={renderField}
						label='E-mail'
						maxLength='70'
						validate={[ required, email ]}
					/>
					<Field 
						name='message'
						type='text'
						textarea={true}
						component={renderField}
						label='Сообщение'
						maxLength='350'
						validate={[ required ]}
					/>
					<button 
						type='submit' 
						className='connectForm__btn btn'>
						Отправить
					</button> 
				</form>
			</div>

		);
	}
}

// function fixString(string) {

// 	return string
// 		.replace(new RegExp(/[\s\d,\-\.!@#$%^&*_\\\/'";:\]\[{}~`]/, 'g'), '')
// 		.replace(string[0], string[0].toUpperCase())
// 		.replace(string.slice(1), string.slice(1).toLowerCase());
// }

export default reduxForm({
  form: 'connectForm'
})(ConnectForm);