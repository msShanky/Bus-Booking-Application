import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import moment, { Moment } from "moment";
import { BookingFormValues } from "../types/BookingForm";
import qs from "qs";
import { API_URL } from "./apiHandler";

export const createBooking = async (formValues: BookingFormValues, tripId: number, clientId: number) => {
	const { advancePaid, balanceAmount, diesel, fasttag, kilometer, quotedPrice } = formValues;

	const bookingResponse = await axios.post<
		StrapiPostResponse<Booking>,
		AxiosResponse<StrapiPostResponse<Booking>>,
		StrapiPostBody<BookingPostBody>
	>(
		`${API_URL}/bookings`,
		{
			data: {
				advancePaid,
				balanceAmount,
				diesel,
				fasttag,
				kilometer,
				quotedPrice,
				trip: tripId,
				client: clientId,
				bookingState: "Booked",
			},
		},
		{
			params: {
				populate: "*",
			},
		}
	);

	await axios.put(`${API_URL}/clients/${clientId}`, {
		data: {
			booking: bookingResponse.data.data.id,
		},
	});
	return bookingResponse;
};

export const getBookingsByInvoiceDate = (date: Moment) => {
	return axios.get<Booking, AxiosResponse<StrapiResponseType<Booking>>>(`${API_URL}/bookings`, {
		params: {
			publicationState: "preview",
			populate: "*",
			filters: {
				invoice: {
					invoiceDate: {
						$eq: date ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
					},
				},
			},
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: "brackets", encodeValuesOnly: true });
		},
	});
};

export const getBookingsByDate = (date: Moment) => {
	return axios.get<Booking, AxiosResponse<StrapiResponseType<Booking>>>(`${API_URL}/bookings`, {
		params: {
			publicationState: "preview",
			populate: "*",
			filters: {
				trip: {
					tripDate: {
						$eq: date ? moment(date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
					},
				},
			},
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: "brackets", encodeValuesOnly: true });
		},
	});
};

export const getBookingsByMonth = (
	dateRange: Array<string>
): Promise<AxiosResponse<StrapiResponseType<Booking>, any>> => {
	return axios.get<Booking, AxiosResponse<StrapiResponseType<Booking>>>(`${API_URL}/bookings`, {
		params: {
			publicationState: "preview",
			populate: "*",
			filters: {
				trip: {
					tripDate: {
						$gte: dateRange[0],
						$lte: dateRange[1],
					},
				},
			},
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: "brackets", encodeValuesOnly: true });
		},
	});
};

export const fetchBookings = () => {
	return axios.get<StrapiResponseType<Booking>>(`${API_URL}/bookings`, {
		params: {
			publicationState: "preview",
			populate: "*",
			sort: ["id"],
		},
	});
};

export const fetchBookingsWithQuery = (query: string) => {
	return axios.get<StrapiResponseType<Booking>>(`${API_URL}/bookings`, {
		params: {
			publicationState: "preview",
			populate: "*",
			sort: ["id"],
			filters: {
				client: {
					name: {
						$containsi: query,
					},
				},
			},
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: "brackets", encodeValuesOnly: true });
		},
	});
};

export const updateBooking = async (activeBooking: StrapiResponseData<Booking>, formValues: BookingFormValues) => {
	console.log("The active booking information is", activeBooking);
	console.log("The form values are", formValues);

	let bookingId, tripId, clientId;
	bookingId = activeBooking.id;
	tripId = activeBooking.attributes.trip?.data.id;
	clientId = activeBooking.attributes.client?.data.id;

	// Update the client first
	const { name, contact } = formValues;
	// const clientUpdateResponse = await axios.put(`${API_URL}/clients/${clientId}`, {
	await axios.put(`${API_URL}/clients/${clientId}`, {
		data: {
			name,
			contact,
			address: activeBooking.attributes.client?.data.attributes.address ?? "",
		},
	});

	// Update the trip information
	const { place, date, time } = formValues;
	// const tripUpdateResponse = await axios.put(`${API_URL}/trips/${tripId}`, {
	const tripUpdateBody = {
		data: {
			source: place.from,
			destination: place.to,
			pickupTime: moment(time).format("HH:mm:ss.SSS"),
			tripDate: moment(date).format("YYYY-MM-DD"),
		},
	};
	console.log("The pickup date received for editing is", date);
	console.log("The post body for date editing is", tripUpdateBody);

	await axios.put(`${API_URL}/trips/${tripId}`, tripUpdateBody);

	// Update the booking information
	const { advancePaid, balanceAmount, diesel, fasttag, kilometer, quotedPrice } = formValues;
	// const bookingUpdateResponse = await axios.put(`${API_URL}/bookings/${bookingId}`, {
	await axios.put(`${API_URL}/bookings/${bookingId}`, {
		data: {
			advancePaid,
			balanceAmount,
			diesel,
			fasttag,
			kilometer,
			quotedPrice,
		},
	});
};

export const deleteBooking = async (booking: StrapiResponseData<Booking>) => {
	let bookingId, tripId, clientId, invoiceId;
	bookingId = booking.id;
	tripId = booking.attributes.trip?.data?.id;
	clientId = booking.attributes.client?.data?.id;
	invoiceId = booking.attributes.invoice?.data?.id;

	// Delete the booking and all associated data
	clientId && (await axios.delete(`${API_URL}/clients/${clientId}`));
	tripId && (await axios.delete(`${API_URL}/trips/${tripId}`));
	invoiceId && (await axios.delete(`${API_URL}/invoices/${invoiceId}`));
	bookingId && (await axios.delete(`${API_URL}/bookings/${bookingId}`));
};
