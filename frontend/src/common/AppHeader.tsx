import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className='text-white shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-white font-bold text-3xl'>Health Care</h1>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/declare-health'>Declare Health</Link>
            </li>
            <li>
              <Link to='/health-declaration-list'>Health Declaration List</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Header>
  );
};

export default AppHeader;
