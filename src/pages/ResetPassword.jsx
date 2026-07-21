import { useResetPassword } from "../hooks/useResetPassword";
import { toast, Toaster } from 'react-hot-toast'
import Galaxy from '../Components/Galaxy';

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  } = useResetPassword();

  const submitHandler = async (data) => {
    const res = await onSubmit(data);

    if (res.success) {
      toast.success("Password berhasil diubah");

      window.location.href = "/login";
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-screen fixed top-0 left-0 z-0">
        <Galaxy />
      </div>

      <div className="z-10 w-full font-mont max-w-sm lg:max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-white/70">Enter your new password</p>
        </div>

        <form className="space-y-3.5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="w-full">
            <input className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
              type="password"
              placeholder="Password baru"
              {...register("password")}
            />

            {errors.password && (
              <p className="pt-1 text-red-400 text-base">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full">
            <input className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
              type="password"
              placeholder="Konfirmasi password"
              {...register(
                "password_confirmation"
              )}
            />

            {errors.password_confirmation && (
              <p className="pt-1 text-red-400 text-base">
                {
                  errors.password_confirmation
                    .message
                }
              </p>
            )}

            {errors.root && (
              <p className="pt-1 text-red-400 text-base">{errors.root.message}</p>
            )}
          </div>

          <button disabled={loading} className="w-full p-2.5 text-lg font-medium rounded-lg bg-white text-black hover:bg-gray-200 transition" type="submit">
            {loading ? "Loading..." : "Simpan Password"}
          </button>
        </form>
      </div>
    </div>
  );
}