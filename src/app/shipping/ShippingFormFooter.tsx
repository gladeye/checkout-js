import React, { PureComponent, ReactNode } from 'react';

import { TranslatedString } from '../locale';
import { OrderComments } from '../orderComments';
import { Alert, AlertType } from '../ui/alert';
import { Button, ButtonVariant } from '../ui/button';
import { Fieldset, Legend } from '../ui/form';

import { ShippingOptions } from './shippingOption';

export interface ShippingFormFooterProps {
    cartHasChanged: boolean;
    isMultiShippingMode: boolean;
    shouldShowOrderComments: boolean;
    shouldShowShippingOptions?: boolean;
    shouldDisableSubmit: boolean;
    isLoading: boolean;
    consignments?: any;
}

class ShippingFormFooter extends PureComponent<ShippingFormFooterProps> {

    render(): ReactNode {
        const {
            cartHasChanged,
            isMultiShippingMode,
            shouldShowOrderComments,
            shouldShowShippingOptions = true,
            shouldDisableSubmit,
            isLoading,
            consignments
        } = this.props;

        const hasFreeShipping = consignments?.find((v: any) => v.selectedShippingOption?.cost === 0);

        return <>
            <Fieldset
                id="checkout-shipping-options"
                legend={
                    <>
                        <Legend>
                            <TranslatedString id="shipping.shipping_method_label" />
                        </Legend>

                        { cartHasChanged &&
                            <Alert type={ AlertType.Error }>
                                <strong>
                                    <TranslatedString id="shipping.cart_change_error" />
                                </strong>
                            </Alert> }
                    </>
                }
            >
                <ShippingOptions
                    isMultiShippingMode={ isMultiShippingMode }
                    isUpdatingAddress={ isLoading }
                    shouldShowShippingOptions={ shouldShowShippingOptions }
                />
            </Fieldset>
            {hasFreeShipping &&
                (<div className="free-shipping-wrapper">
                    <h6 className="free-shipping-label">Congratulations, your shipping is free!</h6>
                    <h5 className="free-shipping-heading">You’re just a step away from better health.</h5>
                    <div className="free-shipping-order">
                            <ul>
                                <li>
                                    <div className="shipping-icon">
                                    <svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32.6344 51.3104H32.4224C31.2491 51.2028 30.1304 50.7649 29.1958 50.0474C27.2783 48.7567 25.324 47.3463 23.3883 45.8436C20.9177 46.1939 18.7236 45.3274 17.857 43.6311C17.5363 42.9637 17.4178 42.217 17.5159 41.4831C17.5411 41.2567 17.649 41.0474 17.8194 40.8958C17.9895 40.7443 18.2098 40.6613 18.4378 40.6627H21.2034C23.0821 40.6982 24.923 40.133 26.4584 39.0494C26.2463 39.0494 26.0159 39.1416 25.7577 39.1785C24.9004 39.3894 23.997 39.3058 23.1926 38.9413C22.3885 38.5768 21.7301 37.9526 21.3235 37.1688C21.0218 36.6894 20.9572 36.0979 21.1483 35.5647C21.2983 35.2645 21.535 35.0164 21.8274 34.852C22.1199 34.6876 22.4549 34.6148 22.7892 34.6429C23.3821 34.5969 23.9688 34.4919 24.5408 34.3294C25.2015 34.1278 25.8508 33.8908 26.4859 33.6195C27.0759 33.3799 27.6936 33.1217 28.3758 32.9189C28.8942 32.7739 29.425 32.6783 29.9614 32.6331C31.1618 32.5473 32.3683 32.6468 33.5383 32.9281C34.0545 33.0295 34.4602 33.131 34.7828 33.2139C35.1054 33.2969 35.2437 33.343 35.3912 33.3891H35.548L35.8614 33.4813C36.6404 33.716 37.404 33.9992 38.1476 34.3294C39.3595 34.9004 40.5193 35.5759 41.6139 36.3483C42.389 36.8351 43.1924 37.2753 44.02 37.6665C46.4336 38.7904 49.0335 39.4592 51.69 39.6393C51.9854 39.6599 52.2529 39.821 52.4091 40.0726C52.5644 40.3256 52.5885 40.6378 52.4736 40.9115C51.7511 42.6598 50.7723 44.2909 49.5697 45.7514C48.6087 46.9324 47.5064 47.9912 46.2878 48.9042C46.0535 49.0813 45.7487 49.136 45.4674 49.0517L40.3786 47.5306C39.2257 48.3509 38.0251 49.102 36.7833 49.7799C34.5984 51.0153 33.5014 51.3103 32.6349 51.3103L32.6344 51.3104ZM23.6369 43.9354C23.8438 43.934 24.0451 44.0022 24.2085 44.129C26.209 45.6961 28.2371 47.1711 30.2285 48.5078C30.8901 49.0275 31.6866 49.3473 32.524 49.4297C32.8466 49.4297 33.5011 49.485 35.898 48.1667C37.1975 47.4517 38.4478 46.651 39.6408 45.7698C39.8746 45.5989 40.1749 45.5476 40.4521 45.6316L45.5222 47.1527C46.4784 46.3914 47.3528 45.5325 48.131 44.5899C48.9467 43.5923 49.6485 42.507 50.2237 41.3541C46.7856 40.9431 43.4839 39.7649 40.5624 37.9063C39.5515 37.2055 38.4847 36.5888 37.3727 36.0626C36.7238 35.7787 36.0588 35.5325 35.3815 35.3251L34.9943 35.2144L34.8284 35.1591L34.266 35.0301C33.9802 34.9563 33.593 34.8549 33.1229 34.7627C32.1221 34.519 31.0897 34.432 30.0622 34.5046C29.656 34.5297 29.2539 34.6008 28.8638 34.7166C28.277 34.8941 27.7013 35.1065 27.1399 35.3527C26.4408 35.6477 25.727 35.9063 25.0012 36.1271C24.3533 36.3113 23.6898 36.4348 23.0192 36.4959C23.3687 36.9528 23.8625 37.2777 24.4204 37.4177C24.7602 37.4481 25.1026 37.4231 25.4345 37.344C26.0957 37.2474 26.7408 37.0613 27.352 36.7909C27.98 36.5139 28.6443 36.3278 29.3248 36.2377C29.9641 36.1625 30.6093 36.1469 31.2515 36.1916L31.7309 36.2377C32.0603 36.2756 32.3444 36.4863 32.4763 36.7905C32.6082 37.0947 32.5677 37.4462 32.3703 37.7123C32.1728 37.9787 31.8483 38.1193 31.5189 38.0815H31.1225C30.7297 38.0538 30.3352 38.0538 29.9425 38.0815C28.9841 39.4366 27.7209 40.5481 26.255 41.3265C24.6705 42.1688 22.8955 42.5879 21.1018 42.5433H19.3595C19.384 42.6501 19.4246 42.7527 19.4793 42.8476C20.0048 43.8801 21.6826 44.3687 23.4526 44.0276L23.6369 43.9354Z" fill="#D40449"/>
                                    <path d="M22.5031 42.4063H11.9844C11.7399 42.4063 11.5054 42.3091 11.3325 42.1362C11.1597 41.9634 11.0625 41.7289 11.0625 41.4844V11.0625C11.0625 10.818 11.1597 10.5835 11.3325 10.4107C11.5054 10.2378 11.7399 10.1406 11.9844 10.1406H44.25C44.4945 10.1406 44.729 10.2378 44.9019 10.4107C45.0747 10.5835 45.1719 10.818 45.1719 11.0625V13.8281C45.1719 14.1575 44.9962 14.4617 44.711 14.6265C44.4258 14.7911 44.0743 14.7911 43.7891 14.6265C43.5039 14.4617 43.3281 14.1575 43.3281 13.8281V11.9844H12.9063V40.5625H22.5031C22.8325 40.5625 23.1367 40.7382 23.3015 41.0235C23.4661 41.3087 23.4661 41.6601 23.3015 41.9453C23.1367 42.2305 22.8325 42.4063 22.5031 42.4063Z" fill="#D40449"/>
                                    <path d="M44.25 39.7513C44.0055 39.7513 43.771 39.6541 43.5982 39.4812C43.4253 39.3084 43.3281 39.0739 43.3281 38.8294V35.9531C43.3281 35.6238 43.5039 35.3195 43.7891 35.1548C44.0743 34.9902 44.4257 34.9902 44.7109 35.1548C44.9961 35.3195 45.1719 35.6238 45.1719 35.9531V38.8663C45.1623 39.1042 45.0611 39.3295 44.8892 39.4945C44.7173 39.6594 44.4882 39.7515 44.25 39.7513Z" fill="#D40449"/>
                                    <path d="M31.8049 19.3594H24.4299C24.1855 19.3594 23.951 19.2622 23.7781 19.0894C23.6052 18.9165 23.5081 18.682 23.5081 18.4375V11.0625C23.5081 10.818 23.6052 10.5835 23.7781 10.4107C23.9509 10.2378 24.1854 10.1406 24.4299 10.1406H31.8049C32.0494 10.1406 32.2839 10.2378 32.4568 10.4107C32.6296 10.5835 32.7268 10.818 32.7268 11.0625V18.4375C32.7268 18.682 32.6296 18.9165 32.4568 19.0894C32.2839 19.2622 32.0494 19.3594 31.8049 19.3594ZM25.3518 17.5156H30.8831V11.9844H25.3518V17.5156Z" fill="#D40449"/>
                                    <path d="M45.1719 33.1875C42.9715 33.1875 40.8612 32.3135 39.3054 30.7574C37.7493 29.2014 36.8752 27.0911 36.8752 24.8909C36.8752 22.6906 37.7493 20.5801 39.3054 19.0243C40.8614 17.4683 42.9717 16.5942 45.1719 16.5942C47.3721 16.5942 49.4827 17.4682 51.0385 19.0243C52.5945 20.5803 53.4686 22.6906 53.4686 24.8909C53.4686 27.0911 52.5946 29.2016 51.0385 30.7574C49.4825 32.3134 47.3721 33.1875 45.1719 33.1875ZM45.1719 18.4375C43.4605 18.4375 41.819 19.1174 40.6088 20.3276C39.3987 21.5377 38.7188 23.1792 38.7188 24.8907C38.7188 26.6021 39.3987 28.2436 40.6088 29.4538C41.8189 30.6639 43.4605 31.3438 45.1719 31.3438C46.8834 31.3438 48.5248 30.6639 49.735 29.4538C50.9452 28.2436 51.625 26.6021 51.625 24.8907C51.625 23.1792 50.9452 21.5377 49.735 20.3276C48.5249 19.1174 46.8834 18.4375 45.1719 18.4375Z" fill="#D40449"/>
                                    <path d="M45.172 27.6563C44.9724 27.6563 44.7784 27.5916 44.6188 27.4719L40.9313 24.7063C40.6678 24.5087 40.5298 24.1854 40.5691 23.8586C40.6087 23.5315 40.8194 23.2503 41.1222 23.1211C41.4251 22.9916 41.7741 23.0337 42.0376 23.2313L44.9783 25.4346L51.8002 16.0496C51.9445 15.8516 52.1615 15.7189 52.4035 15.6809C52.6457 15.6428 52.8929 15.7026 53.0908 15.8468C53.2888 15.991 53.4216 16.2081 53.4596 16.4501C53.4976 16.6923 53.4379 16.9394 53.2937 17.1374L45.9187 27.2781C45.7733 27.4774 45.5541 27.6103 45.3102 27.6468L45.172 27.6563Z" fill="#D40449"/>
                                    </svg>

                                    </div>
                                    <span>Order processed</span>

                                </li>
                                <li>
                                    <div className="shipping-icon">
                                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.0695 43.1594L19.0695 43.1594C19.2605 43.49 19.6132 43.6937 19.9951 43.6937H24.5676C24.9494 43.6937 25.3021 43.49 25.4931 43.1594L25.4931 43.1594C25.6839 42.8287 25.6839 42.4213 25.4931 42.0906L25.4931 42.0906C25.3021 41.76 24.9494 41.5562 24.5676 41.5562H19.9951C19.6132 41.5562 19.2605 41.76 19.0695 42.0906L19.0695 42.0906C18.8787 42.4213 18.8787 42.8287 19.0695 43.1594Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M28.757 43.1594L28.7569 43.1594C28.5661 42.8287 28.5661 42.4213 28.7569 42.0906L28.757 42.0906C28.948 41.76 29.3007 41.5562 29.6825 41.5562H42.525V19.375C42.525 19.1446 42.4334 18.9236 42.2705 18.7607C42.1077 18.5978 41.8867 18.5062 41.6563 18.5062H11.625C11.3946 18.5062 11.1736 18.5978 11.0107 18.7607L28.757 43.1594ZM28.757 43.1594C28.948 43.49 29.3006 43.6938 29.6825 43.6938H43.5938C43.8772 43.6938 44.1491 43.5811 44.3494 43.3807C44.5498 43.1803 44.6625 42.9085 44.6625 42.625V19.375C44.6625 18.5777 44.3458 17.813 43.7819 17.2493C43.2182 16.6854 42.4535 16.3687 41.6562 16.3687H11.625C10.8277 16.3687 10.0631 16.6854 9.49937 17.2493C8.93545 17.813 8.61875 18.5777 8.61875 19.375V34.875C8.61875 35.2569 8.82249 35.6095 9.1531 35.8005L9.15314 35.8006C9.48379 35.9914 9.89122 35.9914 10.2219 35.8006L10.2219 35.8006M28.757 43.1594L10.2219 35.8006M10.2219 35.8006C10.5525 35.6096 10.7562 35.2569 10.7562 34.875V19.375C10.7562 19.1446 10.8478 18.9236 11.0107 18.7607L10.2219 35.8006Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M9.15314 37.8244L9.1531 37.8244C8.82249 38.0154 8.61875 38.3681 8.61875 38.75V42.625C8.61875 42.9085 8.73142 43.1803 8.9318 43.3807L9.00251 43.31L8.93181 43.3807C9.1322 43.5811 9.40405 43.6938 9.68751 43.6938H14.88C15.2619 43.6938 15.6145 43.49 15.8055 43.1594L15.8056 43.1594C15.9964 42.8287 15.9964 42.4213 15.8056 42.0906L15.8056 42.0906C15.6146 41.76 15.2619 41.5562 14.88 41.5562H10.7562V38.75C10.7562 38.3681 10.5525 38.0155 10.2219 37.8244L10.2219 37.8244C9.89121 37.6336 9.48378 37.6336 9.15314 37.8244Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <mask id="path-4-outside-1_14_58" maskUnits="userSpaceOnUse" x="41.625" y="23.2183" width="12" height="11" fill="black">
                                        <rect fill="white" x="41.625" y="23.2183" width="12" height="11"/>
                                        <path d="M52.3125 33.9063H43.5938C43.3368 33.9063 43.0904 33.8041 42.9088 33.6225C42.7271 33.4409 42.625 33.1944 42.625 32.9375V25.1875C42.625 24.9306 42.7271 24.6841 42.9088 24.5025C43.0904 24.3209 43.3368 24.2187 43.5938 24.2187H50.375C50.5962 24.2123 50.8132 24.2819 50.9894 24.4157C51.1658 24.5497 51.2907 24.74 51.3438 24.955L53.2813 32.705C53.3547 32.9948 53.2904 33.3022 53.1069 33.5381C52.9158 33.7803 52.6209 33.917 52.3125 33.9063ZM44.5625 31.9688H51.0725L49.6194 26.1563H44.5625V31.9688Z"/>
                                        </mask>
                                        <path d="M52.3125 33.9063H43.5938C43.3368 33.9063 43.0904 33.8041 42.9088 33.6225C42.7271 33.4409 42.625 33.1944 42.625 32.9375V25.1875C42.625 24.9306 42.7271 24.6841 42.9088 24.5025C43.0904 24.3209 43.3368 24.2187 43.5938 24.2187H50.375C50.5962 24.2123 50.8132 24.2819 50.9894 24.4157C51.1658 24.5497 51.2907 24.74 51.3438 24.955L53.2813 32.705C53.3547 32.9948 53.2904 33.3022 53.1069 33.5381C52.9158 33.7803 52.6209 33.917 52.3125 33.9063ZM44.5625 31.9688H51.0725L49.6194 26.1563H44.5625V31.9688Z" fill="#D40449"/>
                                        <path d="M52.3125 33.9063L52.3194 33.7063H52.3125V33.9063ZM42.9088 33.6225L42.7673 33.7639L42.7673 33.7639L42.9088 33.6225ZM42.9088 24.5025L42.7673 24.3611L42.7673 24.3611L42.9088 24.5025ZM50.375 24.2187V24.4188L50.3808 24.4186L50.375 24.2187ZM50.9894 24.4157L51.1104 24.2565L51.1103 24.2564L50.9894 24.4157ZM51.3438 24.955L51.1496 25.003L51.1498 25.0035L51.3438 24.955ZM53.2813 32.705L53.0872 32.7535L53.0874 32.7542L53.2813 32.705ZM53.1069 33.5381L53.2639 33.662L53.2648 33.6609L53.1069 33.5381ZM44.5625 31.9688H44.3625V32.1688H44.5625V31.9688ZM51.0725 31.9688V32.1688H51.3287L51.2665 31.9202L51.0725 31.9688ZM49.6194 26.1563L49.8134 26.1077L49.7755 25.9563H49.6194V26.1563ZM44.5625 26.1563V25.9563H44.3625V26.1563H44.5625ZM52.3125 33.7063H43.5938V34.1063H52.3125V33.7063ZM43.5938 33.7063C43.3899 33.7063 43.1943 33.6252 43.0502 33.4811L42.7673 33.7639C42.9865 33.983 43.2838 34.1063 43.5938 34.1063V33.7063ZM43.0502 33.4811C42.906 33.3369 42.825 33.1414 42.825 32.9375H42.425C42.425 33.2475 42.5482 33.5448 42.7673 33.7639L43.0502 33.4811ZM42.825 32.9375V25.1875H42.425V32.9375H42.825ZM42.825 25.1875C42.825 24.9836 42.906 24.7881 43.0502 24.6439L42.7673 24.3611C42.5482 24.5802 42.425 24.8775 42.425 25.1875H42.825ZM43.0502 24.6439C43.1943 24.4998 43.3899 24.4187 43.5938 24.4187V24.0187C43.2838 24.0187 42.9865 24.1419 42.7673 24.3611L43.0502 24.6439ZM43.5938 24.4187H50.375V24.0187H43.5938V24.4187ZM50.3808 24.4186C50.5563 24.4135 50.7286 24.4688 50.8684 24.575L51.1103 24.2564C50.8978 24.095 50.6361 24.011 50.3692 24.0188L50.3808 24.4186ZM50.8684 24.575C51.0083 24.6813 51.1075 24.8323 51.1496 25.003L51.5379 24.9071C51.4739 24.6478 51.3232 24.4182 51.1104 24.2565L50.8684 24.575ZM51.1498 25.0035L53.0873 32.7535L53.4753 32.6565L51.5378 24.9065L51.1498 25.0035ZM53.0874 32.7542C53.1457 32.9842 53.0946 33.2281 52.949 33.4154L53.2648 33.6609C53.4861 33.3763 53.5638 33.0055 53.4751 32.6559L53.0874 32.7542ZM52.9499 33.4142C52.7982 33.6064 52.5642 33.7149 52.3194 33.7064L52.3056 34.1061C52.6776 34.119 53.0333 33.9542 53.2639 33.662L52.9499 33.4142ZM44.5625 32.1688H51.0725V31.7688H44.5625V32.1688ZM51.2665 31.9202L49.8134 26.1077L49.4254 26.2048L50.8785 32.0173L51.2665 31.9202ZM49.6194 25.9563H44.5625V26.3563H49.6194V25.9563ZM44.3625 26.1563V31.9688H44.7625V26.1563H44.3625Z" fill="#D40449" mask="url(#path-4-outside-1_14_58)"/>
                                        <path d="M57.1536 46.6H57.1929L57.194 46.599C57.4629 46.5889 57.7186 46.4776 57.9095 46.2867L57.8388 46.216L57.9095 46.2867C58.1099 46.0863 58.2226 45.8144 58.2226 45.531V33.907C58.2275 33.6572 58.1446 33.4138 57.9885 33.2188C57.8324 33.0236 57.6127 32.8891 57.3675 32.8392L57.3672 32.8391L52.5234 31.8704L52.5137 31.8684H52.5038H43.5913C43.3079 31.8684 43.036 31.9811 42.8356 32.1815L42.8356 32.1815C42.6352 32.3819 42.5226 32.6537 42.5226 32.9372V45.531C42.5226 45.8144 42.6352 46.0863 42.8356 46.2867L42.9063 46.216L42.8356 46.2867C43.036 46.487 43.3079 46.5997 43.5913 46.5997H46.4976C46.8794 46.5997 47.2321 46.396 47.4231 46.0654L47.4231 46.0653C47.614 45.7347 47.614 45.3272 47.4231 44.9966L47.4231 44.9966C47.2321 44.666 46.8794 44.4622 46.4976 44.4622H44.6601V34.006H52.203L56.0848 34.7823V44.4625H54.2473C53.8655 44.4625 53.5128 44.6662 53.3218 44.9968L53.3217 44.9969C53.1309 45.3275 53.1309 45.7349 53.3217 46.0656L53.3218 46.0656C53.5127 46.3962 53.8654 46.6 54.2473 46.6H57.1536Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M46.9344 29.1057L46.9344 29.1057C46.6037 29.2967 46.4 29.6494 46.4 30.0312V32.9375C46.4 33.221 46.5127 33.4928 46.7131 33.6932L46.7836 33.6226L46.7131 33.6932C46.9134 33.8936 47.1853 34.0063 47.4688 34.0063C47.7522 34.0063 48.0241 33.8936 48.2244 33.6932L48.1537 33.6225L48.2244 33.6932C48.4248 33.4928 48.5375 33.221 48.5375 32.9375V30.0312C48.5375 29.6494 48.3338 29.2967 48.0032 29.1057L48.0031 29.1057C47.6725 28.9149 47.265 28.9149 46.9344 29.1057Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M46.8791 49.0271L46.8792 49.0271C47.8063 49.9541 49.0639 50.475 50.375 50.475C51.6861 50.475 52.9437 49.954 53.8708 49.0271L53.8709 49.0271C54.7978 48.0999 55.3188 46.8424 55.3188 45.5312C55.3188 44.2201 54.7978 42.9626 53.8709 42.0354L53.8708 42.0354C52.9437 41.1084 51.6861 40.5875 50.375 40.5875C49.0639 40.5875 47.8063 41.1085 46.8792 42.0354L46.8791 42.0354C45.9522 42.9626 45.4312 44.2201 45.4312 45.5312C45.4312 46.8424 45.9522 48.0999 46.8791 49.0271ZM48.3908 43.547L48.3908 43.547C48.9169 43.0206 49.6308 42.725 50.375 42.725C51.1192 42.725 51.833 43.0206 52.3592 43.547L52.3592 43.547C52.8856 44.0732 53.1813 44.787 53.1813 45.5312C53.1813 46.2755 52.8856 46.9893 52.3592 47.5155L52.3592 47.5155C51.8331 48.0419 51.1192 48.3375 50.375 48.3375C49.6308 48.3375 48.917 48.0419 48.3908 47.5155L48.3908 47.5155C47.8644 46.9893 47.5687 46.2755 47.5687 45.5312C47.5687 44.787 47.8644 44.0732 48.3908 43.547Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <mask id="path-9-outside-2_14_58" maskUnits="userSpaceOnUse" x="46.4688" y="22.25" width="4" height="4" fill="black">
                                        <rect fill="white" x="46.4688" y="22.25" width="4" height="4"/>
                                        <path d="M48.4375 25.1875C48.1806 25.1875 47.9342 25.0854 47.7525 24.9038C47.5709 24.7221 47.4688 24.4757 47.4688 24.2188C47.4688 23.9618 47.5709 23.7154 47.7525 23.5338C47.9342 23.3521 48.1806 23.25 48.4375 23.25C48.6944 23.25 48.9409 23.3521 49.1225 23.5338C49.3041 23.7154 49.4063 23.9618 49.4063 24.2188C49.4063 24.4757 49.3041 24.7221 49.1225 24.9038C48.9409 25.0854 48.6944 25.1875 48.4375 25.1875Z"/>
                                        </mask>
                                        <path d="M48.4375 25.1875C48.1806 25.1875 47.9342 25.0854 47.7525 24.9038C47.5709 24.7221 47.4688 24.4757 47.4688 24.2188C47.4688 23.9618 47.5709 23.7154 47.7525 23.5338C47.9342 23.3521 48.1806 23.25 48.4375 23.25C48.6944 23.25 48.9409 23.3521 49.1225 23.5338C49.3041 23.7154 49.4063 23.9618 49.4063 24.2188C49.4063 24.4757 49.3041 24.7221 49.1225 24.9038C48.9409 25.0854 48.6944 25.1875 48.4375 25.1875Z" fill="#D40449"/>
                                        <path d="M47.7525 24.9038L47.6111 25.0452L47.6111 25.0452L47.7525 24.9038ZM47.7525 23.5338L47.6111 23.3923L47.6111 23.3923L47.7525 23.5338ZM49.1225 23.5338L49.2639 23.3923L49.2639 23.3923L49.1225 23.5338ZM49.1225 24.9038L49.2639 25.0452L49.2639 25.0452L49.1225 24.9038ZM48.4375 24.9875C48.2337 24.9875 48.0381 24.9065 47.8939 24.7623L47.6111 25.0452C47.8302 25.2643 48.1275 25.3875 48.4375 25.3875V24.9875ZM47.8939 24.7623C47.7498 24.6182 47.6688 24.4226 47.6688 24.2188H47.2687C47.2687 24.5288 47.392 24.826 47.6111 25.0452L47.8939 24.7623ZM47.6688 24.2188C47.6688 24.0149 47.7498 23.8193 47.8939 23.6752L47.6111 23.3923C47.392 23.6115 47.2687 23.9088 47.2687 24.2188H47.6688ZM47.8939 23.6752C48.0381 23.531 48.2336 23.45 48.4375 23.45V23.05C48.1275 23.05 47.8302 23.1732 47.6111 23.3923L47.8939 23.6752ZM48.4375 23.45C48.6414 23.45 48.8369 23.531 48.9811 23.6752L49.2639 23.3923C49.0448 23.1732 48.7475 23.05 48.4375 23.05V23.45ZM48.9811 23.6752C49.1252 23.8193 49.2063 24.0149 49.2063 24.2188H49.6063C49.6063 23.9088 49.4831 23.6115 49.2639 23.3923L48.9811 23.6752ZM49.2063 24.2188C49.2063 24.4226 49.1252 24.6182 48.9811 24.7623L49.2639 25.0452C49.4831 24.826 49.6063 24.5288 49.6063 24.2188H49.2063ZM48.9811 24.7623C48.8369 24.9065 48.6414 24.9875 48.4375 24.9875V25.3875C48.7475 25.3875 49.0448 25.2643 49.2639 25.0452L48.9811 24.7623Z" fill="#D40449" mask="url(#path-9-outside-2_14_58)"/>
                                        <path d="M10.6994 46.0656L10.6994 46.0656C10.8904 46.3963 11.2431 46.6 11.6249 46.6H13.5624C13.9443 46.6 14.297 46.3963 14.488 46.0657L14.488 46.0656C14.6788 45.735 14.6788 45.3275 14.488 44.9969L14.488 44.9969C14.297 44.6662 13.9443 44.4625 13.5624 44.4625H11.6249C11.2431 44.4625 10.8904 44.6662 10.6994 44.9968L10.6994 44.9969C10.5085 45.3275 10.5085 45.735 10.6994 46.0656Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M30.0744 46.0656L30.0744 46.0656C30.2654 46.3963 30.6181 46.6 30.9999 46.6H43.5937C43.9755 46.6 44.3282 46.3963 44.5192 46.0657L44.5193 46.0656C44.7101 45.735 44.7101 45.3275 44.5193 44.9969L44.5192 44.9969C44.3282 44.6662 43.9756 44.4625 43.5937 44.4625H30.9999C30.6181 44.4625 30.2654 44.6662 30.0744 44.9968L30.0744 44.9969C29.8835 45.3275 29.8835 45.735 30.0744 46.0656Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M20.3869 46.0656L20.3869 46.0656C20.5779 46.3963 20.9306 46.6 21.3124 46.6H23.2499C23.6318 46.6 23.9845 46.3963 24.1755 46.0657L24.1755 46.0656C24.3663 45.735 24.3663 45.3275 24.1755 44.9969L24.1755 44.9969C23.9845 44.6662 23.6318 44.4625 23.2499 44.4625H21.3124C20.9306 44.4625 20.5779 44.6662 20.3869 44.9968L20.3869 44.9969C20.196 45.3275 20.196 45.735 20.3869 46.0656Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M13.9416 49.0271L13.9417 49.0271C14.8688 49.9541 16.1264 50.475 17.4375 50.475C18.7486 50.475 20.0062 49.954 20.9333 49.0271L20.9334 49.0271C21.8603 48.0999 22.3813 46.8424 22.3813 45.5312C22.3813 44.2201 21.8603 42.9626 20.9334 42.0354L20.9333 42.0354C20.0062 41.1084 18.7486 40.5875 17.4375 40.5875C16.1264 40.5875 14.8688 41.1085 13.9417 42.0354L13.9416 42.0354C13.0147 42.9626 12.4937 44.2201 12.4937 45.5312C12.4937 46.8424 13.0147 48.0999 13.9416 49.0271ZM15.4533 43.547L15.4533 43.547C15.9794 43.0206 16.6933 42.725 17.4375 42.725C18.1817 42.725 18.8955 43.0206 19.4217 43.547L19.4217 43.547C19.9481 44.0732 20.2438 44.787 20.2438 45.5312C20.2438 46.2755 19.9481 46.9893 19.4217 47.5155L19.4217 47.5155C18.8956 48.0419 18.1817 48.3375 17.4375 48.3375C16.6933 48.3375 15.9795 48.0419 15.4533 47.5155L15.4533 47.5155C14.9269 46.9893 14.6312 46.2755 14.6312 45.5312C14.6312 44.787 14.9269 44.0732 15.4533 43.547Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M23.6291 49.0271L23.6292 49.0271C24.5563 49.9541 25.8139 50.475 27.125 50.475C28.4361 50.475 29.6937 49.954 30.6208 49.0271L30.6209 49.0271C31.5478 48.0999 32.0688 46.8424 32.0688 45.5312C32.0688 44.2201 31.5478 42.9626 30.6209 42.0354L30.6208 42.0354C29.6937 41.1084 28.4361 40.5875 27.125 40.5875C25.8139 40.5875 24.5563 41.1085 23.6292 42.0354L23.6291 42.0354C22.7022 42.9626 22.1812 44.2201 22.1812 45.5312C22.1812 46.8424 22.7022 48.0999 23.6291 49.0271ZM25.1408 43.547L25.1408 43.547C25.6669 43.0206 26.3808 42.725 27.125 42.725C27.8692 42.725 28.583 43.0206 29.1092 43.547L29.1092 43.547C29.6356 44.0732 29.9313 44.787 29.9313 45.5312C29.9313 46.2755 29.6356 46.9893 29.1092 47.5155L29.1092 47.5155C28.5831 48.0419 27.8692 48.3375 27.125 48.3375C26.3808 48.3375 25.667 48.0419 25.1408 47.5155L25.1408 47.5155C24.6144 46.9893 24.3187 46.2755 24.3187 45.5312C24.3187 44.787 24.6144 44.0732 25.1408 43.547Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M7.38188 44.64C7.55827 44.5657 7.75283 44.5455 7.9407 44.5817L7.38188 46.4225C7.49692 46.4768 7.62285 46.5032 7.75 46.5V46.6C7.75042 46.6 7.75084 46.6 7.75127 46.6C8.03426 46.5996 8.30559 46.487 8.50568 46.2869L8.50568 46.2869C8.70606 46.0866 8.81873 45.8147 8.81874 45.5312L8.81872 45.53C8.81695 45.3906 8.78807 45.2527 8.73336 45.1242C8.6799 44.9963 8.60494 44.8788 8.51183 44.7762L8.51194 44.7761L8.50803 44.7722C8.35773 44.624 8.16692 44.5236 7.95968 44.4835L7.95958 44.4835C7.75284 44.4437 7.53872 44.4658 7.34442 44.5473M7.38188 44.64L7.34578 44.5467C7.34532 44.5469 7.34487 44.5471 7.34442 44.5473M7.38188 44.64C7.263 44.686 7.15422 44.7552 7.06219 44.8434L7.38188 44.64ZM7.34442 44.5473C7.21376 44.598 7.09421 44.6742 6.993 44.7712L6.99283 44.7711L6.98815 44.7762C6.89503 44.8788 6.82008 44.9963 6.76661 45.1242C6.71191 45.2527 6.68304 45.3906 6.68126 45.53L6.68122 45.53L6.68126 45.5327C6.68525 45.8143 6.79541 46.0841 6.98981 46.288L6.98973 46.2881L6.993 46.2912C7.0937 46.3877 7.21256 46.4636 7.34245 46.5144L7.34442 44.5473Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M4.84376 46.6005V46.6C4.5603 46.6 4.28845 46.4873 4.08805 46.2869L4.08805 46.2869C3.88767 46.0865 3.775 45.8147 3.775 45.5312V45.5299L3.77501 45.5299C3.77679 45.3906 3.80566 45.2526 3.86036 45.1242C3.91383 44.9963 3.98878 44.8787 4.0819 44.7762L4.08547 44.7722L4.08557 44.7723C4.33756 44.5228 4.69676 44.4145 5.04456 44.4832C5.11881 44.4938 5.1905 44.5168 5.25695 44.5507L5.43097 44.6377L5.44045 44.6424L5.44872 44.6491L5.59403 44.7653L5.60025 44.7703L5.6056 44.7762C5.69829 44.8783 5.773 44.9952 5.82641 45.1225C5.88665 45.251 5.916 45.3914 5.91248 45.5332M4.84376 46.6005L5.8125 45.5312M4.84376 46.6005L4.85425 46.5994L5.0383 46.58L5.03831 46.5801L5.04152 46.5796C5.11685 46.5692 5.18959 46.546 5.25695 46.5117M4.84376 46.6005L5.02781 46.4806M5.91248 45.5332C5.91248 45.5334 5.91247 45.5336 5.91247 45.5338L5.8125 45.5312M5.91248 45.5332C5.91248 45.533 5.91249 45.5328 5.91249 45.5326L5.8125 45.5312M5.91248 45.5332C5.90835 45.8147 5.79821 46.0842 5.60394 46.288L5.5946 46.2978L5.59403 46.2971L5.44872 46.4133L5.44045 46.42L5.43097 46.4247L5.25695 46.5117M5.8125 45.5312C5.80887 45.7877 5.70856 46.0334 5.53156 46.219L5.38625 46.3353L5.21187 46.4224M5.25695 46.5117C5.25708 46.5116 5.25721 46.5116 5.25734 46.5115L5.21187 46.4224M5.25695 46.5117L5.2566 46.5119L5.21187 46.4224M5.21187 46.4224C5.15415 46.4519 5.09199 46.4717 5.02781 46.4806M5.02781 46.4806L4.84376 46.5L5.02781 46.4806Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M54.2907 40.2531L54.2907 40.2531C54.4817 40.5838 54.8344 40.7875 55.2162 40.7875H57.1537C57.5356 40.7875 57.8883 40.5838 58.0793 40.2532L58.0793 40.2531C58.2701 39.9225 58.2701 39.515 58.0793 39.1844L58.0793 39.1844C57.8883 38.8537 57.5356 38.65 57.1537 38.65H55.2162C54.8344 38.65 54.4817 38.8537 54.2907 39.1843L54.2907 39.1844C54.0999 39.515 54.0999 39.9225 54.2907 40.2531Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                        <path d="M6.82436 39.2844L6.82438 39.2844C7.01537 39.615 7.36807 39.8187 7.74994 39.8187H13.5624C14.6366 39.8187 15.6288 39.2457 16.166 38.3156L16.166 38.3156C16.7029 37.3856 16.7029 36.2394 16.166 35.3094L16.166 35.3094C15.6288 34.3793 14.6366 33.8062 13.5624 33.8062H4.84369C4.46183 33.8062 4.10915 34.01 3.91814 34.3406L3.91811 34.3406C3.7273 34.6713 3.7273 35.0787 3.91811 35.4094L3.91813 35.4094C4.10912 35.74 4.46182 35.9437 4.84369 35.9437H13.5624C13.8728 35.9437 14.1595 36.1093 14.3148 36.3781C14.4699 36.6469 14.4699 36.9781 14.3148 37.2469C14.1595 37.5157 13.8728 37.6813 13.5624 37.6813H7.74994C7.36808 37.6813 7.0154 37.885 6.82439 38.2156L6.82436 38.2156C6.63355 38.5463 6.63355 38.9537 6.82436 39.2844Z" fill="#D40449" stroke="#D40449" stroke-width="0.2"/>
                                    </svg>
                                    </div>

                                    <span>Order dispatched</span>
                                </li>
                                <li>
                                    <div className="shipping-icon">
                                        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.053 26.4718C15.053 27.6116 15.9803 28.539 17.1202 28.539C18.26 28.539 19.1874 27.6116 19.1874 26.4718C19.1874 25.332 18.26 24.4046 17.1202 24.4046C15.9803 24.4046 15.053 25.332 15.053 26.4718ZM17.6561 26.4718C17.6561 26.7674 17.4157 27.0077 17.1202 27.0077C16.8246 27.0077 16.5842 26.7674 16.5842 26.4718C16.5842 26.1762 16.8246 25.9359 17.1202 25.9359C17.4157 25.9359 17.6561 26.1762 17.6561 26.4718Z" fill="#D40449"/>
                                            <path d="M44.6391 26.6168H35.0972V26.6161H32.9534V26.6168H30.9414V26.6161H28.7977V26.6168H26.0721C25.4801 26.6168 25.0002 27.0967 25.0002 27.6886V40.6945H13.4178L13.4176 7.7481H28.7975V25.8503H30.9413L30.9414 6.67622C30.9414 6.08508 30.4607 5.60435 29.8696 5.60435H12.3459C11.7518 5.60435 11.2741 6.08508 11.2741 6.67622V40.6945H9.26207L9.26191 3.81585H32.9534V25.8503H35.0972V2.74357C35.0972 2.15242 34.6164 1.67169 34.0253 1.67169H8.19004C7.5989 1.67169 7.11816 2.15242 7.11816 2.74357V40.6941H4.36191C3.77077 40.6941 3.29004 41.1748 3.29004 41.7659V46.2556C3.29004 46.8467 3.77077 47.3274 4.36191 47.3274H26.0714H26.072H44.6393C45.2312 47.3274 45.7112 46.8475 45.7112 46.2556L45.711 27.6882C45.711 27.0966 45.2313 26.6164 44.6392 26.6164L44.6391 26.6168ZM32.9457 28.7605H37.6999V32.4891L37.3381 32.2315C37.0725 32.042 36.7156 32.042 36.45 32.2315L35.3225 33.0341L34.1951 32.2315C33.9295 32.042 33.5726 32.042 33.307 32.2315L32.9452 32.4891L32.9454 28.7605H32.9457ZM5.43379 42.8382H25.0003V45.1841H5.43379V42.8382ZM43.5672 45.1841H27.1436V28.7605H31.414V33.9741C31.414 34.2607 31.5738 34.5232 31.8287 34.6545C32.0834 34.7863 32.39 34.7636 32.6237 34.5976L33.7511 33.795L34.8784 34.5976C35.144 34.7871 35.501 34.7871 35.7665 34.5976L36.8941 33.795L38.0214 34.5976C38.1537 34.6919 38.309 34.7397 38.4655 34.7397C38.5856 34.7397 38.7056 34.7115 38.8164 34.6545C39.0711 34.5231 39.2311 34.2607 39.2311 33.9741L39.231 28.7605H43.5671L43.5672 45.1841Z" fill="#D40449"/>
                                        </svg>
                                    </div>
                                    <span>Better health is at your door</span>
                                </li>
                            </ul>
                    </div>
                </div>)
            }
            { shouldShowOrderComments &&
                <OrderComments /> }

            <div className="form-actions">
                <Button
                    disabled={ shouldDisableSubmit }
                    id="checkout-shipping-continue"
                    isLoading={ isLoading }
                    type="submit"
                    variant={ ButtonVariant.Primary }
                >
                    <TranslatedString id="common.continue_action" />
                </Button>
            </div>
        </>;
    }
}

export default ShippingFormFooter;
