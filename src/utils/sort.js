const selectSort = (accounts, param) => {
  switch (param) {
    case 'account':
      // eslint-disable-next-line no-use-before-define
      return sortByNumber(accounts);
    case 'balance':
      // eslint-disable-next-line no-use-before-define
      return sortByBalance(accounts);
    case 'date':
      // eslint-disable-next-line no-use-before-define
      return sortByCreationDate(accounts);
    case 'last':
      // eslint-disable-next-line no-use-before-define
      return sortByLastTransaction(accounts);
    default:
      return accounts;
  }
};

const sortByNumber = accounts => [...accounts].sort(
  (acc1, acc2) => +acc1.account - +acc2.account);

const sortByBalance = accounts => [...accounts].sort(
  (acc1, acc2) => acc1.balance - acc2.balance);

const sortByCreationDate = accounts => [...accounts].sort((acc1, acc2) => {
  const time1 = new Date(acc1.date).getTime();
  const time2 = new Date(acc2.date).getTime();
  return time1 - time2;
});

const sortByLastTransaction = accounts => [...accounts].sort((acc1, acc2) => {
  const time1 = new Date(acc1.transactions[0].date).getTime();
  const time2 = new Date(acc2.transactions[0].date).getTime();
  return time1 - time2;
});

export default selectSort;
