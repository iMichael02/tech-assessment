import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Title level={3} className="text-white">
          Main Form
        </Title>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/declare-health" className="hover:underline">
                Declare Health
              </Link>
            </li>
            <li>
              <Link to="/form" className="hover:underline">
                Form
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Header>
  );
};

export default AppHeader;
