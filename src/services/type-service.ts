type Token = string;

type DetailMessageType = {
  type: string;
  message: string;
}

type UserData = {
  data: User | null;
}

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};


export type {Token, DetailMessageType, UserData, User};

