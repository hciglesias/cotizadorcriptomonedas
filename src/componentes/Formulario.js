import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cryptomoneda from './Cryptomoneda';
import Error from './Error';

function Formulario({guardarMoneda, guardarCryptomoneda}) {

    const [ cryptomonedas, guardarCryptomonedas ] = useState([]);
    const [ monedaCotizar, guardarMonedaCotizar ] = useState('');
    const [ cryptoCotizar, guardarCryptoCotizar ] = useState('');
    const [ error, guardarError ] = useState(false);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD'

            const resultado = await axios.get(url);  

            guardarCryptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //validar que esten ambos campos completos

    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar si ambos campos estan llenos. 

        if (monedaCotizar === '' || cryptoCotizar === '') {
            guardarError(true);
            return;
        }

        //Pasar los datos al componente principal

        guardarError(false)
        guardarMoneda(monedaCotizar);
        guardarCryptomoneda(cryptoCotizar)
    }


    //Mostrar mensaje de error en caso de que el form no este completo
    const componente = (error) ? <Error mensaje="Ambos Campos son Obligatorios" /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange={ e => guardarMonedaCotizar(e.target.value) }
                >
                    <option value="">- Elige tu Moneda -</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="ARS">Peso Argentino</option>
                    <option value="GBP">Libra Esterlina</option>
                    <option value="EUR">Euro</option>
                    <option value="JPY">Yen Japones</option>
                </select>
            </div>
            <div className="row">
                <label>Elige tu Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={ e => guardarCryptoCotizar(e.target.value) }

                >
                    <option value="">- Elige tu Criptomoneda -</option>
                    {cryptomonedas.map(cryptomoneda => (
                        <Cryptomoneda 
                            key={cryptomoneda.CoinInfo.id}
                            cryptomoneda={cryptomoneda} />
                    ))}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular" />
        </form>
    )
}

export default Formulario
