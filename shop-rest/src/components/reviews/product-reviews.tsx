import { useTranslation } from 'next-i18next';
import ReviewCard from '@components/reviews/review-card';
import Pagination from '@components/ui/pagination';
import { useEffect, useState } from 'react';
import { useReviews } from '@utils/review';
import Sorting from './sorting';
import StarFilter from './star-filter';
import { useRouter } from 'next/router';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Spinner from '@components/ui/loaders/spinner/spinner';

type ProductReviewsProps = {
  className?: any;
  productId: string;
  productType?: string;
};

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productType,
}) => {
  const { query } = useRouter();
  const { text, ...restQuery } = query;
  const { t } = useTranslation('common');
  const [page, setPage] = useState(1);
  const { reviews, isLoading, paginatorInfo } = useReviews({
    product_id: productId,
    limit: 5,
    page,
    ...(!isEmpty(restQuery) && { ...restQuery }),
  });
  useEffect(() => {
    setPage(1);
  }, [restQuery]);
  function onPagination(current: number) {
    setPage(current);
  }
  if (isLoading && isEmpty(reviews)) {
    return <Spinner />;
  }
  const boxedLayout = ['books'].includes(productType!);

  return (
    
    <div>
      <div
        className={cn('border-t border-b border-border-200 border-opacity-70', {
          'px-5 lg:ltr:pl-16 lg:ltr:pr-10 lg:rtl:pr-16 lg:rtl:pl-10':
            !boxedLayout,
          'px-5 xl:px-0': boxedLayout,
        })}
      >
        <div
          className={cn(
            'flex flex-col justify-between sm:flex-row sm:items-center',
            {
              'mx-auto max-w-screen-xl': boxedLayout,
            }
          )}
        >
          <h2 className="mt-3 text-lg font-semibold tracking-tight text-heading sm:mt-0">
            {t('Product Reviews')} ({paginatorInfo?.total ?? 0})
          </h2>
          <div className="flex flex-col  items-center border-border-200 border-opacity-70 py-3 sm:space-y-1 sm:ltr:border-l sm:rtl:border-r lg:flex-row lg:space-y-0 lg:!border-0 lg:py-0">
            <div className="w-full shrink-0 border-border-200 border-opacity-70 sm:ltr:pl-8 sm:ltr:pr-5 sm:rtl:pl-5 sm:rtl:pr-8 lg:w-auto lg:py-5 lg:ltr:border-l lg:rtl:border-r">
              <Sorting />
            </div>
            <div className="w-full mt-2 shrink-0 border-border-200 border-opacity-70 sm:ltr:pl-8 sm:ltr:pr-5 sm:rtl:pl-5 sm:rtl:pr-8 lg:w-auto lg:py-5 lg:ltr:border-l lg:rtl:border-r">
              <StarFilter />
            </div>
          </div>
        </div>
      </div>
      {!isEmpty(reviews) ? (
        <div
          className={cn('border-b border-border-200 border-opacity-70', {
            'px-5 lg:px-16': !boxedLayout,
            'px-5 xl:px-0': boxedLayout,
          })}
        >
          <div
            className={cn({
              'mx-auto max-w-screen-xl': boxedLayout,
            })}
          >
            {reviews?.map((review: any) => (
              <ReviewCard key={`review-no-${review?.id}`} review={review} />
            ))}

            {/* Pagination */}

            {paginatorInfo && (
              <div className="flex items-center justify-between border-t border-border-200 border-opacity-70 py-4">
                <div className="text-xs text-gray-400">
                  {t('text-page')} {paginatorInfo.currentPage} {t('text-of')}{' '}
                  {Math.ceil(paginatorInfo.total / paginatorInfo.perPage)}
                </div>

                <div className="mb-2 flex items-center">
                  <Pagination
                    total={paginatorInfo.total}
                    current={paginatorInfo.currentPage}
                    pageSize={paginatorInfo.perPage}
                    onChange={onPagination}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-b border-border-200 border-opacity-70 px-5 py-16">
          <h3 className="text-lg font-semibold text-gray-400">
            {t('No Reviews Found')}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
