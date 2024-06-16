import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

interface ISuccess {
  message: string;
  title?: string;
  autoClose?: number | boolean;
}

interface IError {
  err: AxiosError | Error;
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

  showError({ err, title, autoClose }: IError) {
    console.error(err);
    let msg = 'An error occurred';
    if (err instanceof AxiosError) {
      msg = err.response?.data.message;
    }
    notifications.show({
      title: title || 'Error',
      message: msg,
      color: 'red',
      autoClose,
    });
  }
}

const notificationService = new NotificationService();
export { NotificationService, notificationService };
