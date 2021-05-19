import { AxiosRequestConfig, AxiosResponse }                                  from 'axios';
import { default as AbstractApiService, RequestService, RequestServiceError } from 'ts-axios-api-service';
import type { Callback }                                                      from 'ts-axios-api-service';
import { LocalStorageService, SessionStorageService }                         from 'ts-storage-service';
import { dispatch }                                                           from 'ts-react-redux-store';

import { default as ResponseService, ResponseServiceError } from './ResponseService';

class ApiService extends AbstractApiService {
  dispatch = dispatch;
  ls;
  ss;

  constructor(urlKey = '', prefix = '') {
    super({baseUrl: '/api/', formData: true, urlKey});

    this.ls  = new LocalStorageService(prefix);
    this.res = new ResponseService();
    this.ss  = new SessionStorageService(prefix);
  }

  get(url: string, callback: Callback, options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    return this.processResponse(this.req.get(this.getUrl(url), {
      ...options,
      headers:         {
        ...(options.headers || {}),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':     'application/json',
      },
      withCredentials: true,
    }), callback);
  }

  post(url: string, data: any, callback: Callback, options: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
    return this.processResponse(this.req.post(this.getUrl(url), data, {
      ...options,
      headers:         {
        ...(options.headers || {}),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':     'multipart/form-data',
      },
      withCredentials: true,
    }), callback);
  }
}

export default ApiService;
export type { Callback };
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };