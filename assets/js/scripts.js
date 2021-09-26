let clock = new Vue({
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
		clearTimeout(timeWatch);
	},
	mounted() {
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
let millisNextTime = timeWatcher();
let timeWatch = setTimeout(() => {
	getData(clock);
}, millisNextTime);

getData(clock);

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

	if (hours >= 0 && hours <= 2) {
		result = randomResult(response, "midnight");
	} else if (hours >= 3 && hours <= 5) {
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
	let millis0 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() + 1,
			0,
			0,
			0,
			0
		).getTime() - date;

	let millis3 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			3,
			0,
			0,
			0
		).getTime() - date;

	let millis6 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			6,
			0,
			0,
			0
		).getTime() - date;

	let millis11 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			0,
			0,
			0,
			0
		).getTime() - date;

	let millis15 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			15,
			0,
			0,
			0
		).getTime() - date;

	let millis18 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			18,
			0,
			0,
			0
		).getTime() - date;

	let millis20 =
		new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			20,
			0,
			0,
			0
		).getTime() - date;

	let millisResult;

	if (hours >= 0 && hours <= 2) {
		millisResult = millis3;
	} else if (hours >= 3 && hours <= 5) {
		millisResult = millis6;
	} else if (hours >= 6 && hours <= 10) {
		millisResult = millis11;
	} else if (hours >= 11 && hours <= 14) {
		millisResult = millis15;
	} else if (hours >= 15 && hours <= 17) {
		millisResult = millis18;
	} else if (hours >= 18 && hours <= 19) {
		millisResult = millis20;
	} else if (hours >= 20 && hours <= 23) {
		millisResult = millis0;
	}

	return millisResult;
}

function getData(app) {
	millisNextTime = timeWatcher();
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
