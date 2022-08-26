import React, {useState,useEffect,useRef} from 'react';
import { Auth } from 'aws-amplify'
import Button from './Button';
import Input from './Input';
//import { useState } from 'react/cjs/react.development';
import _, { has } from 'lodash';

const SignInForm = (props) => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [signedin, setSignedin] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [error, setError] = useState()

    // useEffect(() => {
    //     signIn();
    //     return () => {
    //       signIn({}); // This worked for me
    //     };
    //   }, []);

    // const mountedRef = useRef(true)

    // useEffect(() => {
    //     // CALL YOUR API OR ASYNC FUNCTION HERE
    //     return () => { mountedRef.current = false }
    //   }, [])

    const signIn = async (e) => {

        setError(null)

        try {
        
            console.log("before signin...")

            const signInResult = await Auth.signIn({
              username: username,
              password: password
            }).then(result => {

                console.log("Auth.signIn process done...")
                //console.log(result)
                props.user(result)
                props.closeForm(e)

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

  
    const confirmSignIn = () => {
        //const { username } = this.state;
        Auth.confirmSignIn(username)
        .then(() => console.log('successfully confirmed signed in'))
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }

    const confirmAuthenticatedUser = () => {
        Auth.currentUserInfo()
            .then((usr) => {console.log("confirmed authenticated user... "+usr)})
            .catch((e) => {throw e})
    }
  
    const handleSubmit = (e) => {

        e.preventDefault()

        console.log(e.target)
        console.log("after e...")
        
        //handleChange(e)

        
        signIn(e)
        //confirmSignIn()
        // confirmAuthenticatedUser()
        setUsername('')
        setPassword('')
        //setSignedin(true)
        
        e.target.reset();
        //props.formVisible(false)

        console.log("closing form in signinForm...")
        
        //if(!error){props.closeForm(e)}
        
        
    }
  
    const handleChange = (e) => {

        console.log(e)
        console.log("target.id2: "+e.target.id)
        if (e.target.id === 'username') {
            setUsername(e.target.value)
        } else if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
    }

    const formDislayType = (e) => {
        e.preventDefault()
        console.log("setting form type from login")
        props.formType('create')
    }

    return (
        <div>
        <h2 className="mt-0 mb-16">Account Login</h2>
            <form onSubmit={handleSubmit}>
                <Input id="username" type="text" label="" placeholder="email address" onChange={handleChange}/>
                <Input id="password" type="password" label="" placeholder="password" onChange={handleChange}/>
                {error && <div style={{padding:25}}>{error}</div>}
                <div style={{padding:25}}><a href="" onClick={formDislayType}>OR... Create an Account</a></div><div style={{padding:25}}><Button color="primary">Submit</Button></div>
            </form>
        </div>
    )
}

export default SignInForm