import { useEffect, useState } from 'react';

export const TRANSACTIONS_KEY = 'transactions';

const useAppLogic = () => {
  const [data, setData] = useState(null);

  const getDataFromLocalStorage = () =>
    window.localStorage.getItem(TRANSACTIONS_KEY) || null;

  const getAndSetData = () => {
    const transactions = getDataFromLocalStorage();
    if (transactions) {
      setData(JSON.parse(transactions));
    }
  };

  useEffect(() => {
    getAndSetData();
  }, []);

  const clearData = () => {
    setData(null);
    window.localStorage.clear();
  };

  return {
    data,
    setData,
    clearData,
    getAndSetData,
  };
};

export default useAppLogic;
