let startID = 4;

const addRecord = data => new Promise((ok , bad) => {
	startID++;
	data.id = startID;
	ok(data);
});


export {addRecord};
