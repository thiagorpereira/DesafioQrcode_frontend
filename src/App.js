import React, { useState, useEffect } from 'react';
import api from './service/api';
import QRCode from 'qrcode.react';

function App() {


  const [formData, setFormData] = useState({
    payerIdentifier: '',
    value: '',
    recieverIdentifier: '',
  })

  const [stringQrCode, setStringQrCode] = useState('')


  useEffect(() => {
    console.log('armazenado', stringQrCode)
  }, [stringQrCode])

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,

    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { payerIdentifier, value, recieverIdentifier } = formData;

    const data = { 
      payerIdentifier,
      value, 
      recieverIdentifier
    };
    console.log(data);

    await api.post('/transactions', data)
    .then(function (response) {
      console.log('Resp:', response.data);
      setStringQrCode(response.data.qrCodeString)
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="payerIdentifier">Identificação do Pagador</label>
        <input 
          type="text"
          name="payerIdentifier"
          id="payerIdentifier"
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <label htmlFor="value">Valor da Transferencia</label>
        <input 
          type="text"
          name="value"
          id="value"
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <label htmlFor="recieverIdentifier">Identificação do Recebedor</label>
        <input 
          type="text"
          name="recieverIdentifier"
          id="recieverIdentifier"
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">
          Realizar Transferencia
      </button>
      {
        stringQrCode ?
        <QRCode value={stringQrCode} />: ''
      }
    </form>
  );
}

export default App;
