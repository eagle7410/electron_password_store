import React from 'react';
import LoadAnime from '../../tools/LoadAnime'

const styleContent = {margin: '0 16px', overflow: 'hidden'};
const objOk  = {color : '#00E676', mess  : 'Success'};
const objBad = {color : '#E64A19', mess  : 'Fail'};

const StepsSimpleContent = (state) => {
	if (state.finished) {
		const obj = state.stop ? objBad : objOk;

		return (
			<div style={styleContent}>
				<h1 style={{color : obj.color}}>{obj.mess}</h1>
			</div>
		);
	}

	return (
		<div style={styleContent}>
			<div>{state.loading ? <LoadAnime key={'anima'} /> : <div/>}</div>
		</div>
	);
};

export default StepsSimpleContent;
