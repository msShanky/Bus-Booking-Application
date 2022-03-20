import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import moment, { Moment } from "moment";
import { FormValues } from "../types/BookingForm";
import qs from "qs";
// const {
//   data: { id: tripId, attributes: trip },
// } = await axios.post<StrapiResponse<Trip>, StrapiResponse<Trip>, StrapiPostBody<Trip>>(

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://bus-booking-cms.herokuapp.com/api";

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

export const fetchClients = (query?: string) => {
	return axios.get<StrapiResponseType<Client>>(`${API_URL}/clients`, {
		params: {
			publicationState: "preview",
			populate: "*",
			sort: ["id"],
			filters: {
				// client: {
				name: {
					$containsi: query,
				},
				// },
			},
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: "brackets", encodeValuesOnly: true });
		},
	});
};

export const createClient = (body: Client) => {
	return axios.post<StrapiPostResponse<Client>, AxiosResponse<StrapiPostResponse<Client>>, StrapiPostBody<Client>>(
		`${API_URL}/clients`,
		{
			data: {
				...body,
			},
		}
	);
};

export const updateClient = (values: Client, clientId: number) => {
	const url = `${API_URL}/clients/${clientId}`;
	return axios.put<StrapiPostResponse<Client>, AxiosResponse<StrapiPostResponse<Client>>>(url, {
		data: values,
	});
};

export const createBooking = async (formValues: FormValues, tripId: number, clientId: number) => {
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

	await axios.put(`${API_URL}/client/${clientId}`, {
		booking: bookingResponse.data.data.id,
	});
	return bookingResponse;
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

export const fetchBuses = (query?: string) => {
	return axios.get<StrapiResponseType<Bus>>(`${API_URL}/buses`, {
		params: {
			publicationState: "preview",
			sort: "id",
			filters: {
				$or: [
					{
						busNumber: {
							$containsi: query,
						},
					},
					{
						fc: {
							$containsi: query,
						},
					},
					{
						rc: {
							$containsi: query,
						},
					},
					{
						insurance: {
							$containsi: query,
						},
					},
					{
						license: {
							$containsi: query,
						},
					},
				],
			},
		},
		paramsSerializer: function (params) {
			return qs.stringify(params, { encodeValuesOnly: true });
		},
	});
};

export const createBus = (body: BusPostBody) => {
	return axios.post(`${API_URL}/buses`, { data: { ...body } });
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

export const createInvoice = async (formValues: InvoiceFormType, activeItem: StrapiResponseData<Booking>) => {
	const { attributes, id } = activeItem;
	const { invoice } = formValues;

	const relations = {
		booking: id,
		client: attributes.client?.data.id,
		trip: attributes.trip?.data.id,
	};

	const postBody = {
		data: {
			invoiceTime: moment().toISOString(),
			...invoice,
			...relations,
		},
	};

	const invoiceResponse = await axios.post<StrapiPostResponse<Invoice>>(`${API_URL}/invoices`, postBody, {
		params: {
			publicationState: "preview",
			populate: "*",
		},
	});

	const {
		data: {
			data: { id: invoiceId },
		},
	} = invoiceResponse;

	// Update the invoice id to the booking
	await axios.put(`${API_URL}/bookings/${id}`, {
		data: {
			invoice: invoiceId,
			bookingState: "Invoiced",
		},
	});

	return invoiceResponse;
};

export const updateInvoice = async (formValues: InvoiceFormType, activeItem: StrapiResponseData<Booking>) => {
	const invoiceId = activeItem.attributes.invoice?.data.id;
	const bookingId = activeItem.id;
	await axios.put<StrapiPostResponse<Booking>>(`${API_URL}/bookings/${bookingId}`, {
		data: {
			invoice: invoiceId,
			bookingState: formValues.bookingState,
		},
	});
	return axios.put<StrapiPostResponse<Invoice>>(`${API_URL}/invoices/${invoiceId}`, {
		data: { ...formValues.invoice },
	});
};

export const deleteClient = (id: number) => {
	// return axios.delete(`${API_URL}/clients/${id}`);
	console.log("--- DELETING CLIENT ---", id);
};

// export const createClient = () => {};
