"use client";

import {
  BottomButtonGradient,
  LabelInputContainer,
  Button,
  Input,
  Label,
} from "@/components";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import useForm from "@/hooks/useForm";


export default function Page() {

  const {
    state,
    onValueChange,
    isLoading,
    setIsLoading,
    error,
    setError,
    submitted,
    setSubmitted } = useForm({ email: "", password: "" });

  const { login, logout } = useAuthStore();

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitted(true);

    const newError: Record<string, any> = {};

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
      // await logout();
      const loginResonse = await login(state.email, state.password);


      if (loginResonse.error) {
        setError({ "loginAppWriteException": loginResonse.error.message });
        setIsLoading(false);
        return;
      }
      else {

        alert("Login successful");
        setIsLoading(false);
        setError({});
        return;
      }

    } catch (error: any) {
      console.log("error in login", error);
      setError({ "loginappwriteException": error.message });
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);

    }

  };



  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border mt-24 mb-10 border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white">Login to DevDiscuss</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Welcome back. Don&apos;t have an account?{" "}
        <Link href="/register" className="text-orange-500 hover:underline">
          Register
        </Link>
      </p>

      {/* Placeholder error message */}
      <p className="mt-6 text-center text-sm text-red-400">
        {/* Show actual error conditionally */}
        {error?.loginAppWriteException && error.loginAppWriteException}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            className="bg-zinc-900 text-white placeholder-zinc-500"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={state.email}
            onChange={onValueChange}
          />
          {error?.email && <p className="mt-2 text-center text-sm text-red-400">{error.email}</p>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            className="bg-zinc-900 text-white placeholder-zinc-500"
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={state.password}
            onChange={onValueChange}
          />
          {error?.password && <p className="mt-2 text-center text-sm text-red-400">{error.password}</p>}
        </LabelInputContainer>

        <Button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-zinc-800 to-zinc-700 font-medium text-white shadow-md"
          type="submit"
          disabled={isLoading}

        >
          {isLoading ? "Logging in…" : "Log in →"}

          <BottomButtonGradient />
        </Button>
      </form>
    </div>
  );
}
