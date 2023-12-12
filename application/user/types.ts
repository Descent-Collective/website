type User = {
  healthFactor: string;
  depositedCollateral: string;
  collateralLocked: number;
  borrowedAmount: string;
  accruedFees: string;
  currentCollateralRatio: string;
  availableCollateral: string;
  availablexNGN: string;
  hasSetupVault: boolean;
};

const defaultUser: User = {
  healthFactor: "0.0",
  depositedCollateral: "0.0",
  collateralLocked: 0,
  borrowedAmount: "0.0",
  accruedFees: "0.0",
  currentCollateralRatio: "0.0",
  availableCollateral: "0.0",
  availablexNGN: "0.0",
  hasSetupVault: false,
};

export type { User };
export { defaultUser };
