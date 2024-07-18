import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image  from 'next/image';
import notFound from '@assets/no-result.svg';


interface Props {
  text?: string;
  className?: string;
}

const NotFound: React.FC<Props> = ({ className, text }) => {
  const { t } = useTranslation('common');
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="w-full h-full flex items-center justify-center">
        {/*    < Image        quality='40'
          src={notFound}
          alt={text ? t(text) : t('text-no-result-found')}
          className="w-full h-full object-contain"
          // layout='fill'
          width={400}
          height={400}


        /> */}
      </div>
      {text && (
        <h3 className="w-full text-center text-xl font-semibold text-body my-7">
          {t(text)}
        </h3>
      )}
    </div>
  );
};

export default NotFound;
