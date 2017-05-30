import {save, status, move} from '../utils/Req'

const add = name => new Promise((ok , bad) => {
	save('category', name).then(
		r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad(r.data);
		},
		e => bad('Sorry inner error. Go to support.')
	)
});

const del = id => new Promise((ok , bad) => {
	move('category', id).then(
		r => r.status === status.ok ? ok() : bad(),
		e => bad('Sorry inner error. Go to support.')
	)
});

export {add, del};
