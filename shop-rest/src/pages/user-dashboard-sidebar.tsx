import Link from '@components/ui/link';
import { siteSettings } from '@settings/site.settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import NavBar from '@components/navbar/NavBar';

import { GetServerSideProps } from 'next';
import { parseContextCookie } from '@utils/parse-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCustomerQuery } from '@data/customer/use-customer.query';

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

const UserDashboardSideBar: React.FC<DashboardSidebarProps> = ({ className }) => {
  

  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { data : user } = useCustomerQuery();

  const router= useRouter();

  return (

    <aside className={className}>

      

      <div className="overflow-hidden rounded border border-border-200 bg-light pt-1 hidden lg:block fixed w-[16%]">
        <ul className="py-7">
        <li className="py-1" >
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
        <li className="py-1" >
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

        <li className="py-1" >
                <Link
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
        <li className="py-1" >
                <Link
                  href={`/student-dashboard/results/${user?.me?.id}`}
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === `/student-dashboard/results/${user?.me?.id}`,
                    }
                  )}
                >
                  {t('Results')}
                </Link>
              </li>
        {/* <li className="py-1" >
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
              
        {/* <li className="py-1" >
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
        <li className="py-1" >
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

        <li className="py-1" >
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
              
        <li className="py-1" >
                {/* <Link
                  href='/student-dashboard/video'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/video",
                    }
                  )}
                >
                  {t('video')}
                </Link> */}
              </li>
        <li className="py-1" >
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


              <li className="py-1" >
                <Link
                  // href='/user-dasboard-pages/exams'
                  href='/student-dashboard/change-password'
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-green-400 focus:text-green-400',
                    {
                      '!border-green-400 text-green-400': pathname === "/student-dashboard/change-password",
                    }
                  )}
                >
                  {t('Change Password')}
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
    </aside>
  );
};

export default UserDashboardSideBar;
