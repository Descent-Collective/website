const formatAddress = (address: string) => {
  if (!address || address.length < 9) {
    return address || "Invalid address";
  }

  const firstFour = address.substring(0, 4);
  const lastFour = address.substring(address.length - 4);

  return `${firstFour}...${lastFour}`;
};

export { formatAddress };
