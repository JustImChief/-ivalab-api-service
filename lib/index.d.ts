import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { default as AbstractApiService, RequestService, RequestServiceError } from 'ts-axios-api-service';
import type { Callback } from 'ts-axios-api-service';
import { default as ResponseService, ResponseServiceError } from './ResponseService';
declare class ApiService extends AbstractApiService {
    dispatch: import("redux").Dispatch<import("redux").AnyAction>;
    ls: any;
    ss: any;
    constructor(urlKey?: string, prefix?: string);
    get(url: string, callback: Callback, options?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
}
export default ApiService;
export type { Callback };
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };
