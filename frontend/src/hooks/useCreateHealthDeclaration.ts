import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useCallback } from 'react';
import DeclarationRecord from '../types';
import { createHealthDeclaration } from '../apis';

const useCreateHealthDeclaration = () => {
  const mutation = useMutation({
    mutationFn: useCallback(
      (newRecord: DeclarationRecord) => createHealthDeclaration(newRecord),
      []
    ),
  });

  const onSubmit = (data: any) => {
    const formattedData: DeclarationRecord = {
      ...data,
      contactedWithCovid19Suspects: data.contactedWithCovid19Suspects === 'yes',
    };

    mutation.mutate(formattedData, {
      onError: (error) => {
        notification.error({
          message: error.message,
          description: 'Failed to submit. Please try again.',
          placement: 'topRight',
        });
      },
      onSuccess: () => {
        notification.success({
          message: 'Submission Successful',
          description: 'Form submitted successfully!',
          placement: 'topRight',
        });
      },
    });
  };

  return { onSubmit };
};

export default useCreateHealthDeclaration;
