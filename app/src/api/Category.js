import {save, status, move, update} from '../utils/Req'
import {Alert, CategoryError} from '../const/Messages'
import Routes from '../const/apiRoutes'
const type = Routes.cat;

const add = name => new Promise((ok , bad) => {
	save(type, name).then(
		r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad(r.data);
		},
		e => bad(Alert.errorInner)
	)
});

const del = id => new Promise((ok , bad) => {
	move(type, id).then(
		r => r.status === status.ok ? ok() : bad(),
		e => bad(Alert.errorInner)
	)
});

const edit = (id, name) => new Promise((ok, bad) =>{
	update(type, {id : id, name : name})
		.then(r => r.status === status.ok ? ok() : bad(r.data) , e => {
			console.log(CategoryError.update, e);
			bad(Alert.errorInner);
		});
});
export {add, del, edit};
