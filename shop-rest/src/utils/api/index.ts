import type {
  Attachment,
  // Author,
  // AuthorPaginator,
  // AuthorQueryOptions,
  // AuthResponse,
  CategoryPaginator,
  CategoryQueryOptions,
  // ChangePasswordUserInput,
  // CheckoutVerificationInput,
  // CouponPaginator,
  // CouponQueryOptions,
  CreateAbuseReportInput,
  // CreateContactUsInput,
  CreateFeedbackInput,
  // CreateOrderInput,
  CreateQuestionInput,
  // CreateRefundInput,
  CreateReviewInput,
  // DownloadableFilePaginator,
  Feedback,
  // ForgotPasswordUserInput,
  // LoginUserInput,
  // Manufacturer,
  // ManufacturerPaginator,
  // ManufacturerQueryOptions,
  MyQuestionQueryOptions,
  MyReportsQueryOptions,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  // OrderStatusPaginator,
  // OtpLoginInputType,
  // OTPResponse,
  // PasswordChangeResponse,
  PopularProductQueryOptions,
  Product,
  ProductPaginator,
  ProductQueryOptions,
  QueryOptions,
  QuestionPaginator,
  QuestionQueryOptions,
  // Refund,
  // RefundPaginator,
  // RegisterUserInput,
  // ResetPasswordUserInput,
  Review,
  ReviewPaginator,
  ReviewQueryOptions,
  ReviewResponse,
  // SendOtpCodeInputType,
  // Settings,
  Shop,
  ShopPaginator,
  ShopQueryOptions,
  // SocialLoginInputType,
  TagPaginator,
  TagQueryOptions,
  Type,
  TypeQueryOptions,
  UpdateReviewInput,
  // UpdateUserInput,
  User,
  // VerifiedCheckoutData,
  // VerifyCouponInputType,
  // VerifyCouponResponse,
  // VerifyForgotPasswordUserInput,
  // VerifyOtpInputType,
  Wishlist,
  WishlistPaginator,
  WishlistQueryOptions,
} from '@ts-types/custom.types';

import { API_ENDPOINTS } from './endpoints';
import { HttpClient } from './http';
import url from './server_url';
import { OTPVerifyResponse } from '@ts-types/custom.types';

class Client {
  
