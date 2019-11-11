import React, { useState, useEffect } from 'react';
import axios from 'axios'
import imagen from './cryptomonedas.png'
import Formulario from './componentes/Formulario';
import Spinner from './componentes/Spinner';
import Cotizacion from './componentes/Cotizacion';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect (() => {
    const cotizarCryptomoneda = async () => {

      //Prevenir que se ejecute apenas abre el sitio
      if(moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`
      const resultado = await axios(url)

      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda])
      }, 2000);
    }

    cotizarCryptomoneda()
  },[moneda, cryptomoneda]) 

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img 
            src={imagen} 
            alt="imagen criptomonedas" 
            className="logotipo"
          />  
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>

          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCryptomoneda={guardarCryptomoneda}/>

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
