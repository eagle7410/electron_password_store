import {save, status, move, update} from '../utils/Req'

const add = (data) => new Promise((ok , bad) => {
	save('user', data).then(
		r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad(r.data);
		},
		e => bad('Sorry inner error. Go to support.')
	)
});

export {add};
