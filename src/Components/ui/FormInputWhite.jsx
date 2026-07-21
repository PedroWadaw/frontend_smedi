import React from "react";

const FormInputWhite = React.forwardRef(
  ({ name, type = "text", placeholder, error, ...rest }, ref) => {

    return (
      <div>
        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full p-3 rounded-lg bg-gray-200 outline-none border border-gray-300"
          {...rest}
        />

        {error && (
          <p className="pt-1 text-red-400 text-base">{error}</p>
        )}

      </div>
    );
  }
);

export default FormInputWhite;