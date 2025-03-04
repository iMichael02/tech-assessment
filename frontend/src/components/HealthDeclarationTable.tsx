import { Table } from 'antd';
import { useMemo } from 'react';
import DeclarationRecord from '../types';
import useHealthDeclarationActions from '../hooks/useHealthDeclarationActions';

type Props = {
  records: DeclarationRecord[];
};

const HealthDeclarationTable = ({ records }: Props) => {
  const { handleEdit, handleDelete } = useHealthDeclarationActions();

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

  return <Table columns={columns} dataSource={records} rowKey='id' />;
};

export default HealthDeclarationTable;
