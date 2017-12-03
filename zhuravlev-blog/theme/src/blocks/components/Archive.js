import React, { Component } from 'react';
import { render } from 'react-dom'; 
import configureStore from './../store/configureStore.js';
import { fetchData } from './../actions/ArticlesActions.js';
import { filterArticles, showMore } from './../actions/VisibilityFilterActions.js';
import { 
	FETCH_ARCHIVE
} from './../constants/actionTypes.js';
import ArchiveList from './ArchiveList';
import { setData, getData } from '../constants/localStorage.js';


const store = configureStore();

class Archive extends Component {


	componentDidMount() {
		setData('archive', []);
		this.props.loadArchive(); 
	}

	

	

	render() {

		return (
				<section className='archive'>
					<div className='container'>
						<ArchiveList archive={
							typeof getData('archive') !== 'undefined' ? 
								JSON.parse(getData('archive')) : 
								[] 
						} />
					</div>
				</section>
		);
	}
}

const view = () => {
	window.props.loadArchive = () => { 
		fetchData(
			store,
			{ type: FETCH_ARCHIVE }
		);
	};
	
	render(React.createElement(Archive, window.props), window.react_mount);	
};

store.subscribe(view);

export default view;