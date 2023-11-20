type User = {
  id: string;
  name: string;
};

type SignUser = {
  id: string;
};

type SignUserResponse = {
  id: string;
  name: string;
};

export type { User, SignUser, SignUserResponse };
