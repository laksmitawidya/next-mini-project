export type UserResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UsersResponseProps = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserResponse[];
};
