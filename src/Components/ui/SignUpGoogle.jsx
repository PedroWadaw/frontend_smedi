export default function SignUpGoogle() {
    const handleGoogleSignUp = () => {
        window.location.href = 'http://localhost:8000/auth-google-redirect';
    }
    return (
        <button onClick={handleGoogleSignUp}
            className="font-mont font-medium px-4 py-2.5 mt-6 w-full border flex items-center justify-center gap-2 rounded-lg bg-white text-black hover:bg-blue-300 transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Sign Up with Google</span>
        </button>
    );
}