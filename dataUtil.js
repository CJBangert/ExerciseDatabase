var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('data.json', fs.readFileSync('data_original.json'));
}

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
	// poke.json stores the pokemon array under key "pokemon", 
	// so we are recreating the same structure with this object
	console.log("saving...")
	var obj = {
		exercises: data
	};

	fs.writeFileSync('data.json', JSON.stringify(obj));
	console.log("saved")
}
// function getAllExercises(data) {
//     var allTags = [];
//     for(var i = 0; i < data.length; i++) {
//         allTags[i] = "Name: "
//         allTags[i] += data[i].name
//         allTags[i] += "|| Duration: " + data[i].duration + "|| Muscle Groups Targeted: " + data[i].muscle_groups + "|| Dissiculty(1-10): "+ data[i].difficulty + "|| Potential For Injury "+ data[i].inj_potential + "\n"

//     }
//     return allTags;
// }

module.exports = {
    loadData: loadData,
    saveData: saveData,
    restoreOriginalData: restoreOriginalData
}