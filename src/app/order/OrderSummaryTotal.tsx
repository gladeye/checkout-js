import { LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { Fragment, FunctionComponent } from 'react';

import { withCurrency, TranslatedString, WithCurrencyProps } from '../locale';

import OrderSummaryPrice from './OrderSummaryPrice';

export interface OrderSummaryTotalProps {
    orderAmount: number;
    shippingAmount: number | undefined;
    shopperCurrencyCode: string;
    lineItems: LineItemMap;
    storeCurrencyCode: string;
}

const OrderSummaryTotal: FunctionComponent<OrderSummaryTotalProps & WithCurrencyProps> = ({
    shopperCurrencyCode,
    shippingAmount,
    storeCurrencyCode,
    orderAmount,
    lineItems,
    currency,
}) => {

    const hasDifferentCurrency = shopperCurrencyCode !== storeCurrencyCode;
    const label = <Fragment>
        { hasDifferentCurrency ?
            <TranslatedString id="cart.estimated_total_text" /> :
            <TranslatedString id="cart.total_text" /> }
        { ` (${shopperCurrencyCode})` }
    </Fragment>;

    return (
        <Fragment>
            <OrderSummaryPrice
                amount={ orderAmount }
                lineItems={lineItems}
                shippingAmount={shippingAmount}
                className="cart-priceItem--total"
                label={ label }
                superscript={ hasDifferentCurrency ? '*' : undefined }
                testId="cart-total"
            />
            { hasDifferentCurrency && currency && <p
                className="cart-priceItem--totalNote"
                data-test="cart-price-item-total-note"
            >
                <TranslatedString
                    data={ {
                        total: currency.toStoreCurrency(orderAmount),
                        code: storeCurrencyCode,
                    } }
                    id="cart.billed_amount_text"
                />
            </p> }
        </Fragment>
    );
};

export default withCurrency(OrderSummaryTotal);
