import './App.css';
import React from 'react';
import {Container} from '@mui/material';
import Header from './components/Header.jsx';
import InstructionText from './components/InstructionText.jsx';
import CaptchaGrid from './components/CaptchaGrid.jsx';
import ClaimButton from './components/ClaimButton.jsx';
import BalanceLabel from './components/BalanceLabel.jsx';
import {emitter} from './main.jsx';
import Initiator from './components/Initiator.jsx';
import AddressField from './components/AddressField.jsx';
import {If, Then, Else} from 'react-if';
import {Toaster} from 'react-hot-toast';
import Description from './components/Description.jsx';
function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    emitter.on('instanceInitSuccess', async (data) => {
      setIsLoaded(true);
      setData(data.instance);
    });
    emitter.on('instanceInitFail', () => {
      setIsLoaded(false);
    });
  }, []);
  return (
    <If condition={isLoaded}>
      <Then>
        <Container>
          <Header />
          <Description description={data.description} />
          <InstructionText />
          <BalanceLabel address={data.address} />
          <AddressField />
          <CaptchaGrid />
          <ClaimButton />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                fontSize: '20px',
                borderRadius: '50px',
                background: '#333',
                color: '#fff'
              }
            }}
          />
        </Container>
      </Then>
      <Else>
        <Container>
          <Initiator />
        </Container>
      </Else>
    </If>
  );
}

export default App;
