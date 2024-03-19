import { signIn, type SignInInput, getCurrentUser } from 'aws-amplify/auth';

import { useEffect, useState } from 'react';
import { Credentials } from '../../AppConfig';
import { Button, Input } from 'antd';

// NEW NEW NEW NEW: https://docs.amplify.aws/react/build-a-backend/auth/enable-sign-up/#sign-in

type MyProps = {
  children: JSX.Element | JSX.Element[] | null
}




export default function RestrictedAdmin({children}: MyProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [triggerAuthCheck, setTriggerAuthCheck] = useState(false);

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(`signIn successful!`);
      console.log(`isSignedIn: ${isSignedIn}`);
      console.log(`nextStep: ${nextStep}`);

      setTriggerAuthCheck(! triggerAuthCheck);

    } catch (error) {
      console.log('error signing in', error);
    }
  }  

  const checkAuth = async () => {
    try {

      const { username, userId, signInDetails } = await getCurrentUser(); // throws error if user is not authenticated
      console.log(`username: ${username}`);
      console.log(`userId: ${userId}`);
      console.log(`signInDetails: ${signInDetails}`);

      setIsAuthenticated(true);
    }
    catch (e) {
      console.log(`ITC: USER NOT AUTHENTICATED`);

      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [triggerAuthCheck]);

  if (isAuthenticated) {
    return(
      <div>{children}</div>
    );
  }
  else {
    return(
      <RSignIn handleSignIn={handleSignIn} />
    );
  }
}

function RSignIn({handleSignIn}: {handleSignIn: (args: SignInInput) => void}) {

  const [username, setUsername] = useState<string>("");
  const [password, setPw] = useState<string>("");

  const handleSubmit = () => {
    console.log(`username: ${username}`);
    console.log(`pw: ${password}`);
    handleSignIn({username, password})
  }

  return(
    <div>
      <Input placeholder='e-mail' onChange={(e) => setUsername(e.target.value)} />
      <Input.Password placeholder="password" onChange={(e) => setPw(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );

}

/*
Change password of user in Cogniro user pool:

aws cognito-idp forgot-password --client-id 5c5uq3b0042h4qv9tgbpnc7dp1 --username tdomenig@it-couture.ch

// will get verification code by e-mail

aws cognito-idp confirm-forgot-password --client-id 5c5uq3b0042h4qv9tgbpnc7dp1 --username tdomenig@it-couture.ch --confirmation-code 503898 --password H9H^iY1V@f2STqBRy


*/