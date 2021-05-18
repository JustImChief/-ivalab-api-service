import { AxiosResponse } from 'axios';
import { ResponseService as AbstractResponseService, ResponseServiceError } from 'ts-axios-api-service';
declare type ErrorType = ResponseServiceError | {
    errorType: string;
    errors?: any;
    message?: string;
    messageType?: string;
};
declare class ResponseService extends AbstractResponseService {
    doFailureAction<ErrorType>(error: any): Promise<never>;
    doSuccessAction(response: AxiosResponse<any>): Promise<ErrorType> | any;
    processResponse(promise: Promise<AxiosResponse<any>>): Promise<AxiosResponse<any>>;
}
export default ResponseService;
export { ResponseServiceError };
