import React from "react";

const FormInput = React.forwardRef(
  ({ name, type = "text", placeholder, error, ...rest }, ref) => {

    return (
      <div>
        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
          {...rest}
        />

        {error && (
          <p className="pt-1 text-red-400 text-base">{error}</p>
        )}

      </div>
    );
  }
);

export default FormInput;