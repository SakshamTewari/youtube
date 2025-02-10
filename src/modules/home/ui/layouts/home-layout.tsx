import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { HomeNavbar } from '../components/home-navbar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className='w-full'>
        <HomeNavbar />
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default HomeLayout;
