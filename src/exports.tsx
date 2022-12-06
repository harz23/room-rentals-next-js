type currency = {
  name: string;
  symbol: string;
};

export const currencies: Array<currency> = [
  {
    name: "EUR",
    symbol: "€",
  },
  {
    name: "USD",
    symbol: "$",
  },
];

export const maxRoomsPerPage = 9