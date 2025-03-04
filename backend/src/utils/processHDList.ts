import { UnProcessedHDList } from '@/types';

export const processHDList = (result: UnProcessedHDList) => {
  return result.map((item) => {
    const { Symptoms, id, ...copy } = item;
    const [firstSymptom, ...rest] = Symptoms;
    return {
      ...copy,
      symptoms: rest.map((item) => item.name),
    };
  });
};
