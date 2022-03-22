import axios from "axios";
import moment from "moment";
import { API_URL } from "./apiHandler";

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
			invoiceDate: moment(),
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
