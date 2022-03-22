import { Moment } from "moment";

export type BookingFormValues = {
	name: string;
	date: Moment | string;
	place: {
		from: string;
		to: string;
	};
	time: Moment | string;
	kilometer: number;
	diesel: number;
	fasttag: number;
	contact: string;
	quotedPrice: number;
	advancePaid: number;
	balanceAmount: number;
};
