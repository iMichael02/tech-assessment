import { useQuery } from '@tanstack/react-query';
import DeclarationRecord from '../types';
import { fetchHealthDeclaration } from '../apis';

const useFetchHealthDeclaration = () => {
  return useQuery<DeclarationRecord[]>({
    queryKey: ['healthDeclarations'],
    queryFn: fetchHealthDeclaration,
  });
};

export default useFetchHealthDeclaration;
