import React, { useState, ChangeEvent } from 'react';

function App() {


  const [formData, setFormData] = useState({
    payerIdentifier: '',
    value: '',
    recieverIdentifier: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,

    })
  }

  return (
    <form>
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
    </form>
  );
}

export default App;
