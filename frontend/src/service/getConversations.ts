import { Conversations } from '../model';
import client from '../util/network';

export const getConversations = async () => {
  const url = '/api/v1/conversations';
  const response = await client.get<Conversations>(url);
  return response.data;
  // return {
  //   conversations: [
  //     {
  //       id: '1',
  //       user: 'John Doe',
  //       timestamp: '12321321',
  //     },
  //     {
  //       id: '2',
  //       user: 'Jane Doe',
  //       timestamp: '12321321',
  //     },
  //     {
  //       id: '3',
  //       user: 'James Doe',
  //       timestamp: '21323321',
  //     },
  //   ],
  // };
};
