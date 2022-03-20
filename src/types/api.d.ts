type StrapiPostBody<T> = {
	data: T;
};

type Meta = {
	pagination: {
		page: number;
		pageCount: number;
		pageSize: number;
		total: number;
	};
};

type StrapiResponseData<T> = {
	id: number;
	attributes: T;
};

type StrapiResponseType<T> = {
	data: Array<StrapiResponseData<T>>;
	meta: Meta;
};

type StrapiPostResponse<T> = {
	data: StrapiResponseData<T>;
	meta: Meta;
};

type Bus = {
	busNumber: string;
	rc: string;
	fc: string;
	insurance: string;
	insuranceExpiry: string;
	license: string;
	rcFile: string;
	fcFile: string;
	trip?: Trip;
};

type BusPostBody = Omit<Bus, "trip"> & {
	trip: number;
};

type Client = {
	name: string;
	address: string;
	contact: string;
	booking?: StrapiResponseData<Booking>;
};

type ClientPostBody = Omit<Client, "booking"> & {
	booking: number | undefined;
};

type Trip = {
	source: string;
	destination: string;
	pickupTime: string;
	tripDate: string;
};

type BookingState = "Booked" | "Invoiced" | "InTransit";

type BookingPostBody = Omit<Booking, "client" | "trip"> & {
	client: number;
	trip: number;
	bookingState: BookingState;
};

type Booking = {
	diesel: number;
	kilometer: number;
	fasttag: number;
	quotedPrice: number;
	advancePaid: number;
	balanceAmount: number;
	bookingState: BookingState;
	client?: {
		data: StrapiResponseData<Client>;
	};
	trip?: {
		data: StrapiResponseData<Trip>;
	};
	invoice?: {
		data: StrapiResponseData<Invoice>;
	};
};

type Invoice = {
	invoiceTime: string;
	kilometer: number;
	diesel: number;
	dieselCost: number;
	milage: number;
	totalAmount: number;
	booking?: Booking;
	trip?: Trip;
	client?: Client;
};

type ClientCreationResponse = {
	data: {
		id: number;
		attributes: {
			name: string;
			address: string;
			contact: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
		};
	};
};

type BookingMonthlyRecord = {
	id: number;
	attributes: {
		trip: {
			data: {
				id: number;
				attributes: {
					tripDate: string;
				};
			};
		};
	};
};

type MonthlyBookingDates = {
	data: Array<BookingMonthlyRecord>;
};

type ApiState = "idle" | "inProgress" | "success" | "error";

type InvoiceFormType = {
	bookingState: BookingState;
	client: Partial<Client>;
	trip: {
		source: string;
		destination: string;
		tripDate: Moment;
		pickupTime: Moment;
	};
	estimated: {
		kilometer: number;
		diesel: number;
		fasttag: number;
		quotedPrice: number;
		advancePaid: number;
		balanceAmount: number;
	};
	invoice: {
		kilometer: number;
		diesel: number;
		dieselCost: number;
		milage: number;
		totalAmount: number;
	};
};
