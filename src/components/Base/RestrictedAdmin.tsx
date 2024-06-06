import { signIn, type SignInInput, getCurrentUser } from 'aws-amplify/auth';

import { useContext, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { Context } from '../../util/dbFront/Context';

// NEW NEW NEW NEW: https://docs.amplify.aws/react/build-a-backend/auth/enable-sign-up/#sign-in

type MyProps = {
  children: JSX.Element | JSX.Element[] | null
}




export default function RestrictedAdmin({children}: MyProps) {

  const {setIsAuthenticated} = useContext(Context);

  const [authenticated, setAuthenticated] = useState(false);
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
      setAuthenticated(true);
    }
    catch (e) {
      console.log(`ITC: USER NOT AUTHENTICATED`);

      setIsAuthenticated(false);
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [triggerAuthCheck]);

  if (authenticated) {
    return(
      <div>
        {/* <div style={{position: 'absolute', top: '100px', right: '20px'}}>You are signed in</div> */}

        <div>{children}</div>
      </div>
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
    // console.log(`username: ${username}`);
    // console.log(`pw: ${password}`);
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