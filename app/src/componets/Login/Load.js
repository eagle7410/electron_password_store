import React from 'react';
import Spinner from 'react-spinner-material';

const Load = () => {
	return (<Spinner width={150}
	          height={150}
	          spinnerColor={"#0066ff"}
	          spinnerWidth={10}
	          show={true} />);
};

export default  Load;
