import { useCallback } from 'react';
import DeclarationRecord from '../types';

const useHealthDeclarationActions = () => {
  const handleEdit = useCallback((record: DeclarationRecord) => {
    console.log('Edit record', record);
  }, []);

  const handleDelete = useCallback((record: DeclarationRecord) => {
    console.log('Delete record', record);
  }, []);

  return { handleEdit, handleDelete };
};

export default useHealthDeclarationActions;
