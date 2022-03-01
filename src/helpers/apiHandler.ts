import axios, { AxiosResponse } from "axios";
import moment, { Moment } from "moment";
import { FormValues } from "../types/BookingForm";
import qs from "qs";
// const {
//   data: { id: tripId, attributes: trip },
// } = await axios.post<StrapiResponse<Trip>, StrapiResponse<Trip>, StrapiPostBody<Trip>>(

const API_URL = process.env.API_URL || "http://localhost:1337/api";

export const createTrip = (formValues: FormValues) => {
	const { place, date, time } = formValues;

	return axios.post<StrapiPostResponse<Trip>, AxiosResponse<StrapiPostResponse<Trip>>, StrapiPostBody<Trip>>(
		`${API_URL}/trips`,
		{
			data: {
				source: place.from,
				destination: place.to,
				pickupTime: moment(time).format("HH:mm:ss.SSS"),
				tripDate: date,
			},
		}
	);
};

export const createClient = (formValues: FormValues) => {
	const { name, contact } = formValues;
	return axios.post<StrapiPostResponse<Client>, AxiosResponse<StrapiPostResponse<Client>>, StrapiPostBody<Client>>(
		`${API_URL}/clients`,
		{
			data: {
				name,
				contact,
				address: "",
			},
		}
	);
};

export const createBooking = (formValues: FormValues, tripId: number, clientId: number) => {
	const { advancePaid, balanceAmount, diesel, fasttag, kilometer, quotedPrice } = formValues;

	return axios.post<
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
			},
		},
		{
			params: {
				populate: "*",
			},
		}
	);
};

export const getBookingsByDate = (date: Moment) => {
	console.log("DATE RECEIVED", date);
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
