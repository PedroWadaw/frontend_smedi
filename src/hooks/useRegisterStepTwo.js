import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoSchema } from "../schemas/registerStepTwoSchema";
import { api } from "../services/api";
import { useState, useEffect } from "react";

export function useRegisterStepTwo() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
  });

  const [orgValid, setOrgValid] = useState(null);
  const [checkingOrg, setCheckingOrg] = useState(false);

  const organization_id = watch("organization_id");
  const kode = watch("kode_organisasi");

  useEffect(() => {
    setOrgValid(null);
    setValue("kode_organisasi", "");
    clearErrors("kode_organisasi");
  }, [organization_id]);

  useEffect(() => {
    if (!kode || !organization_id) {
      setOrgValid(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setCheckingOrg(true);

        await api.post("/organizations/validate-code", {
          organization_id,
          kode_organisasi: kode,
        });

        setOrgValid(true);
        clearErrors("kode_organisasi");

      } catch {
        setOrgValid(false);
        setError("kode_organisasi", {
          type: "manual",
          message: "Kode tidak valid",
        });
      } finally {
        setCheckingOrg(false);
      }
    }, 500);

    return () => clearTimeout(timeout);

  }, [kode, organization_id]);

  return {
    register,
    handleSubmit,
    errors,
    loading: isSubmitting,
    watch,
    setValue,
    orgValid,
    checkingOrg,
  };
}