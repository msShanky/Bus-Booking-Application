import moment, { Moment } from "moment";
import { BookingFormValues } from "../types/BookingForm";

export const getMonthlyTripDates = (response: Array<StrapiResponseData<Booking>>): Array<string> => {
	const dateList: Array<string> = [];
	response.forEach((booking) => {
		const { attributes } = booking;
		const date = attributes.trip?.data.attributes.tripDate;
		if (dateList.includes(date as string)) return;
		dateList.push(date as string);
	});

	return dateList;
};

export const getFormattedInitialValues = (values: StrapiResponseData<Booking>) => {
	const { attributes } = values;
	const { trip, client, invoice, diesel, bookingState } = attributes;
	const { kilometer, fasttag, quotedPrice, balanceAmount, advancePaid } = attributes;

	const formattedInitialValues = {
		bookingState,
		client: {
			name: client?.data.attributes.name,
			contact: client?.data.attributes.contact,
		},
		trip: {
			source: trip?.data.attributes.source,
			destination: trip?.data.attributes.destination,
			tripDate: moment(trip?.data.attributes.tripDate, "YYYY-MM-DD"),
			pickupTime: moment(trip?.data.attributes.pickupTime, "HH:mm:ss"),
		},
		estimated: {
			kilometer,
			diesel,
			fasttag,
			quotedPrice,
			advancePaid,
			balanceAmount,
		},
		invoice: {
			kilometer: invoice?.data?.attributes.kilometer,
			diesel: invoice?.data?.attributes.diesel,
			dieselCost: invoice?.data?.attributes.dieselCost,
			milage: invoice?.data?.attributes.milage,
			totalAmount: invoice?.data?.attributes.totalAmount,
		},
	};

	return formattedInitialValues;
};

export const getClientInfo = (values: BookingFormValues): Client => {
	return {
		name: values.name,
		contact: values.contact,
		address: "",
	};
};

export const findDateRange = (date: Moment = moment()): Array<string> => {
	return [moment(date).startOf("month").format("YYYY-MM-DD"), moment(date).endOf("month").format("YYYY-MM-DD")];
};
