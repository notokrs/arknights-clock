var clock = new Vue({
	el: "#root",
	data: {
		completed: false,
		time: "",
		date: "",
		second: "",
		title: "",
		desc: "",
		logoURL: "",
		wallpaperPath: "",
	},
	beforeUnmount() {
		clearInterval(time);
		clearInterval(timeWatch);
	},
	mounted() {
		getData(this);

		document.onreadystatechange = function () {
			if (document.readyState !== "complete") {
				clock.completed = false;
			} else {
				clock.completed = true;
			}
		};
	},
});

let date;

updateTime();
let time = setInterval(updateTime, 1000);
let timeWatch = setInterval(timeWatcher, 3000);

function updateTime() {
	date = new Date();
	let dateOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	clock.time =
		String(date.getHours()).padStart(2, "0") +
		":" +
		String(date.getMinutes()).padStart(2, "0");

	clock.second = String(date.getSeconds()).padStart(2, "0");

	clock.date = date.toLocaleDateString("en-US", dateOptions);
}

function updateWallpaper(response) {
	let hours = date.getHours();
	let result;

	if (hours >= 3 && hours <= 5) {
		result = randomResult(response, "dawn");
	} else if (hours >= 6 && hours <= 10) {
		result = randomResult(response, "morning");
	} else if (hours >= 11 && hours <= 14) {
		result = randomResult(response, "day");
	} else if (hours >= 15 && hours <= 17) {
		result = randomResult(response, "afternoon");
	} else if (hours >= 18 && hours <= 19) {
		result = randomResult(response, "evening");
	} else if (hours >= 20 && hours <= 23) {
		result = randomResult(response, "night");
	} else if (hourse >= 0 && hours <= 2) {
		result = randomResult(response, "midnight");
	}

	return result;
}

function randomResult(response, time) {
	let responseIndex = Math.floor(Math.random() * response.length);
	let wallpaperPath = "assets/img/time/";
	let logoPath = "assets/img/logo/";
	let imgResult = [];
	let randomResult = null;

	response[responseIndex].images.forEach((data) => {
		if (data.time == time) {
			imgResult.push(data.file);
		}
	});

	if (imgResult.length >= 1) {
		let imgRandomIndex = Math.floor(Math.random() * imgResult.length);

		randomResult = makeResult(
			response[responseIndex].title,
			response[responseIndex].desc,
			logoPath + response[responseIndex].logo,
			wallpaperPath + time + "/" + imgResult[imgRandomIndex]
		);
	}

	return randomResult;
}

function makeResult(title, desc, logo, images) {
	return {
		title,
		desc,
		logo,
		images,
	};
}

function timeWatcher() {
	let hours = date.getHours();

	switch (hours) {
		case 0:
		case 3:
		case 6:
		case 11:
		case 15:
		case 18:
		case 20:
			getData(clock);
			break;
		default:
			console.log("Time Watcher : " + hours);
	}
}

function getData(app) {
	axios.get("./assets/json/wallpaper.json").then((response) => {
		let result = updateWallpaper(response.data);
		if (result != null) {
			app.wallpaperPath = result.images;
			app.title = result.title;
			app.desc = result.desc;
			app.logoURL = result.logo;
		}
	});
}
