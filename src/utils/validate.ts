export const validateForm = ({ values, notRequired }: any) => {
  interface IRules {
    [key: string]: (value: any) => void;
  }
  const errCopy: any = {};

  const rules: IRules = {
    email: (value: string): void => {
      if (!value) {
        errCopy.email = 'Enter your email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errCopy.email = 'Incorrect address';
      }
    },
    tokenProperties: (value: any): void => {
      errCopy.tokenProperties = [{}];
      let err = false;
      value.forEach((item: any, index: number) => {
        if (item.size && !item.amount) {
          err = true;
          errCopy.tokenProperties[index] = {
            size: '',
            amount: 'err amount',
          };
        }
        if (item.amount && !item.size) {
          err = true;
          errCopy.tokenProperties[index] = {
            amount: '',
            size: 'err size',
          };
        }
        if (item.amount && item.size) {
          errCopy.tokenProperties[index] = {
            amount: '',
            size: '',
          };
          errCopy.tokenProperties.push({
            amount: '',
            size: '',
          });
        }
      });
      if (!err) {
        delete errCopy.tokenProperties;
      }
    },
    instantSalePriceEth: (value: string): void => {
      if (!value) {
        errCopy.instantSalePriceEth = '"Price" must be a number';
      }
    },

    numberOfCopies: (value: string): void => {
      if (!value) {
        errCopy.numberOfCopies = '"Number of copies" must be a number';
      }
    },

    tokenRoyalties: (value: string): void => {
      if (!value) {
        errCopy.tokenRoyalties = '"Royalties" must be a number';
      }
    },
    symbol: (value: string): void => {
      if (!value) {
        errCopy.symbol = '"Symbol" is not allowed to be empty';
      }
    },
    tokenName: (value: string): void => {
      if (!value) {
        errCopy.tokenName = '"Name" is not allowed to be empty';
      }
    },
    digitalKey: (value: string): void => {
      if (!value) {
        errCopy.digitalKey = '"Locked content" is required';
      }
    },
    full_address: (value: string): void => {
      if (!value) {
        errCopy.full_address = 'Enter your full address';
      }
    },
    username: (value: string): void => {
      if (!value) {
        errCopy.username = 'Enter your name';
      }
    },
    message: (value: string): void => {
      if (!value) {
        errCopy.message = 'Enter your message';
      }
    },
    firstname: (value: string): void => {
      if (!value) {
        errCopy.firstname = 'Enter your first name';
      }
    },
    lastname: (value: string): void => {
      if (!value) {
        errCopy.lastname = 'Enter your last name';
      }
    },
  };

  Object.keys(values).forEach(
    (key: any) => rules[key] && !notRequired.includes(key) && rules[key](values[key]),
  );

  return errCopy;
};

export const validateField = (key: any, touched: any, errors: any) => {
  if (touched[key]) {
    if (errors[key]) {
      return 'error';
    }
    return 'success';
  }
  return '';
};
