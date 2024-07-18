import { useModalAction } from '@components/ui/modal/modal.context';
import type { CreateReviewInput, Review, ReviewPaginator, ReviewQueryOptions } from '@ts-types/custom.types';
import { useTranslation } from 'next-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import client from './api';
import { API_ENDPOINTS } from './api/endpoints';
import { mapPaginatorData } from '@utils/data-mappers';
import product from '@components/repositories/product';

export function useReviews(options: ReviewQueryOptions) {
  
  const {
    data: response,
    isLoading,
    error,
    isFetching,
  } = useQuery<ReviewPaginator, Error>(
    [API_ENDPOINTS.PRODUCTS_REVIEWS, options],
    ({ queryKey }) =>
      client.reviews.all(Object.assign({}, queryKey[1] as ReviewQueryOptions)),
    {
      keepPreviousData: true,
    }
  );
  return {
    reviews: response?.data ?? [],
    paginatorInfo: mapPaginatorData(response),
    isLoading,
    error,
    isFetching,
    hasMore: response && response?.last_page > response?.current_page,
  };
}

export function useReview({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery<Review, Error>(
    [API_ENDPOINTS.PRODUCTS_REVIEWS, id],
    () => client.reviews.get({ id }),
    {
      enabled: Boolean(id),
    }
  );
  return {
    review: data,
    isLoading,
    error,
  };
}

export function useCreateReview() {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const { mutate: createReview, isLoading } = useMutation(
    client?.reviews?.create,
    {
      onSuccess: (res) => {
        // console.log('onSuccess',res)
        toast.success(t('Review Submitted Successfully'));
      },
      onSettled: (res) => {
        // console.log('onSettled',res)
        // toast.success(t('text-review-request-submitted'));
        
        queryClient.invalidateQueries([API_ENDPOINTS.ORDERS]);
        closeModal();
      },
    }
  );
  return {
    createReview,
    isLoading,
  };
}

export function useUpdateReview() {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const { mutate: updateReview, isLoading } = useMutation(
    client.reviews.update,
    {
      onSuccess: (res) => {
        toast.success(t('text-review-request-update-submitted'));
      },
      onSettled: () => {
        queryClient.invalidateQueries([API_ENDPOINTS.ORDERS]);
        closeModal();
      },
    }
  );
  return {
    updateReview,
    isLoading,
  };
}
