import React, { Component } from 'react';
import { render } from 'react-dom'; 
import configureStore from './../store/configureStore.js';
import { fetchData } from './../actions/ArticlesActions.js';
import { filterArticles, showMore } from './../actions/VisibilityFilterActions.js';
import { 
	FETCH_ARCHIVE
} from './../constants/actionTypes.js';
import ArchiveList from './ArchiveList';



const store = configureStore();

class Archive extends Component {


	componentDidMount() {
		const { loadArchive } = this.props;
		console.log(loadArchive);
		loadArchive(); 
	}

	

	

	render() {
		const {
			archive
		} = this.props;
		console.log(this.props.archive, archive.length, '<=====archives');

		return (
				<section className='archive'>
					<div className='container'>
						<ArchiveList archive={archive} />
					</div>
				</section>
		);
	}
}

const view = () => {
	const state = store.getState();
	console.log('state is =>', state);
	window.props.archive = state.articles.archive;

	window.props.loadArchive = () => { 
		fetchData(
			store,
			{ type: FETCH_ARCHIVE }
		);
	};
	
	render(React.createElement(Archive, window.props), window.react_mount);	
};

store.subscribe(view);
view();