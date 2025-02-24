import { Checkout, ShopperCurrency, StoreCurrency } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent } from 'react';

import { withCheckout } from '../checkout';
import OrderSummary from '../order/OrderSummary';
import withRecurly from '../recurly/withRecurly';

import mapToCartSummaryProps from './mapToCartSummaryProps';
import withRedeemable from './withRedeemable';
import EditLink from './EditLink';
import { RedeemableProps } from './Redeemable';

export type WithCheckoutCartSummaryProps = {
    checkout: Checkout;
    cartUrl: string;
    storeCurrency: StoreCurrency;
    shopperCurrency: ShopperCurrency;
    storeCreditAmount?: number;
    hasSubscription?: boolean;
} & RedeemableProps;

const CartSummary: FunctionComponent<WithCheckoutCartSummaryProps> = ({
    cartUrl,
    ...props
}) => {

    return (
        withRedeemable(OrderSummary)({
            ...props,
            cartUrl,
            headerLink: (
                <EditLink url={ cartUrl } />
            ),
        })
    );
};

export default withCheckout(mapToCartSummaryProps)(withRecurly(({hasSubscription}) => ({hasSubscription}) )(CartSummary));
