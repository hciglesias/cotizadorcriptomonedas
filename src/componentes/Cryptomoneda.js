import React from 'react'

function Cryptomoneda({cryptomoneda}) {

    const { Name, FullName } = cryptomoneda.CoinInfo

    return (
        <option value={Name}>{FullName}</option>
    )
}

export default Cryptomoneda
