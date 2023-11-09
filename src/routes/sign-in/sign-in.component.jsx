import { signInwithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const Signin = () => {
    const logGoogleUser = async () => {
        const { user } = await signInwithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup
            </button>
        </div>
    )
}

export default Signin