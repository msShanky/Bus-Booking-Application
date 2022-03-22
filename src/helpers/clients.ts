import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { API_URL } from "./apiHandler";

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

export const deleteClient = (id: number) => {
	return axios.delete(`${API_URL}/clients/${id}`);
};
