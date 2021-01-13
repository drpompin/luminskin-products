import React from 'react'
import styled from 'styled-components';
// import { Query } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'

import gql from 'graphql-tag'



const GET_ALL_CURRENCIES = gql`
    {
        currency: __type(name: "Currency") {
            enumValues {
                name
            }
        }
    }
`

// const GET_PRICE_CURRENCY = gql`
// 	{
// 		products {
// 			price(currency: USD)
// 		}
// 	}
// `


const CurrencySelect = styled.select`
    max-width: 80px;
    padding: 8px 13px 5px 10px;
    background-position: 100% 60%;
    cursor: pointer;
`

function Currency(props) {
    // const [value, setValue] = React.useState();
    // const [selectedCurrency, setCurrencyChange] = useState('select one')

    // function handleCurrencyChange(e) {
    //     console.log('event in currency select', e.target.value)
    //     setCurrencyChange(e.target.value);
    //     // console.log('addrtype', toString(addrtype))
    // }

    // console.log('valueeee', value);

    const { data, loading, error } = useQuery(GET_ALL_CURRENCIES)
    // const { data: currencyData, loading: currencyLoading, error: currencyError } = useQuery(GET_ALL_CURRENCIES)
    if (loading) return <h4>Loading...</h4>
    if (error) console.log(error)
    console.log('props in currency', props)

    return (

        <CurrencySelect 
            value={props.selectedCurrency} 
            // onChange={e => setValue(e.currentTarget.value)}
            // name="currenci"
            onChange={props.handleCurrencyChange}
        >
            {data && data.currency.enumValues.map(currenci => (
                <option key={currenci.name} value={currenci.name} >
                    {currenci.name}
                </option>
            ))}
        </CurrencySelect>
    )
}

export default Currency