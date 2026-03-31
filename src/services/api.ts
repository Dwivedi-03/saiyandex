import axios, { AxiosInstance } from "axios";
import { Character, Planet, ApiResponse } from "../types";
import { API_CONFIG } from '../utils/constants';

const api: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

// Characters API
export const getCharacters = async (page: number = 1, limit: number = API_CONFIG.ITEMS_PER_PAGE): Promise<ApiResponse<Character>> => {
    try {
        const response = await api.get<ApiResponse<Character>>(`/characters?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};

export const getCharacterById = async (id: Number): Promise<Character> => {
    try {
        const response = await api.get<Character>(`/characters/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
}

// Planets API
export const getPlanets = async (page:number = 1, limit:number = API_CONFIG.ITEMS_PER_PAGE): Promise<ApiResponse<Planet>> => {
    try {
        const response = await api.get<ApiResponse<Planet>>(`/planets?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching planets:', error);
        throw error;
    }
};

export const getPlanetById = async (id: Number): Promise<Planet> => {
    try {
        const response = await api.get<Planet>(`/planets/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching planet:', error);
        throw error;
    }
};

export default api;