import useFetchHealthDeclaration from '../hooks/useFetchHealthDeclaration';
import HealthDeclarationTable from '../components/HealthDeclarationTable';
import PageTop from '../common/components/PageTop';

const ManageHealthDeclarationPage = () => {
  const { data: records = [], isLoading, error } = useFetchHealthDeclaration();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className='manage-health-declaration-page flex items-center justify-center'>
      <div className='w-full my-8 flex flex-col items-center justify-center max-w-3xl'>
        <PageTop>Manage Health Declaration</PageTop>
        <div className='bg-white p-6 rounded-b shadow-md w-full'>
          <HealthDeclarationTable records={records} />
        </div>
      </div>
    </div>
  );
};

export default ManageHealthDeclarationPage;
