import { Chats } from '../model';
import client from '../util/network';

export const getChatMessages = async (id: string) => {
  const url = `/api/v1/chat/${id}`;
  const response = await client.get<Chats>(url);
  return response.data;
  // return {
  //   messages: [
  //     {
  //       id: '1',
  //       receiver: 'Smith',
  //       sender: 'John Doe',
  //       content: 'Hey Smith!',
  //       timestamp: '12321321',
  //     },
  //     {
  //       id: '2',
  //       receiver: 'Smith',
  //       sender: 'John Doe',
  //       content: 'How are you?',
  //       timestamp: '12321321',
  //     },
  //     {
  //       id: '3',
  //       receiver: 'John Doe',
  //       sender: 'Smith',
  //       content: 'I am doing well, and you?',
  //       timestamp: '12321321',
  //     },
  //     {
  //       id: '4',
  //       receiver: 'Smith',
  //       sender: 'John Doe',
  //       content: 'All good, have a good one!',
  //       timestamp: '21323321',
  //     },
  //   ],
  // };
};
