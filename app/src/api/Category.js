import {save, status, move, update} from '../utils/Req'

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

const edit = (id, name) => new Promise((ok, bad) =>{
	update('category', {id : id, name : name})
		.then(r => r.status === status.ok ? ok() : bad(r.data) , e => {
			console.log('Err update', e);
			bad('Sorry inner error. Go to support.');
		});
});
export {add, del, edit};
