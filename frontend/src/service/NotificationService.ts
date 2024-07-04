import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

interface ISuccess {
  message: string;
  title?: string;
  autoClose?: number | boolean;
}

interface IError {
  err?: AxiosError | Error;
  message?: string;
  title?: string;
  autoClose?: number | boolean;
}

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

    if (error.err instanceof AxiosError) {
      msg = error.err.response?.data.message;
    } else if (error.message) {
      msg = error.message;
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
