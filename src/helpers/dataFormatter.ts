export const getMonthlyTripDates = (response: Array<BookingMonthlyRecord>): Array<string> => {
	const dateList: Array<string> = [];

	response.forEach((booking) => {
		const date = booking.attributes.trip.data.attributes.tripDate;
		if (dateList.includes(date)) return;
		dateList.push(date);
	});

	console.log("THE DATE LIST GENERATED IS", dateList);
	return dateList;
};
