import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SetNameStep from './createFaucetSteps/SetName.jsx';
import ChooseIntervalStep from './createFaucetSteps/ChooseInterval.jsx';
import SetRewardStep from './createFaucetSteps/SetReward.jsx';
// eslint-disable-next-line max-len
import SetCaptchaDifficultyStep from './createFaucetSteps/SetCaptchaDiffIculty.jsx';
// eslint-disable-next-line max-len
import ConfigureProxyChecksStep from './createFaucetSteps/ConfigureProxyChecks.jsx';
import DesignFaucetStep from './createFaucetSteps/DesignFaucet.jsx';
import ReviewAndCreateStep from './createFaucetSteps/ReviewAndCreate.jsx';
import PaymentStep from './createFaucetSteps/Payment.jsx';
import SaveSecretsStep from './createFaucetSteps/SaveSecrets.jsx';
import Success from './createFaucetSteps/Success.jsx';
import SetDescriptionStep from './createFaucetSteps/SetDescription.jsx';

export default function CreateFaucetStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [faucetConfig, setFaucetConfig] = React.useState({});
  const [canContinue, setCanContinue] = React.useState(false);
  const [canGoBack, setCanGoBack] = React.useState(true);
  const [paymentInfo, setPaymentInfo] = React.useState({});
  const [secrets, setSecrets] = React.useState({});
  const updateData = (data) => {
    // Data types:
    // interval, proxyCheck, design, captchaDifficulty, name, reward
    // Make a switch for data.type
    if (data.value === null) {
      setCanContinue(false);
      return;
    } else {
      setCanContinue(true);
    }
    switch (data.type) {
      case 'interval':
        setFaucetConfig({
          ...faucetConfig,
          interval: data.value,
        });
        break;
      case 'proxyCheck':
        setFaucetConfig({
          ...faucetConfig,
          proxyCheck: data.value,
        });
        break;
      case 'theme':
        if (data.value.icon === undefined || data.value.theme === undefined) {
          setCanContinue(false);
          return;
        }
        setFaucetConfig({
          ...faucetConfig,
          theme: data.value,
        });
        setCanContinue(true);
        break;
      case 'captchaDifficulty':
        setFaucetConfig({
          ...faucetConfig,
          captchaDifficulty: data.value,
        });
        break;
      case 'name':
        setFaucetConfig({
          ...faucetConfig,
          name: data.value,
        });
        break;
      case 'reward':
        setFaucetConfig({
          ...faucetConfig,
          reward: data.value,
        });
        break;
      case 'description':
        setFaucetConfig({
          ...faucetConfig,
          description: data.value,
        });
    }
  };
  const isStepOptional = (step) => {
    return steps[step].optional;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCanContinue(false);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const paymentSuccess = (data) => {
    setSecrets(data);
    handleNext();
    setCanContinue(true);
    setCanGoBack(false);
  };
  const continueToPayment = () => {
    handleNext();
    setCanContinue(false);
    setCanGoBack(false);
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur
      // unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.');
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const steps = [
    {
      name: 'Select a name',
      component: <SetNameStep dataUpdate={updateData}/>,
      optional: false,
    },
    {
      name: 'Set the description',
      component: <SetDescriptionStep dataUpdate={updateData}/>,
      optional: false,
    },
    {
      name: 'Choose the interval',
      component: <ChooseIntervalStep dataUpdate={updateData}/>,
      optional: false,
    },
    {
      name: 'Set the reward',
      component: <SetRewardStep dataUpdate={updateData}/>,
      optional: false,
    },
    {
      name: 'Set the captcha difficulty',
      component: <SetCaptchaDifficultyStep dataUpdate={updateData}/>,
      optional: false,
    },
    {
      name: 'Configure proxy checks',
      component: <ConfigureProxyChecksStep dataUpdate={updateData}/>,
      optional: true,
    },
    {
      name: 'Design the faucet',
      component: <DesignFaucetStep dataUpdate={updateData}/>,
      optional: false,
    },
    {
      name: 'Review and create',
      component: <ReviewAndCreateStep
        setPaymentInfo={setPaymentInfo}
        continueToPayment={continueToPayment}
        data={faucetConfig}/>,
      optional: false,
    },
    {
      name: 'Make the anti-bot payment',
      component: <PaymentStep
        paymentInfo={paymentInfo}
        paymentSuccess={paymentSuccess}/>,
      optional: false,
    },
    {
      name: 'Save the secrets',
      component: <SaveSecretsStep secrets={secrets}/>,
      optional: false,
    },
  ];
  return (
    <Box sx={{width: '100%'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((stepObject, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption" sx={{display: {xs: 'none', lg: 'initial'}}}>Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={stepObject.name} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography variant={'span'} sx={{display: {xs: 'none', lg: 'flex'}}}>{stepObject.name}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Success
            address={secrets.address}
            name={secrets.name}
          />
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Box sx={{flex: '1 1 auto'}} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {steps[activeStep].component}
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || !canGoBack}
              onClick={handleBack}
              sx={{mr: 1}}
            >
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} disabled={!canContinue}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
