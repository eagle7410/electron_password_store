import {save, status, move, update} from '../utils/Req'
import Routes from '../const/apiRoutes'
import {Alert} from '../const/Messages'

const add = (data) => new Promise((ok , bad) => {
	save(Routes.usr, data).then(
		r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad(r.data);
		},
		e => bad(Alert.errorInner)
	)
});

export {add};
