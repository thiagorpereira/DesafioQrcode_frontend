import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import QRCode from 'qrcode.react';
import { compare } from 'bcryptjs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { Wrapper, Content, QRCodeContent } from './styles/app';
import api from './service/api';
import colors from './styles/colors';

interface TransactionData {
  payerIdentifier: string;
  value: string;
  recieverIdentifier: string;
}

function App() {

  const [formData, setFormData] = useState<TransactionData>({
    payerIdentifier: '',
    value: '',
    recieverIdentifier: '',
  })

  const [stringQrCode, setStringQrCode] = useState('')
  const [verifyHashResult, setVerifyHashResult] = useState(false)
 
  useEffect(() => {
    async function verifyHash() {
      const compareResult = await compare(
        JSON.stringify(formData),
        stringQrCode,
      )

      setVerifyHashResult(compareResult)
    }

    verifyHash()
  }, [stringQrCode])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,

    })
  }

  const handleSubmit = async (event: FormEvent ) => {
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

  function handleReset() {
    setFormData({
      payerIdentifier: '',
      value: '',
      recieverIdentifier: '',
    })
    setStringQrCode('');
    setVerifyHashResult(false);
  }

  return (
    <>
    <Wrapper>
      <Content>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="payerIdentifier">Identificação do Pagador</label>
            <input 
              type="text"
              name="payerIdentifier"
              id="payerIdentifier"
              value={formData.payerIdentifier}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="value">Valor da Transferencia</label>
            <input
              type="text"
              name="value"
              id="value"
              value={formData.value}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="recieverIdentifier">Identificação do Recebedor</label>
            <input 
              type="text"
              name="recieverIdentifier"
              id="recieverIdentifier"
              value={formData.recieverIdentifier}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">
              Realizar Transferencia
          </button>
        </form>
      </Content>

      <QRCodeContent>
        { stringQrCode ?
          <QRCode value={stringQrCode} size={300} />: ''
        }
      </QRCodeContent>

      <AiOutlineCheckCircle 
        style={{ marginTop: 90 }} 
        color={verifyHashResult ? '#057C22' : '#9B1108'} 
        size={100}
        title="Se estiver verde, string emitida no QRCode é valida"
      />
      <BiReset 
        style={{ marginTop: 90 }} 
        color={colors.secondary} 
        size={100}
        title="Resetar Dados"
        onClick={handleReset}
      />
     
    </Wrapper>

  </>

  );
}

export default App;