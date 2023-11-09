import { signInwithGooglePopup } from '../../utils/firebase/firebase.utils';

const Signin = () => {
    const logGoogleUser = async () => {
        const response = await signInwithGooglePopup();
        console.log(response);
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