import {get} from '../utils/Req'

const fullData = () => new Promise((ok, bad) => {
	get('app-data').then(r => {
		ok(r.data);
	}, bad);

});
export {fullData};
