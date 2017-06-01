import React from 'react';
import './LoadAnime.css';

const LoadAnime = () => {
	let cont = [];
	for (let i = 1; i<6; ++i)
		cont.push(<div className={'sk-rect sk-rect'+i} key={'dk-rect'+i}/>);

	return (
		<div>
			<div>Loading...</div>
			<div className="sk-wave">
				{cont}
			</div>
		</div>
	);
};

export default  LoadAnime;
