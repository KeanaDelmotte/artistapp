export const formatTime = (timeinseconds: number): string => {
	let minutes = Math.floor(timeinseconds / 60);
	let seconds = `${timeinseconds % 60}`;
	seconds = seconds.padStart(2, "0");
	let timeinminutes = `${minutes}:${seconds}`;

	return timeinminutes;
};
