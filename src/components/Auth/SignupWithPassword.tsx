"use client";

import { EmailIcon, PasswordIcon, UserIcon } from "@/assets/icons";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import InputGroup from "../FormElements/InputGroup";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

// Translations hook
const SignupWithPassword = () => {
  const t = useTranslations("auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const SignupSchema = z
    .object({
      firstName: z.string().min(1, t("first_name_required")),
      lastName: z.string().min(1, t("last_name_required")),
      email: z.string().email(t("invalid_email")),
      password: z
        .string()
        .min(8, t("password_min_length"))
        .regex(/[a-zA-Z]/, t("password_letters"))
        .regex(/[0-9]/, t("password_numbers")),
      reEnterPassword: z.string(),
    })
    .refine((data) => data.password === data.reEnterPassword, {
      message: t("passwords_do_not_match"),
      path: ["reEnterPassword"],
    });

  type FormData = z.infer<typeof SignupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/user/register", data);

      if (res.status === 200) {
        toast.success(t("user_registered"));
        reset();

        const result = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.data || t("registration_failed"));
      }
    } catch (error: any) {
      toast.error(error?.response?.data || t("something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup
        type="text"
        label={t("first_name")}
        className="mb-4 [&_input]:py-[15px]"
        placeholder={t("enter_first_name")}
        register={register("firstName")}
        error={errors.firstName?.message}
        icon={<UserIcon />}
      />

      <InputGroup
        type="text"
        label={t("last_name")}
        className="mb-4 [&_input]:py-[15px]"
        placeholder={t("enter_last_name")}
        register={register("lastName")}
        error={errors.lastName?.message}
        icon={<UserIcon />}
      />

      <InputGroup
        type="email"
        label={t("email")}
        className="mb-4 [&_input]:py-[15px]"
        placeholder={t("enter_email")}
        register={register("email")}
        error={errors.email?.message}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label={t("password")}
        className="mb-4 [&_input]:py-[15px]"
        placeholder={t("enter_password")}
        register={register("password")}
        error={errors.password?.message}
        icon={<PasswordIcon />}
      />

      <InputGroup
        type="password"
        label={t("retype_password")}
        className="mb-6 [&_input]:py-[15px]"
        placeholder={t("reenter_password")}
        register={register("reEnterPassword")}
        error={errors.reEnterPassword?.message}
        icon={<PasswordIcon />}
      />

      <button
        type="submit"
        className="mb-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        disabled={loading}
      >
        {t("create_account")}
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
        )}
      </button>
    </form>
  );
};

export default SignupWithPassword;
