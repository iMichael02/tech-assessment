import { Link } from 'react-router-dom';

const CustomLink = ({
  children,
  to,
  classes,
}: {
  children: string;
  to: string;
  classes?: string;
}) => {
  return (
    <Link to={to} className={'!text-black !hover:text-gray-500' + classes}>
      {children}
    </Link>
  );
};

export default CustomLink;
