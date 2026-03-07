"use client";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full cursor-pointer mt-5"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-yellow-400" />
          Please wait
        </>
      ) : (
        "Login"
      )}
    </Button>
  );
}

function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setErrors({});
    try {
      const result = await login(formData);
      if (result?.error) {
        setErrors(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/register">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="flex flex-col gap-6">
              {errors.form && (
                <div className="p-3 text-sm font-medium text-red-500 bg-red-50 border border-red-200 rounded-md">
                  {errors.form[0]}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email[0]}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password[0]}</p>
                )}
              </div>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full cursor-pointer">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default LoginPage;
