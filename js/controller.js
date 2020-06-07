const sensor = new AbsoluteOrientationSensor({ frequency: 60 });
sensor.addEventListener("reading", (e) => handleSensor(e));
sensor.start();

function handleSensor(e) {
	console.log(e.target.quaternion);
}
