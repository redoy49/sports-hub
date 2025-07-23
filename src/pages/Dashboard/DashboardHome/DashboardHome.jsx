import LoadingSpinner from '../../../components/LoadingSpinner';
import UserProfile from '../UserRoute/UserProfile';
import MemberProfile from '../MemberRoute/MemberProfile';
import AdminProfile from '../AdminRoute/AdminProfile';
import Forbidden from '../../Forbidden/Forbidden';
import useUserRole from '../../../hooks/useRole';

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <LoadingSpinner/>;

  if (role === 'user') return <UserProfile />;
  if (role === 'member') return <MemberProfile />;
  if (role === 'admin') return <AdminProfile />;

  return <Forbidden />; 
};

export default DashboardHome;
