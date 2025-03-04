import { UnProcessedHDList } from '@/types';

export const processHDList = (result: UnProcessedHDList) => {
  return result.map((item) => {
    const { Symptoms, id, ...copy } = item;
    return {
      ...copy,
      symptoms: Symptoms.map((item) => item.name),
    };
  });
};
