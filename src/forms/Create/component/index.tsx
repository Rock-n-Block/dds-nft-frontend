import React from 'react';
import { Form, Input, Switch } from 'antd';
import BigNumber from 'bignumber.js/bignumber';
import { FieldArray, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';

import { Button, InputNumber } from '../../../components/atoms';
import { NFTCard } from '../../../components/molecules';
import { ChooseCollection, Uploader } from '../../../components/organisms';
import { useMst } from '../../../store/store';
import { validateField } from '../../../utils/validate';

interface IProperti {
  size: string | number;
  amount: string | number;
}

export interface ICreateForm {
  img: any;
  preview: string;
  putOnSale: boolean;
  instantSalePrice: boolean;
  // unlockOncePurchased: boolean;
  instantSalePriceEth: number | string;
  // digitalKey: string;
  tokenName: string;
  tokenDescr: string;
  tokenRoyalties: number | string;
  numberOfCopies: number | string;
  tokenProperties: IProperti[];
  isSingle?: boolean;
  isLoading: boolean;
  collectionId: string;
  ethRate?: number;
  bid: string;
}

const { TextArea } = Input;

const CreateForm: React.FC<FormikProps<ICreateForm> & ICreateForm> = observer(
  ({
    setFieldValue,
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSingle,
  }) => {
    const { user } = useMst();
    const serviceFee = 2.5; // TODO: remove after get service fee request
    const onSubmit = () => {
      handleSubmit();
    };
    const handleChangeProperty = (e: any, index: any, type: any) => {
      const localProperties = [...values.tokenProperties];

      if (type === 'size') {
        localProperties[index].size = e.target.value;
      }
      if (type === 'amount') {
        localProperties[index].amount = e.target.value;
      }
      if (
        localProperties[localProperties.length - 1].size &&
        localProperties[localProperties.length - 1].amount
      ) {
        localProperties.push({
          size: '',
          amount: '',
        });
      }
      setFieldValue('tokenProperties', localProperties);
      handleChange(e);
    };
    return (
      <Form name="form-create" className="form-create" layout="vertical">
        <div className="form-create__content">
          <div className="form-create__choose">
            <ChooseCollection isSingle={isSingle} />
          </div>
          <div className="form-create__upload">
            <div className="form-create__upload-title text-bold text-lg">Upload file</div>
            <div className="form-create__upload-item">
              <Form.Item
                name="img"
                className="form-create__item input__field"
                validateStatus={validateField('img', touched, errors)}
                help={!touched.img ? false : errors.img}
              >
                <Uploader>
                  <span className="text-gray-l text-smd text-bold">PNG, GIF, WEBP. Max 30mb.</span>
                </Uploader>
              </Form.Item>
            </div>
          </div>
          <div className="form-create__box box-outline">
            <div className="form-create__switch">
              <div className="form-create__switch-box">
                <div className="form-create__switch-title text-bold text-md">Put on sale</div>
                <div className="form-create__switch-subtitle text-gray-l text-bold">
                  You???ll receive bids on this item
                </div>
              </div>
              <div className="form-create__switch-box">
                <Switch
                  checked={values.putOnSale}
                  defaultChecked={values.putOnSale}
                  onChange={(value) => setFieldValue('putOnSale', value)}
                />
              </div>
            </div>

            {values.putOnSale && !values.instantSalePrice ? (
              <>
                <Form.Item
                  name="bid"
                  className="form-create__item input__field"
                  validateStatus={validateField('bid', touched, errors)}
                  help={!touched.bid ? false : errors.bid}
                  label={<span className="input__label text-bold">Minimum bid</span>}
                >
                  <div className="input__field-create box-shadow">
                    <InputNumber
                      id="bid"
                      className="form-create__input input__create text-bold text-smd"
                      value={values.bid}
                      size="large"
                      placeholder="Enter minimun bid"
                      positiveOnly
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-purple text-bold text-upper">weth</span>
                  </div>
                </Form.Item>
                <div className="text-gray-l text-bold form-create__item-text">
                  Bids below this amount won???t be accepted.
                </div>{' '}
              </>
            ) : (
              ''
            )}
            {values.putOnSale ? (
              <div className="form-create__switch form-create__switch-instant-sale">
                <div className="form-create__switch-box">
                  <div className="form-create__switch-title text-bold text-md">
                    Instant sale price
                  </div>
                  <div className="form-create__switch-subtitle text-gray-l text-bold">
                    Enter the price for which the item will be instantly sold
                  </div>
                </div>
                <div className="form-create__switch-box">
                  <Switch
                    checked={values.instantSalePrice}
                    defaultChecked={values.instantSalePrice}
                    onChange={(value) => setFieldValue('instantSalePrice', value)}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            {values.instantSalePrice && values.putOnSale && (
              <>
                <Form.Item
                  name="instantSalePriceEth"
                  className="form-create__item input__field"
                  validateStatus={validateField('instantSalePriceEth', touched, errors)}
                  help={!touched.instantSalePriceEth ? false : errors.instantSalePriceEth}
                  label={<span className="input__label text-bold">Enter price for one piece</span>}
                >
                  <div className="input__field-create box-shadow">
                    <InputNumber
                      id="instantSalePriceEth"
                      className="form-create__input input__create text-bold text-smd"
                      value={values.instantSalePriceEth}
                      size="large"
                      placeholder="10"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      positiveOnly
                    />
                    <span className="text-purple text-bold text-upper">weth</span>
                  </div>
                </Form.Item>
                <div className="text-gray-l text-bold form-create__item-text">
                  Service fee {serviceFee}%
                </div>
                <div className="form-create__item-text">
                  <div className="text-gray-l text-bold">You will receive</div>
                  <div className="box-shadow form-create__item-eth">
                    <span className="text-grad text-bold">
                      {new BigNumber(+values.instantSalePriceEth)
                        .multipliedBy(new BigNumber(100 - serviceFee))
                        .dividedBy(100)
                        .toFixed(5) === '0.00000'
                        ? '0'
                        : new BigNumber(+values.instantSalePriceEth)
                            .multipliedBy(new BigNumber(100 - serviceFee))
                            .dividedBy(100)
                            .toFixed()}{' '}
                      WETH
                    </span>
                  </div>
                  {values.ethRate ? (
                    <div className="text-gray-l text-bold">
                      ${' '}
                      {new BigNumber(+values.instantSalePriceEth)
                        .multipliedBy(new BigNumber(100 - serviceFee))
                        .dividedBy(100)
                        .multipliedBy(values.ethRate)
                        .toFixed(2)}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </>
            )}
          </div>
          {/*  <div className="form-create__box box-outline">
            <div className="form-create__switch">
              <div className="form-create__switch-box">
                <div className="form-create__switch-title text-bold text-md">
                  Unlock once purchased
                </div>
                <div className="form-create__switch-subtitle text-gray-l text-bold">
                  Content will be unlocked after successful transaction
                </div>
              </div>
              <div className="form-create__switch-box">
                <Switch
                  checked={values.unlockOncePurchased}
                  defaultChecked={values.unlockOncePurchased}
                  onChange={(value) => setFieldValue('unlockOncePurchased', value)}
                />
              </div>
            </div>
            {values.unlockOncePurchased && (
              <>
                <Form.Item
                  name="digitalKey"
                  className="form-create__item input__field"
                  validateStatus={validateField('digitalKey', touched, errors)}
                  help={!touched.digitalKey ? false : errors.digitalKey}
                  label={
                    <span className="input__label text-bold">Digital key, code to redeem</span>
                  }
                >
                  <div className="input__field-create box-shadow">
                    <Input
                      id="digitalKey"
                      className="form-create__input input__create text-bold text-smd"
                      size="large"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </Form.Item>
                <div className="text-gray-l text-bold form-create__item-text">
                  Tip: Markdown syntax is supported
                </div>
              </>
            )}
          </div> */}
          <Form.Item
            name="tokenName"
            className="form-create__field input__field"
            validateStatus={validateField('tokenName', touched, errors)}
            help={!touched.tokenName ? false : errors.tokenName}
            label={<span className="input__label text-bold">Name</span>}
          >
            <div className="input__field-create box-shadow">
              <Input
                id="tokenName"
                className="form-create__input input__create text-bold text-smd"
                size="large"
                placeholder='e. g. "Redeemable T-Shirt with logo"'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="tokenDescr"
            className="form-create__field input__field"
            validateStatus={validateField('tokenDescr', touched, errors)}
            help={!touched.tokenDescr ? false : errors.tokenDescr}
            label={<span className="input__label text-bold">Description</span>}
          >
            <div className="input__field-create box-shadow">
              <TextArea
                id="tokenDescr"
                rows={2}
                className="form-create__input input__create text-bold text-smd"
                size="large"
                placeholder='e. g. "After purchasing you???ll be able to get the real T-Shirt"'
                onChange={(e: any) => setFieldValue('tokenDescr', e.target.value)}
                onBlur={handleBlur}
              />
            </div>
          </Form.Item>
          <div className="form-create__wrapper">
            <Form.Item
              name="tokenRoyalties"
              className="form-create__field input__field"
              validateStatus={validateField('tokenRoyalties', touched, errors)}
              help={!touched.tokenRoyalties ? false : errors.tokenRoyalties}
              label={<span className="input__label text-bold">Royalties</span>}
            >
              <div className="input__field-create box-shadow">
                <InputNumber
                  id="tokenRoyalties"
                  className="form-create__input input__create text-bold text-smd"
                  size="large"
                  value={values.tokenRoyalties}
                  placeholder="10"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  positiveOnly
                  integer
                  max={99}
                />
                <span className="text-md text-gray-l text-bold">%</span>
              </div>
              <div className="text-gray-l text-bold form-create__item-text">
                Suggested: 10%, 20%, 30%
              </div>
            </Form.Item>
            {!isSingle ? (
              <Form.Item
                name="numberOfCopies"
                className="form-create__field input__field"
                validateStatus={validateField('numberOfCopies', touched, errors)}
                help={!touched.numberOfCopies ? false : errors.numberOfCopies}
                label={<span className="input__label text-bold">Number of copies</span>}
              >
                <div className="input__field-create box-shadow">
                  <InputNumber
                    id="numberOfCopies"
                    className="form-create__input input__create text-bold text-smd"
                    size="large"
                    value={values.numberOfCopies}
                    placeholder="e. g. 10"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    positiveOnly
                    integer
                  />
                </div>
                <div className="text-gray-l text-bold form-create__item-text">Amount of tokens</div>
              </Form.Item>
            ) : (
              ''
            )}
          </div>
          <FieldArray
            name="tokenProperties"
            render={() => {
              return values.tokenProperties?.map((item: any, index: any) => (
                <div className="form-create__wrapper">
                  <Form.Item
                    name={`tokenProperties[${index}].size`}
                    className="form-create__field input__field"
                    validateStatus={validateField(`tokenProperties`, touched, errors)}
                    label={<span className="input__label text-bold">Properties</span>}
                    help={(() => {
                      return errors.tokenProperties &&
                        errors.tokenProperties[index] &&
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line no-param-reassign
                        errors.tokenProperties[index].size
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          // eslint-disable-next-line no-param-reassign
                          errors.tokenProperties[index].size
                        : false;
                    })()}
                  >
                    <div className="input__field-create box-shadow">
                      <Input
                        id={`tokenProperties[${index}].size`}
                        className="form-create__input input__create text-bold text-smd"
                        size="large"
                        placeholder="e. g. Size"
                        onChange={(e) => handleChangeProperty(e, index, 'size')}
                        onBlur={handleBlur}
                      />
                      <span className="text-md text-gray-l text-bold">%</span>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name={`tokenProperties[${index}].amount`}
                    className="form-create__field input__field"
                    validateStatus={validateField(`tokenProperties`, touched, errors)}
                    label={<span className="input__label text-bold" />}
                    help={(() => {
                      return errors.tokenProperties &&
                        errors.tokenProperties[index] &&
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line no-param-reassign
                        errors.tokenProperties[index].amount
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          // eslint-disable-next-line no-param-reassign
                          errors.tokenProperties[index].amount
                        : false;
                    })()}
                  >
                    <div className="input__field-create box-shadow">
                      <Input
                        id={`tokenProperties[${index}].amount`}
                        className="form-create__input input__create text-bold text-smd"
                        size="large"
                        placeholder="e. g. M"
                        onChange={(e) => handleChangeProperty(e, index, 'amount')}
                        onBlur={handleBlur}
                      />
                      <span className="text-md text-gray-l text-bold">%</span>
                    </div>
                  </Form.Item>
                </div>
              ));
            }}
          />
          <Button
            className="form-create__submit-btn"
            colorScheme="gradient"
            size="lg"
            onClick={onSubmit}
            loading={values.isLoading}
          >
            Create item
          </Button>
        </div>
        <div className="form-create__card">
          <div className="form-create__upload-title text-bold text-lg">Preview</div>
          <NFTCard
            disableLinks
            img={values.preview}
            name={values.tokenName}
            artist={{
              id: user.id ?? 0,
              name: user.display_name || user.address,
              avatar: user.avatar ? user.avatar : '',
            }}
            owners={[
              {
                id: user.id ?? 0,
                name: user.display_name || user.address,
                avatar: user.avatar ? user.avatar : '',
              },
            ]}
            price={values.instantSalePrice ? +values.instantSalePriceEth || 0 : null}
            available={isSingle ? 1 : +values.numberOfCopies}
            total_supply={isSingle ? 1 : +values.numberOfCopies}
            selling={values.putOnSale}
          />
        </div>
      </Form>
    );
  },
);

export default CreateForm;
