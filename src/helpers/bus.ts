import axios, { AxiosResponse } from "axios";
import { API_URL } from "./apiHandler";
import qs from "qs";

export const deleteUploadedFiles = (documents: Array<number>): Array<Promise<AxiosResponse<any, any>>> => {
	// /api/upload/files/:id
	return documents.map((documentId) => {
		const url = `${API_URL}/upload/files/${documentId}`;
		return axios.delete(url);
	});
};

export const fetchBuses = (query?: string) => {
	return axios.get<StrapiResponseType<Bus>>(`${API_URL}/buses`, {
		params: {
			publicationState: "preview",
			populate: "*",
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

export const deleteBus = async (bus: StrapiResponseData<Bus>) => {
	try {
		await axios.delete(`${API_URL}/buses/${bus.id}`);
		// Do not process the delete sequence if there are no data inside documents
		if (!bus.attributes.documents?.data) {
			return;
		}
		const documents = bus.attributes.documents?.data.map((document) => {
			return document.id;
		});
		const documentsPromiseHolder = deleteUploadedFiles(documents as Array<number>);
		await Promise.all(documentsPromiseHolder);
	} catch (error) {
		throw error;
	}
};
