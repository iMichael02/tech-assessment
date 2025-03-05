import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Radio, Button } from 'antd';
import FormField from '../common/components/FormField';
import CHECKBOX_ITEMS from '../constants/checkboxItems';
import useCreateHealthDeclaration from '../hooks/useCreateHealthDeclaration';

const HealthDeclarationForm = () => {
  const { control, handleSubmit } = useForm();
  const { onSubmit } = useCreateHealthDeclaration();

  return (
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

      {/* Symptoms */}
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

      {/* Contact Question */}
      <div className='mb-4'>
        <label className='block text-gray-700 text-left font-bold'>
          Have you been in contact with anyone who is suspected to have/ has
          been diagnosed with COVID-19 within the last 14 days?{' '}
          <span className='text-red-500'>*</span>
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
  );
};

export default HealthDeclarationForm;
