import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

interface ISuccess {
  message: string;
  title?: string;
  autoClose?: number | boolean;
}

interface IErrorWithErr {
  err: AxiosError | Error;
  title?: string;
  autoClose?: number | boolean;
}

interface IErrorWithMessage {
  message: string;
  title?: string;
  autoClose?: number | boolean;
}

type IError = IErrorWithErr | IErrorWithMessage;

class NotificationService {
  showSuccess({ message, title, autoClose }: ISuccess) {
    notifications.show({
      title: title || 'Success',
      message: message,
      color: 'green',
      autoClose,
    });
  }

  showError(error: IError) {
    let msg = 'An error occurred';
    if ('message' in error && error.message) {
      msg = error.message;
    } else if (error instanceof AxiosError) {
      msg = error.response?.data.message;
    }
    notifications.show({
      title: error.title || 'Error',
      message: msg,
      color: 'red',
      autoClose: error.autoClose,
    });
  }
}

const notificationService = new NotificationService();
export { NotificationService, notificationService };
