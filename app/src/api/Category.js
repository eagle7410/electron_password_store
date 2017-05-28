let startID = 5;

const addRecord = name => new Promise((ok , bad) => {
	startID++;

	ok({
		id : startID,
		name : name
	});
});


export {addRecord};
