import { SignUser, SignUserResponse } from "./types";

const useUserApi = () => {
  const signUser = async (
    data: SignUser
  ): Promise<SignUserResponse | undefined> => {
    return;
  };

  return {
    signUser,
  };
};

export default useUserApi;
