import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import DeclarationRecord from '../../../types';
import { BASE_API_URL } from '../../../constants';

const ManageHealthDeclarationPage = () => {
  const {
    data: records = [],
    isLoading,
    error,
  } = useQuery<DeclarationRecord[]>({
    queryKey: ['healthDeclarations'],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_API_URL}/health-declaration`);
      return data;
    },
  });

  const handleEdit = useCallback((record: DeclarationRecord) => {
    console.log('Edit record', record);
  }, []);

  const handleDelete = useCallback((record: DeclarationRecord) => {
    console.log('Delete record', record);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Temperature',
        dataIndex: 'temperature',
        key: 'temperature',
      },
      {
        title: 'Symptoms',
        dataIndex: 'symptoms',
        key: 'symptoms',
        render: (symptoms: string[]) => symptoms?.join(', ') || 'None',
      },
      {
        title: 'Contacted with COVID-19 Suspects',
        dataIndex: 'contactedWithCovid19Suspects',
        key: 'contactedWithCovid19Suspects',
        render: (contacted: boolean) => (contacted ? 'Yes' : 'No'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: string, record: DeclarationRecord) => (
          <span className='text-lg'>
            <button
              data-testid={`edit-button-${record.id}`}
              onClick={() => handleEdit(record)}
            >
              <i className='fa-solid fa-pen-to-square pr-2 cursor-pointer text-blue-800'></i>
            </button>
            <button
              data-testid={`delete-button-${record.id}`}
              onClick={() => handleDelete(record)}
            >
              <i className='fa-solid fa-trash pr-2 cursor-pointer text-red-600'></i>
            </button>
          </span>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className='manage-health-declaration-page flex items-center justify-center'>
      <div className='w-full my-8 flex flex-col items-center justify-center max-w-3xl'>
        <div className='form-top rounded-t w-full h-max'>
          <div className='bg-gradient-to-r from-amber-500 to-transparent text-white text-4xl font-bold px-6 py-12'>
            Manage Health Declarations
          </div>
        </div>
        <div className='bg-white p-6 rounded-b shadow-md w-full'>
          <Table columns={columns} dataSource={records} rowKey='id' />
        </div>
      </div>
    </div>
  );
};

export default ManageHealthDeclarationPage;
