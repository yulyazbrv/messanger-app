import { useQuery } from 'react-query';
import { getMessages } from '../../api/messages';

export const useMessages = () => {
  return useQuery('/messages', async () => {
    const messages = await getMessages();
    console.log(messages)
    return messages;
  }, {refetchInterval: 5000});
};
