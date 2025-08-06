"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import {
  BottomButtonGradient,
  LabelInputContainer,
  Button,
  Input,
  Label,
} from "@/components";
import Link from "next/link";
import useForm from "@/hooks/useForm";

export default function Page() {
  const router = useRouter();
  const { createAccount, login } = useAuthStore();

  const {
    state,
    onValueChange,
    isLoading,
    setIsLoading,
    error,
    setError,
    submitted,
    setSubmitted
  } = useForm({ username: "", email: "", password: "" });



  async function handleSubmit(e: React.FocusEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setSubmitted(true);

    const newError: Record<string, any> = {};

    if (!state.username || state.username.trim() === "") {
      newError.username = "Name is required";
    }

    if (!state.email || state.email.trim() === "") {
      newError.email = "Email is required";
    }

    if (!state.password || state.password.trim() === "") {
      newError.password = "Password is required";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      setIsLoading(false);
      return;
    }
    setError({});
    try {


      const response = await createAccount(state.username.trim(), state.email.trim(), state.password.trim());

      if (response.error) {
        setError({ "createAccountException": response.error.message });
        setIsLoading(false);
        return;
      }

      else {
        alert('Account created successfully logging in ......');
        setIsLoading(false);
        setError({});
        router.push("/login");

      }



    } catch (error: any) {
      console.log("error in create account", error);
      setIsLoading(false);
      return;

    }

  }


  return (
    <>

      <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-800  bg-zinc-950 p-6 shadow-lg mt-24 mb-10">
        <h2 className="text-2xl font-bold text-white">Create an account</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>

        {/* Placeholder error message */}
        <p className="mt-6 text-center text-sm text-red-400">

          {
            error?.createAccountException && error?.createAccountException
          }

        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              className="bg-zinc-900 text-white placeholder-zinc-500"
              id="username"
              name="username"
              placeholder="rehan_dev"
              type="text"
              value={state?.username || ""}
              onChange={(e) => onValueChange(e)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              className="bg-zinc-900 text-white placeholder-zinc-500"
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              value={state?.email || ""}
              onChange={(e) => onValueChange(e)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              className="bg-zinc-900 text-white placeholder-zinc-500"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={state?.password || ""}
              onChange={(e) => onValueChange(e)}
            />
          </LabelInputContainer>

          <Button
            disabled={isLoading}
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-800 to-zinc-700 font-medium text-white shadow-md"
            type="submit"
          >
            {isLoading ? "Loading..." : " Create Account ->"}
            <BottomButtonGradient />
          </Button>
        </form>
      </div>


    </>
  )


}