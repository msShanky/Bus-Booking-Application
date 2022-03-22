import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { BookingFormValues } from "../types/BookingForm";
export * from "./booking";
export * from "./clients";
export * from "./bus";
export * from "./invoice";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://bus-booking-cms.herokuapp.com/api";

export const createTrip = (formValues: BookingFormValues) => {
	const { place, date, time } = formValues;

	return axios.post<StrapiPostResponse<Trip>, AxiosResponse<StrapiPostResponse<Trip>>, StrapiPostBody<Trip>>(
		`${API_URL}/trips`,
		{
			data: {
				source: place.from,
				destination: place.to,
				pickupTime: moment(time).format("HH:mm:ss.SSS"),
				tripDate: date as string,
			},
		}
	);
};
