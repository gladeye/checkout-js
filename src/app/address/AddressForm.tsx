import { Address, Country, FormField } from '@bigcommerce/checkout-sdk';
import { forIn, noop } from 'lodash';
import React, { createRef, Component, ReactNode, RefObject } from 'react';

import { withLanguage, WithLanguageProps } from '../locale';
import { AutocompleteItem } from '../ui/autocomplete';

import { mapToAddress, GoogleAutocompleteFormField } from './googleAutocomplete';
import DynamicFormField, { AddressKeyMap } from './DynamicFormField';
import DynamicFormFieldType from './DynamicFormFieldType';

export interface AddressFormProps {
    fieldName?: string;
    countryCode?: string;
    countriesWithAutocomplete?: string[];
    countries?: Country[];
    formFields: FormField[];
    googleMapsApiKey?: string;
    onAutocompleteSelect?(address: Partial<Address>): void;
    onAutocompleteToggle?(state: { inputValue: string; isOpen: boolean }): void;
    onChange?(fieldName: string, value: string | string[]): void;
    setFieldValue?(fieldName: string, value: string | string[]): void;
}

const PLACEHOLDER: AddressKeyMap = {
    countryCode: 'address.select_country_action',
    stateOrProvince: 'address.select_state_action',
    stateOrProvinceCode: 'address.select_state_action',
};

const AUTOCOMPLETE_FIELD_NAME = 'address1';

class AddressForm extends Component<AddressFormProps & WithLanguageProps> {
    private containerRef: RefObject<HTMLElement> = createRef();
    private nextElement?: HTMLElement | null;

    componentDidMount(): void {
        const { current } = this.containerRef;

        if (current) {
            this.nextElement = current.querySelector<HTMLElement>('[autocomplete="address-line2"]');
        }
    }

    render(): ReactNode {
        const {
            formFields,
            fieldName,
            language,
            countriesWithAutocomplete,
            countryCode,
            googleMapsApiKey,
            onAutocompleteToggle,
        } = this.props;

        return (
            <div className="checkout-address" ref={ this.containerRef as RefObject<HTMLDivElement> }>
                { formFields.map(field => {
                    const addressFieldName = field.name;
                    const translatedPlaceholderId = PLACEHOLDER[addressFieldName];

                    if (addressFieldName === 'address1' && googleMapsApiKey && countriesWithAutocomplete) {
                        return (
                            <GoogleAutocompleteFormField
                                key={ field.id }
                                parentFieldName={ fieldName }
                                countryCode={ countryCode }
                                supportedCountries={ countriesWithAutocomplete }
                                field={ field }
                                onSelect={ this.onAutocompleteSelect }
                                onToggleOpen={ onAutocompleteToggle }
                                onChange={ (value, isOpen) => {
                                    if (!isOpen) {
                                        this.syncNonFormikValue(AUTOCOMPLETE_FIELD_NAME, value);
                                    }
                                } }
                                apiKey={ googleMapsApiKey }
                                nextElement={ this.nextElement || undefined }
                            />
                        );
                    }

                    return (
                        <DynamicFormField
                            onChange={ value => this.syncNonFormikValue(addressFieldName, value) }
                            // stateOrProvince can sometimes be a dropdown or input, so relying on id is not sufficient
                            key={ `${field.id}-${field.name}` }
                            parentFieldName={ field.custom ?
                                (fieldName ? `${fieldName}.customFields` : 'customFields') :
                                fieldName
                            }
                            field={ field }
                            placeholder={ translatedPlaceholderId && language.translate(translatedPlaceholderId) }
                            fieldType={ this.getDynamicFormFieldType(field) }
                        />
                    );
                }) }
            </div>
        );
    }

    private getDynamicFormFieldType({
        custom,
        name,
        fieldType,
        type,
        secret,
    }: FormField): DynamicFormFieldType {
        if (!custom) {
            const defaultTypes: { [key: string]: DynamicFormFieldType } = {
                phone: DynamicFormFieldType.telephone,
                countryCode: DynamicFormFieldType.dropdown,
                stateOrProvinceCode: DynamicFormFieldType.dropdown,
            };

            return defaultTypes[name] || DynamicFormFieldType.text;
        }

        if (fieldType === 'text') {
            if (type === 'integer') {
                return DynamicFormFieldType.number;
            }

            return secret ?
                DynamicFormFieldType.password :
                DynamicFormFieldType.text;
        }

        return fieldType as DynamicFormFieldType;
    }

    private onAutocompleteSelect: (
        place: google.maps.places.PlaceResult,
        item: AutocompleteItem
    ) => void = (place, { value: autocompleteValue }) => {
        const {
            countries,
            setFieldValue = noop,
            onChange = noop,
        } = this.props;

        const address = mapToAddress(place, countries);

        forIn(address, (value, fieldName) => {
            setFieldValue(fieldName, value as string);
            onChange(fieldName, value as string);
        });

        if (autocompleteValue) {
            this.syncNonFormikValue(AUTOCOMPLETE_FIELD_NAME, autocompleteValue);
        }
    };

    // because autocomplete state is controlled by Downshift, we need to manually keep formik
    // value in sync when autocomplete value changes
    private syncNonFormikValue: (
        fieldName: string,
        value: string | string[]
    ) => void = (fieldName, value) => {
        const {
            formFields,
            setFieldValue = noop,
            onChange = noop,
        } = this.props;

        const dateFormFieldNames = formFields
            .filter(field => field.custom && field.fieldType === DynamicFormFieldType.date)
            .map(field => field.name);

        if (fieldName === AUTOCOMPLETE_FIELD_NAME || dateFormFieldNames.indexOf(fieldName) > -1) {
            setFieldValue(fieldName, value);
        }

        onChange(fieldName, value);
    };
}

export default withLanguage(AddressForm);
