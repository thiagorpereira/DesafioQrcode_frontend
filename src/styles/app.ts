import styled from 'styled-components';
import { darken } from 'polished';
import colors from './colors';

export const Wrapper = styled.div`
    /* flex: 1; */
    /* padding: 50px; */
    height: 100%;
    background: linear-gradient(-90deg, #6C50F5, #4AB0FF);
    display: flex;
    flex-direction: row;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  margin-left: 50;
  display: flex;
  padding-top: 100px;
  margin: 0 100px;

  form {
    display: flex;
    flex-direction: column;
    /* align-self: center; */
    /* margin-top: 30px; */
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;
      margin-top: 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    label {
      color: ${colors.secondary};
      align-self: start;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 20px;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.primary};
      font-weight: bold;
      border: 0;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.09, colors.primary)};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const QRCodeContent = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  margin-left: 50;
  display: flex;
  padding-top: 100px;
  margin: 0 100px;
`; 