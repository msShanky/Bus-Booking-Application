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
	data: Array<StrapiResponseData>;
	meta: Meta;
};

type StrapiPostResponse<T> = {
	data: StrapiResponseData;
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

type Client = {
	name: string;
	address: string;
	contact: string;
};

type Trip = {
	source: string;
	destination: string;
	pickupTime: string;
	tripDate: string;
};

type BookingPostBody = Omit<Booking, "client" | "trip"> & {
	client: number;
	trip: number;
};

type Booking = {
	diesel: number;
	kilometer: number;
	fasttag: number;
	quotedPrice: number;
	advancePaid: number;
	balanceAmount: number;
	client?: {
		data: StrapiResponseData<Client>;
	};
	trip?: {
		data: StrapiResponseData<Trip>;
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
