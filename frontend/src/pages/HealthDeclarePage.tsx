import PageTop from '../common/components/PageTop';
import HealthDeclarationForm from '../components/HealthDeclarationForm';

const HealthDeclarePage = () => {
  return (
    <div className='health-declare-page flex items-center justify-center'>
      <div className='w-full my-8 flex flex-col items-center justify-center max-w-3xl'>
        <PageTop>Health Declaration</PageTop>
        <HealthDeclarationForm />
      </div>
    </div>
  );
};

export default HealthDeclarePage;
