import { useQuery } from 'react-query';
import { getMessages } from '../../api/messages';

export const useMessages = (auth) => {
  return useQuery('/messages', async () => {
    if (!auth) {
      return [];
    }
    const messages = await getMessages();
    return messages;
  }, { refetchInterval: 5000 });
};