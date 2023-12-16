import useAlertActions from "@/application/alert/actions";
import React, { useState, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

type TransactionStatus = {
  type: "deposit" | "borrow" | "repay" | "withdraw";
  amount?: string;
  hash: `0x${string}`;
};

type Data = {
  [key: `0x${string}`]: {
    type: "deposit" | "borrow" | "repay" | "withdraw";
    amount?: string;
  };
};

const useTransactionListener = () => {
  const { alertUser } = useAlertActions();
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [data, setData] = useState<Data>();

  const {
    data: receipt,
    isError,
    isLoading,
  } = useWaitForTransaction({
    hash: transactionHash,
    enabled: !!transactionHash, // Only enable when transactionHash is not null
  });

  const listener = ({ hash, type, amount }: TransactionStatus) => {
    setTransactionHash(hash);
    setData({
      ...data,
      [hash]: {
        type,
        amount,
      },
    });
  };

  const checkTransactionStatus = async () => {
    const hashDetails = data?.[transactionHash!];
    if (!hashDetails) return;

    const { type, amount } = hashDetails;

    if (receipt) {
      switch (type) {
        case "deposit":
          return alertUser({
            title: "Bravo! Collateral deposited.",
            variant: "success",
            message: (
              <div>
                Your collateral deposit of{" "}
                <span className="text-black-100">
                  {Number(amount).toLocaleString()} USDC
                </span>{" "}
                was successful.
              </div>
            ),
          });

        case "borrow":
          return alertUser({
            title: "Bravo! xNGN borrowed.",
            variant: "success",
            message: (
              <div>
                Your loan of{" "}
                <span className="text-black-100">
                  {Number(amount).toLocaleString()} xNGN
                </span>{" "}
                has been successfully disbursed. Congratulations!
              </div>
            ),
          });

        case "repay":
          return alertUser({
            title: "Bravo! Loan Repayed.",
            variant: "success",
            message: (
              <div>
                Your loan of{" "}
                <span className="text-black-100">
                  {Number(amount).toLocaleString()} xNGN
                </span>{" "}
                has been repayed successfully. Congratulations!
              </div>
            ),
          });

        case "withdraw":
          return alertUser({
            title: "Bravo! Collateral Withdrawn.",
            variant: "success",
            message: (
              <div>
                Your withdrawal request of{" "}
                <span className="text-black-100">
                  {Number(amount).toLocaleString()} USDC
                </span>{" "}
                has been successful.
              </div>
            ),
          });
        default:
          break;
      }

      setTransactionHash(undefined);
      delete data?.[transactionHash!];
    }

    if (isError) {
      // There was an error with the transaction
      console.error("Transaction error");
    }

    if (isLoading) {
      // Transaction is still pending
      console.log("Transaction is pending");
    }
  };

  useEffect(() => {
    checkTransactionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt, isError, isLoading, transactionHash]);

  return { listener };
};

export default useTransactionListener;
