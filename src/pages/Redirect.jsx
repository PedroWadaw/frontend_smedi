import { useRedirectAuth } from "../hooks/useRedirectAuth";

export default function Redirect() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const { user, loading } = useRedirectAuth(token);

    return (
        <div className='w-full h-full flex items-center justify-center text-white'>
            <h1 className='text-2xl'>Redirecting...</h1>
        </div>
    );
}