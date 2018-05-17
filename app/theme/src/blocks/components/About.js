import React, { Component } from 'react';
import { render } from 'react-dom';
import Paragraph from './Paragraph';
import Title from './Title';

class About extends Component{
	render() {
		return (
			<section className='about'>
				<div className='container'>
				  <Title block='about' text='Привет'/>
				  <div className='text'>
					<Paragraph block='about'
						text='Меня зовут Филипп Журавлёв. 
						Живу в Москве. 
						Занимаюсь веб-работкой более года. 
						В основном для построения веб-приложений использую такие технологии, как Django, RestAPI, ReactJS, Redux. 
						Всего не знаю, но за то время, что я занимаюсь веб-разработкой у меня накопился неплохой багаж знаний, и он продолжает наполняться. 
						Здесь я раскрываю его, чтобы поделиться его содержимым.
					'/>
				  </div>
			  </div>
			</section>
		);
	}
}

render(React.createElement(About, window.props), window.react_mount);
