export enum PATH {
  PRODUCTS = "products",
  CATEGORIES = "categories",
  ORDERS = "orders",
  COUPONS = "coupons",
  USERS = "users",
  ME = "me",
  TOKEN = "token",
  REGISTER = "register",
  CHECKOUT = "checkout/verify",
  EVENTS = "events",
  ADDRESS = "address",
  TYPE = "types",
  CHANGE_PASSWORD = "Change Password",
  FORGET_PASSWORD = "forget-password",
  VERIFY_FORGET_PASSWORD_TOEKN = "verify-forget-password-token",
  RESET_PASSWORD = "reset-password",
  LOGOUT = "logout",
  ANALYTICS = "analytics",
}

export enum LIMIT {
  TEN = 10,
}

export enum PRODUCT_STATUS {
  PUBLISH = "publish",
  DRAFT = "draft",
}

export interface ReviewQueryOptions extends QueryOptions {
  product_id: string;
  rating?: string;
  orderBy?: string;
  sortedBy?: string;
}
export interface QuestionQueryOptions extends QueryOptions {
  product_id: string;
  question?: string;
}
export interface MyQuestionQueryOptions extends QueryOptions {}
export interface MyReportsQueryOptions extends QueryOptions {}
export interface WishlistQueryOptions extends QueryOptions {}

export interface Attachment {
  id: number;
  original: string;
  thumbnail: string;
  __typename?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  is_digital: boolean;
  product_type: string;
  description: string;
  price: number;
  sale_price: number;
  min_price: number;
  max_price: number;
  unit: string;
  quantity: number;
  image: Attachment;
  gallery: Attachment[];
  total_reviews: number;
  ratings: number;
  in_wishlist: boolean;
  variations: object[];
  variation_options: object[];
  rating_count: RatingCount[];
  related_products: Product[];
  created_at: string;
  updated_at: string;
}

export interface RatingCount {
  rating: number;
  total: number;
}

export interface CreateReviewInput {
  product_id: string;
  shop_id: string;
  order_id: string;
  variation_option_id: string;
  comment?: string;
  rating: number;
  photos?: Attachment[];
}
export interface UpdateReviewInput extends CreateReviewInput {
  id: string;
}
export interface ReviewResponse {
  product_id: string;
}

export interface CreateFeedbackInput {
  model_id: string;
  model_type: string;
  positive?: boolean;
  negative?: boolean;
}
export interface CreateQuestionInput {
  question: string;
  product_id: string;
  shop_id: string;
}
export interface CreateAbuseReportInput {
  model_id: string;
  model_type: string;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wallet: {
    total_points: number;
    points_used: number;
    available_points: number;
  };
  profile: {
    id?: string;
    contact?: string;
    bio?: string;
    avatar?: Attachment;
  };
  address: Address[];
}

export interface Feedback {
  id: string;
  user_id: string;
  model_type: string;
  model_id: string;
  positive: boolean;
  negative: boolean;
  created_at: string;
  updated_at: string;
}


export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  photos: Attachment[];
  user: User;
  product: Product;
  shop: Shop;
  feedbacks: Feedback[];
  positive_feedbacks_count: number;
  negative_feedbacks_count: number;
  my_feedback: Feedback;
  created_at: string;
  updated_at: string;
}
export interface Question {
  id: string;
  answer: string;
  my_feedback: Feedback;
  negative_feedbacks_count: number;
  positive_feedbacks_count: number;
  question: string;
  created_at: string;
  updated_at: string;
  product: Product;
}
export interface Wishlist {
  id: string;
  product: Product;
  product_id: string;
  user: User[];
  user_id: string;
}


export enum SHOP_TYPE {
  GROCERY = "grocery",
  MAKEUP = "makeup",
  BAGS = "bags",
  BOOK = "book",
  MEDICINE = "medicine",
  FURNITURE = "furniture",
  CLOTHING = "clothing",
  BAKERY = "bakery",
}

export enum SORT_TYPE {
  ASC = "asc",
  DESC = "desc",
}
export enum SEARCH_JOIN {
  AND = "and",
  OR = "or",
}
