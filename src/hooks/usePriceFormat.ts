/* We could add into props currency, if we have one
 or we could make transitions transfer with some fixed converter integer.
 Here I will only add Czech crowns for simplicity
   */

export const useFormatPrice = () => {
  const formatPrice = Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  });
  return formatPrice;
};
