import { Layout } from 'antd';
import CustomLink from './CustomLink';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className='text-white shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Health Care</h1>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <CustomLink to='/declare-health'>Declare Health</CustomLink>
            </li>
            <li>
              <CustomLink to='/health-declaration-list'>
                Health Declaration List
              </CustomLink>
            </li>
          </ul>
        </nav>
      </div>
    </Header>
  );
};

export default AppHeader;
