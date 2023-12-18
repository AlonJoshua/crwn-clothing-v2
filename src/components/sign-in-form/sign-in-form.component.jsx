import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInwithGooglePopup,
  signInAuthUserEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "../sign-in-form/sign-in-form.styles.scss";

const deafultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(deafultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(deafultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInwithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserEmailAndPassword(email, password);
      
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        default:
          console.log("error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
