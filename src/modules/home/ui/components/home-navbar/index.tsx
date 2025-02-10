import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

export const HomeNavbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50'>
      <div className='flex items-center gap-4 w-full'>
        {/* Menu and Logo */}
        <div className='flex items-center flex-shrink-0'>
          <SidebarTrigger />
          <div className='flex items-center p-4 gap-1'>
            <Link href='/'>
              <Image src='/logo.svg' height={32} width={32} alt='Logo' />
            </Link>
            <p className='text-xl font-semibold tracking-tight'>YouTube</p>
          </div>
        </div>

        {/* Search bar */}
      </div>
    </nav>
  );
};
