import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Radio, Button } from 'antd';
import FormField from '../../../common/FormField';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import DeclarationRecord from '../../../types';
import { camelCaseToWords } from '../utils/strings';
import CHECKBOX_ITEMS from '../../../constants/checkboxItems';
import { useCallback } from 'react';
import { BASE_API_URL } from '../../../constants';
import { notification } from 'antd';

const HealthDeclarePage = () => {
  const { control, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: useCallback(
      (newRecord: DeclarationRecord) =>
        axios.post(`${BASE_API_URL}/health-declaration`, newRecord),
      []
    ),
  });

  const onSubmit = (data: any) => {
    const formattedData: DeclarationRecord = {
      ...data,
      symptoms: data.symptoms.map((symptom: string) =>
        camelCaseToWords(symptom)
      ),
      contactedWithCovid19Suspects:
        data.contactedWithCovid19Suspects === 'yes' ? true : false,
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

  return (
    <div className='health-declare-page flex items-center justify-center'>
      <div className='w-full my-8  flex flex-col items-center justify-center w-full max-w-3xl'>
        <div className='form-top rounded-t w-full h-max'>
          <div className='bg-linear-to-r from-amber-500 to-transparent text-white text-4xl font-bold px-6 py-12'>
            Health Declaration
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white p-6 rounded-b shadow-md'
        >
          <FormField
            control={control}
            label='Name'
            name='name'
            type='text'
            required
          />
          <FormField
            control={control}
            label='Temperature'
            name='temperature'
            type='number'
            required
          />
          <div className='mb-4'>
            <label className='block text-gray-700 text-left font-bold'>
              Symptoms
            </label>
            <Controller
              name='symptoms'
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Checkbox.Group {...field}>
                  <div className='grid grid-cols-2 gap-2'>
                    {CHECKBOX_ITEMS.map((item) => (
                      <Checkbox
                        key={item.value}
                        value={item.value}
                        className='flex items-center'
                      >
                        {item.text}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              )}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-left font-bold'>
              Have you been in contact with anyone who is suspected to have/ has
              been diagnosed with COVID-19 within the last 14 days?
            </label>
            <Controller
              name='contactedWithCovid19Suspects'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value='yes' data-testid='contact-yes'>
                    Yes
                  </Radio>
                  <Radio value='no'>No</Radio>
                </Radio.Group>
              )}
            />
          </div>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HealthDeclarePage;
