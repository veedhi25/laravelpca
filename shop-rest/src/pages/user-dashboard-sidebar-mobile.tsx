import Link from '@components/ui/link';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import NavBar from '@components/navbar/NavBar';

import { GetServerSideProps } from 'next';
import { parseContextCookie } from '@utils/parse-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NavbarIcon } from '@components/icons/navbar-icon';
import { CloseIcon } from '@components/icons/close-icon';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cookies = parseContextCookie(context?.req?.headers?.cookie);
    if (!cookies?.auth_token) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return {
      props: {
        ...(await serverSideTranslations(context.locale, ["common", "forms"])),
      },
    };
  };

type DashboardSidebarProps = {
  className?: string;
};

const UserDashboardSideBarMobile: React.FC<DashboardSidebarProps> = ({ className , handleMenuToggle }) => {
  

  const { t } = useTranslation();
  const { pathname } = useRouter();

  const router= useRouter();

  return (

    <aside className="z-50 relative ">

      <div className=''>
      

      <div className="overflow-hidden rounded border border-border-200 bg-light -mt-6 -ml-0.5">
        <ul className="py-2">
 
        <li className='ml-3' >
        
        <div className='flex gap-8'>

        <div className="text-xl font-bold">
          <img src="/frontPhoto/patanLogo.png" className="w-[200px] mt-2" />
        </div>

        <div className="  flex items-center mr-4">
        
        <div onClick={handleMenuToggle} className="w-7 h-7 flex items-center justify-center rounded-full text-body bg-gray-200 transition-all duration-200 focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light" > <CloseIcon className="w-5 h-5" />  </div> 
     
       </div>
    </div>


        </li>

        <li  onClick={handleMenuToggle} className="py-1 mt-4" >
                <Link
                  // href='/user-dasboard-pages/exams'
                  href='/student-dashboard/dashboard'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/dashboard",
                    }
                  )}
                > 
                  {t('Dashboard')}
                </Link>
              </li>
        <li onClick={handleMenuToggle} className="py-1" >
                <Link
                  // href='/user-dasboard-pages/exams'
                  href='/student-dashboard/exams'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/exams",
                    }
                  )}
                >
                  {t('Exam')}
                </Link>
              </li>
              
        <li onClick={handleMenuToggle} className="py-1" >
                <Link
                  // href='/user-dasboard-pages/exams'
                  href='/student-dashboard/mock-exams'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/mock-exams",
                    }
                  )}
                >
                  {t('Mock Exams')}
                </Link>
              </li>

        <li  onClick={handleMenuToggle} className="py-1" >
                <Link
                  href='/student-dashboard/results/23'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/results/23",
                    }
                  )}
                >
                  {t('Results')}
                </Link>
              </li>
        {/* <li  onClick={handleMenuToggle} className="py-1" >
                <Link
                  href='/student-dashboard/courses'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/courses",
                    }
                  )}
                >
                  {t('Courses')}
                </Link>
              </li> */}
        {/* <li  onClick={handleMenuToggle} className="py-1" >
                <Link
                 href='/student-dashboard/subjects'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/subjects",
                    }
                  )}
                >
                  {t('Subjects')}
                </Link>
              </li> */}
        <li  onClick={handleMenuToggle} className="py-1" >
                <Link
                  href='/student-dashboard/notes'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/notes",
                    }
                  )}
                >
                  {t('Study Material')}
                </Link>
              </li>

        <li  onClick={handleMenuToggle} className="py-1" >
                <Link
                  href='/student-dashboard/book'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/book",
                    }
                  )}
                >
                  {t('Books')}
                </Link>
              </li>
              
        {/* <li  onClick={handleMenuToggle}  className="py-1" >
                <Link
                  href='/student-dashboard/video'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/video",
                    }
                  )}
                >
                  {t('video')}
                </Link>
              </li> */}
        <li  onClick={handleMenuToggle} className="py-1" >
                <Link
                  href='/student-dashboard/settings'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/settings",
                    }
                  )}
                >
                  {t('Settings')}
                </Link>
              </li>
        </ul>
        {/* End of top part menu */}

        <ul className="border-t border-border-200 bg-light py-4">
          <li className="block py-2 px-11 ">
            <button
              onClick={() => router.push('/logout')}
              className={classNames(
                'font-semibold text-accent transition-colors hover:text-accent focus:text-accent'
              )}
            >
              {t('Logout')}
            </button>
          </li>
        </ul>
        {/* End of bottom part menu */}
      </div>

      </div>
    </aside>
  );
};

export default UserDashboardSideBarMobile;
