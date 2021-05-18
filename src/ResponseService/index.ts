import { AxiosResponse }                                                    from 'axios';
import { ResponseService as AbstractResponseService, ResponseServiceError } from 'ts-axios-api-service';

import {
  COMMON_ERROR,
  NOT_AUTHORIZED_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  VALIDATION_ERROR,
  WRONG_RESPONSE_ERROR,
} from '../constants';

type ErrorType = ResponseServiceError | {
  errorType: string;
  errors?: any;
  message?: string;
  messageType?: string;
}

class ResponseService extends AbstractResponseService {
  doFailureAction<ErrorType>(error) {
    switch (error.errorType) {
      case SERVER_ERROR:
        return Promise.reject({
                                message:     'Произошла ошибка при выполнении запроса',
                                messageType: 'error',
                              });

      case WRONG_RESPONSE_ERROR:
        return Promise.reject({
                                message:     'Некорректный формат ответа',
                                messageType: 'error',
                              });

      case NOT_FOUND_ERROR:
        return Promise.reject({
                                message:     'Не найден обработчик запроса',
                                messageType: 'warning',
                              });

      case NOT_AUTHORIZED_ERROR:
        return Promise.reject({
                                message:     'Отказано в доступе',
                                messageType: 'warning',
                              });

      case VALIDATION_ERROR:
        return Promise.reject(error.errors);

      default:
        return Promise.reject(error);
    }
  }

  doSuccessAction(response: AxiosResponse<any>): Promise<ErrorType> | any {
    if (response.data.message) {
      return Promise.reject({
                              message:     response.data.message,
                              messageType: 'success',
                            });
    }

    return response.data.vars;
  }

  processResponse(promise: Promise<AxiosResponse<any>>): Promise<AxiosResponse<any>> {
    return promise
      .then((response: AxiosResponse<any>) => {
        if (200 === response.status) {
          const {errors, message, messageType, success, vars} = response.data;

          if (
            typeof success === 'undefined' ||
            typeof errors === 'undefined' ||
            typeof vars === 'undefined' ||
            typeof messageType === 'undefined' ||
            typeof message === 'undefined'
          ) {
            return Promise.reject({errorType: WRONG_RESPONSE_ERROR});
          }

          if (true === success) {
            return response;
          }

          if (errors.common) {
            return Promise.reject({
                                    errorType: COMMON_ERROR,
                                    messageType,
                                    message:   errors.common,
                                  });
          }

          if (Object.keys(errors.validation).length > 0) {
            return Promise.reject({
                                    errorType: VALIDATION_ERROR,
                                    messageType,
                                    errors:    errors.validation,
                                  });
          }
        }
      })
      .catch((error: Error | any) => {
        if (error instanceof Error) {
          switch (error.message) {
            case 'Request failed with status code 404':
              return Promise.reject({errorType: NOT_FOUND_ERROR});
            case 'Request failed with status code 403':
              return Promise.reject({errorType: NOT_AUTHORIZED_ERROR});
            case 'Request aborted':
              break;
            default:
              return Promise.reject({errorType: SERVER_ERROR});
          }
        }

        return Promise.reject(error);
      });
  }
}

export default ResponseService;
export { ResponseServiceError };