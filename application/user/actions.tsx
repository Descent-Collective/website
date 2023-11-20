"use client";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setLoading, setUser } from ".";
import { SignUser } from "./types";
import { CallbackProps } from "../store";
import useUserApi from "./api";

const useUserActions = () => {
  const { dispatch } = useSystemFunctions();
  const { signUser } = useUserApi();

  const sign = async (data: SignUser, callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const response = await signUser(data);

      await dispatch(setUser(response));
      callback?.onSuccess?.(response);

      return;
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    sign,
  };
};

export default useUserActions;
