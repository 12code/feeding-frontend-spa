import React, { useState } from 'react';
import { Auth } from 'aws-amplify'
import Button from './Button';
import Input from './Input';

const SignUpForm = (props) => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [verificationCode, setVerificationCode] = useState()
    const [verified, setVerified] = useState(false)
    const [signedin, setSignedin] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState()
    const [tempUsr, setTempUsr] = useState()

    const signUp = async (e) => {

        setError(null)

        try {
        
            console.log("before signin...")

            console.log(username);
            console.log(password)
            console.log(name)

            const signInResult = await Auth.signUp({
              username: username,
              password: password,
              attributes: {
                  name: name
              }
            }).then(result => {

                console.log("Auth.signUp process done...")
                console.log(result)
                
                //props.user(result)
                //props.closeForm(e)
                //console.log(result)
                //setVerified(true)

            }).catch(authErr => { 

                console.log("error from Auth.signIn...")
                console.log(authErr)
                setError("incorrect username or password")
                throw new Error(authErr)

            });

          } catch (e) {
            switch (e.message) {
              case 'Username should be either an email or a phone number.':
                setError(e.message);
                break;
              case 'Password did not conform with policy: Password not long enough':
                setError(e.message);
                break;
              case 'User is not confirmed.':
                setError(e.message);
                break;
              case 'Incorrect username or password.':
                setError(e.message);
                break;
              case 'User does not exist.':
                setError(e.message);
                break;
              default:
                setError(e.message);
            }
          }

          try {
        
            console.log("before signin double...")

            const signInResult = await Auth.signIn({
              username: username,
              password: password
            }).then(result => {

                console.log("Auth.signIn double process done...")
                console.log(result)
                setTempUsr(result)
                props.closeForm(e)
                setVerified(true)
                console.log("after signin double...")

            }).catch(authErr => { 

                console.log("error from Auth.signIn...")
                console.log(authErr)
                setError("incorrect username or password")
                throw new Error(authErr)

            });

            // console.log("result...")
            // console.log(signInResult)

            // if(signInResult === undefined){
            //     throw new Error("username or password is incorrect")
            // }
    
            // const userId = signInResult.attributes.sub;
            //const token =  (await Auth.currentSession()).getAccessToken().getJwtToken();
            //console.log(userId, 'token: ', token);
            //resolve(new AuthSession(userId, token, false));
          } catch (e) {
            switch (e.message) {
              case 'Username should be either an email or a phone number.':
                setError(e.message);
                break;
              case 'Password did not conform with policy: Password not long enough':
                setError(e.message);
                break;
              case 'User is not confirmed.':
                setError(e.message);
                break;
              case 'Incorrect username or password.':
                setError(e.message);
                break;
              case 'User does not exist.':
                setError(e.message);
                break;
              default:
                setError(e.message);
            }
          }
          // console.log("error....")
          // console.log(error)
          // setUsername('')
          // setPassword('')

        //const { username, password } = this.state;
        // console.log("signin: "+username+","+password)  
        // await Auth.signIn({
        //     username: username,
        //     password: password
        // })
        // .then((response) => {
            
        //     console.log(response)
        //     console.log('successfully signed in')
        //     //props.formVisible(false)

        //     confirmAuthenticatedUser()
        // })
        // .catch((err) => {
        //     console.log(`Error signing in: ${ err }`)
        //     throw err
        //     setHasError(true)
        // })

    }

  
    const confirmSignUp = async (e) => {
      Auth.confirmSignUp(username, verificationCode)
      .then(() => {
          console.log('Successfully confirmed signed up')
          console.log(tempUsr)
          props.user(tempUsr)
          //props.closeForm(e)
      })
      .catch((err) => console.log(`Error confirming sign up`))

      try{
        console.log("username...")
        console.log(username)
        console.log("password")
        console.log(password)
      const signInResult = await Auth.signIn({
        username: username,
        password: password
      }).then(result => {

          console.log("Auth.signIn double2 process done...")
          console.log(result)
          setTempUsr(result)
          props.user(result)
          props.closeForm(e)
          setVerified(true)
          console.log("after signin double2...")

      }).catch(authErr => { 

          console.log("error from Auth.signIn...")
          console.log(authErr)
          setError("incorrect username or password")
          throw new Error(authErr)

      });

      // console.log("result...")
      // console.log(signInResult)

      // if(signInResult === undefined){
      //     throw new Error("username or password is incorrect")
      // }

      // const userId = signInResult.attributes.sub;
      //const token =  (await Auth.currentSession()).getAccessToken().getJwtToken();
      //console.log(userId, 'token: ', token);
      //resolve(new AuthSession(userId, token, false));
    } catch (e) {
      switch (e.message) {
        case 'Username should be either an email or a phone number.':
          setError(e.message);
          break;
        case 'Password did not conform with policy: Password not long enough':
          setError(e.message);
          break;
        case 'User is not confirmed.':
          setError(e.message);
          break;
        case 'Incorrect username or password.':
          setError(e.message);
          break;
        case 'User does not exist.':
          setError(e.message);
          break;
        default:
          setError(e.message);
      }
    }

    }
  
    const handleSubmit = (e) => {

      e.preventDefault();
  
      if (verified) {
        confirmSignUp(e);
        setVerificationCode('');
        //setUsername('');
      } else {
        signUp();          
        //setPassword('');
        //setName('');
        setVerified(true);
      }

      e.target.reset();
        
    }
  
    const handleChange = (e) => {

        if (e.target.id === 'username') {
                setUsername(e.target.value)
          } else if (e.target.id === 'password') {
                setPassword(e.target.value)
          } else if (e.target.id === 'name') {
                setName(e.target.value)
          } else if (e.target.id === 'confirmationCode') {
                setVerificationCode(e.target.value)
          }
    }

    const formDislayType = (e) => {
        e.preventDefault()
        console.log("setting form type from login")
        props.formType('login')
    }

    return (
      <>
        {verified && 
          <div>
            <form onSubmit={handleSubmit}>
              <label>Confirmation Code</label>
              <input id='confirmationCode' type='text' onChange={handleChange}/>
              <button>Confirm Sign up</button>
            </form>
            {error && <div style={{padding:25}}>{error}</div>}
          </div>

      }

        {!verified && 
          <div>
            <h2 className="mt-0 mb-16">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <Input id="name" type="text" label="" placeholder="name" onChange={handleChange}/>
                    <Input id="username" type="text" label="" placeholder="email address" onChange={handleChange}/>
                    <Input id="password" type="password" label="" placeholder="password" onChange={handleChange}/>
                    <div style={{padding:25}}><a href="" onClick={formDislayType}>OR... Account Login</a></div>
                    <div style={{padding:25}}><Button color="primary">Submit</Button></div>
                </form>
                {error && <div style={{padding:25}}>{error}</div>}
          </div>
        }
        </>
    )
}

export default SignUpForm