  products = {
    all: ({
      type,
      categories,
      name,
      shop_id,
      // author,
      // manufacturer,
      min_price,
      max_price,
      tags,
      ...params
    }: Partial<ProductQueryOptions>) =>
      HttpClient.get<ProductPaginator>(url + API_ENDPOINTS.PRODUCTS, {
        searchJoin: 'and',
        with: 'type',
        ...params,
        search: HttpClient.formatSearchParams({
          type,
          categories,
          name,
          shop_id,
          // author,
          // manufacturer,
          min_price,
          max_price,
          tags,
          status: 'publish',
        }),
      }),
    popular: (params: Partial<PopularProductQueryOptions>) =>
      HttpClient.get<Product[]>(url + API_ENDPOINTS.PRODUCTS_POPULAR, params),

    questions: ({ question, ...params }: QuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(url + API_ENDPOINTS.PRODUCTS_QUESTIONS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({
          question,
        }),
      }),

    get: (slug: string) =>
      HttpClient.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${slug}`),

    createFeedback: (input: CreateFeedbackInput) =>
      HttpClient.post<Feedback>(url + API_ENDPOINTS.FEEDBACK, input),
    createAbuseReport: (input: CreateAbuseReportInput) =>
      HttpClient.post<Review>(
        API_ENDPOINTS.PRODUCTS_REVIEWS_ABUSE_REPORT,
        input
      ),
    createQuestion: (input: CreateQuestionInput) =>
      HttpClient.post<Review>(url + API_ENDPOINTS.PRODUCTS_QUESTIONS, input),
  };
  myQuestions = {
    all: (params: MyQuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(url + API_ENDPOINTS.MY_QUESTIONS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  myReports = {
    all: (params: MyReportsQueryOptions) =>
      HttpClient.get<QuestionPaginator>(url + API_ENDPOINTS.MY_REPORTS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  reviews = {
    all: ({ rating, ...params }: ReviewQueryOptions) =>
      HttpClient.get<ReviewPaginator>(url + API_ENDPOINTS.PRODUCTS_REVIEWS, {
        searchJoin: 'and',
        with: 'user',
        ...params,
        search: HttpClient.formatSearchParams({
          rating,
        }),
      }),
    get: ({ id }: { id: string }) =>
      HttpClient.get<Review>(`${API_ENDPOINTS.PRODUCTS_REVIEWS}/${id}`),
    create: (input: CreateReviewInput) =>
      HttpClient.post<ReviewResponse>(url + API_ENDPOINTS.PRODUCTS_REVIEWS, input),
    update: (input: UpdateReviewInput) =>
      HttpClient.put<ReviewResponse>(
        `${API_ENDPOINTS.PRODUCTS_REVIEWS}/${input.id}`,
        input
      ),
  };
  categories = {
    all: ({ type, ...params }: Partial<CategoryQueryOptions>) =>
      HttpClient.get<CategoryPaginator>(url + API_ENDPOINTS.CATEGORIES, {
        searchJoin: 'and',
        ...params,
        ...(type && { search: HttpClient.formatSearchParams({ type }) }),
      }),
  };
  tags = {
    all: (params: Partial<TagQueryOptions>) =>
      HttpClient.get<TagPaginator>(url + API_ENDPOINTS.TAGS, params),
  };
  types = {
    all: (params?: Partial<TypeQueryOptions>) =>
      HttpClient.get<Type[]>(url + API_ENDPOINTS.TYPES, params),
    get: (slug: string) =>
      HttpClient.get<Type>(`${API_ENDPOINTS.TYPES}/${slug}`),
  };
  shops = {
    all: (params: Partial<ShopQueryOptions>) =>
      HttpClient.get<ShopPaginator>(url + API_ENDPOINTS.SHOPS, {
        search: HttpClient.formatSearchParams({
          is_active: '1',
        }),
        ...params,
      }),
    get: (slug: string) =>
      HttpClient.get<Shop>(`${API_ENDPOINTS.SHOPS}/${slug}`),
  };
  // authors = {
  //   all: (params: Partial<AuthorQueryOptions>) =>
  //     HttpClient.get<AuthorPaginator>(url + API_ENDPOINTS.AUTHORS, params),
  //   top: (params: Pick<QueryOptions, 'limit'>) =>
  //     HttpClient.get<Author[]>(url + API_ENDPOINTS.AUTHORS_TOP, params),
  //   get: (slug: string) =>
  //     HttpClient.get<Author>(`${API_ENDPOINTS.AUTHORS}/${slug}`),
  // };
  // manufacturers = {
  //   all: (params: Partial<ManufacturerQueryOptions>) =>
  //     HttpClient.get<ManufacturerPaginator>(
  //       API_ENDPOINTS.MANUFACTURERS,
  //       params
  //     ),
  //   top: (params: Pick<QueryOptions, 'limit'>) =>
  //     HttpClient.get<Manufacturer[]>(url + API_ENDPOINTS.MANUFACTURERS_TOP, params),
  //   get: (slug: string) =>
  //     HttpClient.get<Manufacturer>(`${API_ENDPOINTS.MANUFACTURERS}/${slug}`),
  // };
  // coupons = {
  //   all: (params: Partial<CouponQueryOptions>) =>
  //     HttpClient.get<CouponPaginator>(url + API_ENDPOINTS.COUPONS, params),
  //   verify: (input: VerifyCouponInputType) =>
  //     HttpClient.post<VerifyCouponResponse>(
  //       API_ENDPOINTS.COUPONS_VERIFY,
  //       input
  //     ),
  // };
  orders = {
    all: (params: Partial<OrderQueryOptions>) =>
      HttpClient.get<OrderPaginator>(url + API_ENDPOINTS.ORDERS, {
        with: 'refund',
        ...params
      }),
    get: (tracking_number: string) =>
      HttpClient.get<Order>(`${API_ENDPOINTS.ORDERS}/${tracking_number}`),
    create: (input: CreateOrderInput) =>
      HttpClient.post<Order>(url + API_ENDPOINTS.ORDERS, input),
    statuses: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<OrderStatusPaginator>(url + API_ENDPOINTS.ORDERS_STATUS, params),
    refunds: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<RefundPaginator>(url + API_ENDPOINTS.ORDERS_REFUNDS, params),
    createRefund: (input: CreateRefundInput) =>
      HttpClient.post<Refund>(url + API_ENDPOINTS.ORDERS_REFUNDS, input),

    downloadable: (query?: OrderQueryOptions) =>
      HttpClient.get<DownloadableFilePaginator>(
        API_ENDPOINTS.ORDERS_DOWNLOADS,
        query
      ),
    verify: (input: CheckoutVerificationInput) =>
      HttpClient.post<VerifiedCheckoutData>(
        API_ENDPOINTS.ORDERS_CHECKOUT_VERIFY,
        input
      ),
    generateDownloadLink: (input: { digital_file_id: string }) =>
      HttpClient.post<string>(
        API_ENDPOINTS.GENERATE_DOWNLOADABLE_PRODUCT_LINK,
        input
      ),
  };
  users = {
    me: () => HttpClient.get<User>(url + API_ENDPOINTS.USERS_ME),
    update: (user: UpdateUserInput) =>
      HttpClient.put<User>(`${API_ENDPOINTS.USERS}/${user.id}`, user),
    login: (input: LoginUserInput) =>
      HttpClient.post<AuthResponse>(url + API_ENDPOINTS.USERS_LOGIN, input),
    socialLogin: (input: SocialLoginInputType) =>
      HttpClient.post<AuthResponse>(url + API_ENDPOINTS.SOCIAL_LOGIN, input),
    sendOtpCode: (input: SendOtpCodeInputType) =>
      HttpClient.post<OTPResponse>(url + API_ENDPOINTS.SEND_OTP_CODE, input),
    verifyOtpCode: (input: VerifyOtpInputType) =>
      HttpClient.post<OTPVerifyResponse>(url + API_ENDPOINTS.VERIFY_OTP_CODE, input),
    OtpLogin: (input: OtpLoginInputType) =>
      HttpClient.post<AuthResponse>(url + API_ENDPOINTS.OTP_LOGIN, input),
    register: (input: RegisterUserInput) =>
      HttpClient.post<AuthResponse>(url + API_ENDPOINTS.USERS_REGISTER, input),
    forgotPassword: (input: ForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_FORGOT_PASSWORD,
        input
      ),
    verifyForgotPasswordToken: (input: VerifyForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_VERIFY_FORGOT_PASSWORD_TOKEN,
        input
      ),
    resetPassword: (input: ResetPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_RESET_PASSWORD,
        input
      ),
    changePassword: (input: ChangePasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_CHANGE_PASSWORD,
        input
      ),
    logout: () => HttpClient.post<boolean>(url + API_ENDPOINTS.USERS_LOGOUT, {}),
    deleteAddress: ({ id }: { id: string }) =>
      HttpClient.delete<boolean>(`${API_ENDPOINTS.USERS_ADDRESS}/${id}`),
    subscribe: (input: { email: string }) =>
      HttpClient.post<any>(url + API_ENDPOINTS.USERS_SUBSCRIBE_TO_NEWSLETTER, input),
    contactUs: (input: CreateContactUsInput) =>
      HttpClient.post<any>(url + API_ENDPOINTS.USERS_CONTACT_US, input),
  };
  wishlist = {
    all: (params: WishlistQueryOptions) =>
      HttpClient.get<WishlistPaginator>(url + API_ENDPOINTS.USERS_WISHLIST, {
        with: 'shop',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
    toggle: (input: { product_id: string }) =>
      HttpClient.post<{ in_wishlist: boolean }>(
        url +  API_ENDPOINTS.USERS_WISHLIST_TOGGLE,
        input
      ),
    remove: (id: string) =>
      HttpClient.delete<Wishlist>(`${url + API_ENDPOINTS.WISHLIST}/${id}`),
    checkIsInWishlist: ({ product_id }: { product_id: string }) =>
      HttpClient.get<boolean>(
        `${url + API_ENDPOINTS.WISHLIST}/in_wishlist/${product_id}`
      ),
  };
  settings = {
    all: () => HttpClient.get<Settings>(url + API_ENDPOINTS.SETTINGS),
    upload: (input: File[]) => {
      let formData = new FormData();
      input.forEach((attachment) => {
        formData.append('attachment[]', attachment);
      });
      return HttpClient.post<Attachment[]>(url + API_ENDPOINTS.UPLOADS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  };
}

export default new Client();
