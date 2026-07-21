import { useForgotPassword } from "../hooks/useForgotPassword";
import { toast, Toaster } from 'react-hot-toast'
import Galaxy from '../Components/Galaxy';

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    isValid,
    onSubmit,
  } = useForgotPassword();

  const submitHandler = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      toast.success("Link reset password dikirim ke email Anda");
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
          <p className="text-white/70">Enter your email to reset your password</p>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-3.5"
        >
          <div className="w-full">
            <input className={`w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none border`}
              type="email"
              placeholder="Email"
              {...register("email")}
            />

            {errors.email && (
              <p className="pt-1 text-red-400 text-base">{errors.email.message}</p>
            )}

            {errors.root && (
              <p className="pt-1 text-red-400 text-base">{errors.root.message}</p>
            )}

          </div>

          <button disabled={loading || !isValid} className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-200 transition" type="submit">
            {loading ? "Loading..." : "Kirim Link"}
          </button>
        </form>

      </div>
    </div>
  );
}