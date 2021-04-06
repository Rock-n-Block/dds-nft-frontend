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
    password: (value: string): void => {
      if (!value) {
        errCopy.password = 'Enter your password';
      }
    },
    full_address: (value: string): void => {
      if (!value) {
        errCopy.full_address = 'Enter your full address';
      }
    },
    new_password: (value: string): void => {
      if (!value) {
        errCopy.new_password = 'Enter your password';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
        errCopy.new_password = 'Your password too light';
      }
    },
    confirm_new_password: (value: string): void => {
      if (values.new_password && !value) {
        errCopy.confirm_new_password = 'Repeat your password';
      } else if (values.new_password !== value) {
        errCopy.confirm_new_password = 'Passwords do not match';
      }
    },
    change_password: (value: string): void => {
      if (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
        errCopy.change_password = 'Your password too light';
      }
    },
    username: (value: string): void => {
      if (!value) {
        errCopy.username = 'Enter your name';
      }
    },
    code: (value: string): void => {
      if (!value) {
        errCopy.code = 'Enter your code';
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
    review: (value: string): void => {
      if (!value) {
        errCopy.review = 'Enter your review';
      }
    },
    rate: (value: number): void => {
      if (!value) {
        errCopy.rate = 'Enter your rate';
      }
    },
    street: (value: number): void => {
      if (!value) {
        errCopy.street = 'Enter your street address';
      }
    },
    town: (value: number): void => {
      if (!value) {
        errCopy.town = 'Enter your town/city';
      }
    },
    save_shipping: (value: boolean): void => {
      if (!value) {
        errCopy.save_shipping = 'Your shipping address is not completed';
      }
    },
    same_billing: (value: boolean): void => {
      if (!value) {
        errCopy.same_billing = 'Your billing address is not completed';
      }
    },
    country: (value: number): void => {
      if (!value) {
        errCopy.country = 'Enter your contry/region';
      }
    },
    current_password: (value: string): void => {
      if (!value) {
        errCopy.current_password = 'Enter your password';
      }
    },
    usernameOrEmail: (value: string): void => {
      if (!value) {
        errCopy.usernameOrEmail = 'Enter your username/email';
      }
    },
    confirm_password: (value: string): void => {
      if (values.change_password && !values.confirm_password) {
        errCopy.confirm_password = 'Повторите пароль';
      } else if (values.change_password !== value) {
        errCopy.confirm_password = 'Пароли не совпадают';
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
