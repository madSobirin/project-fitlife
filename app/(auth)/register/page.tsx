"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, Eye } from "lucide-react";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 font-semibold text-white hover:bg-emerald-600 transition shadow-sm"
    >
      {pending ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <>Create Account →</>
      )}
    </button>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(data: FormData) {
    setErrors({});
    const result = await register(data);
    if (result?.error) {
      setErrors(result.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7f6] px-6">
      <div className="w-full max-w-md ">
        {/* top link */}
        <div className="flex justify-end text-sm mb-14">
          <span className="text-neutral-500">
            Belum punya akun?{" "}
            <Link
              href="/login"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </span>
        </div>

        {/* heading */}
        <div className="mb-10">
          <h1 className="text-[36px] leading-tight font-bold text-neutral-900">
            Start Your Journey
          </h1>
          <p className="text-neutral-500 mt-2 text-[15px]">
            Create your account to access elite tracking and coaching.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          {/* name */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-neutral-700"
              htmlFor="name"
            >
              Full Name
            </Label>

            <Input
              name="name"
              id="name"
              placeholder="Enter your full name"
              className="placeholder:text-neutral-600 h-12 rounded-xl border border-neutral-200 bg-white shadow-sm focus-visible:ring-emerald-500 text-neutral-700"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            {errors.name && (
              <p className="text-xs text-red-500">{errors.name[0]}</p>
            )}
          </div>

          {/* email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700"
            >
              Email Address
            </Label>

            <Input
              name="email"
              type="email"
              id="email"
              placeholder="name@example.com"
              className="placeholder:text-neutral-600  h-12 rounded-xl border border-neutral-200 bg-white shadow-sm focus-visible:ring-emerald-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email[0]}</p>
            )}
          </div>

          {/* password */}
          <div className="space-y-2">
            <Label
              className="text-sm font-medium text-neutral-700"
              htmlFor="password"
            >
              Password
            </Label>

            <div className="relative">
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="Create a secure password"
                className="placeholder:text-neutral-600  h-12 rounded-xl border border-neutral-200 bg-white shadow-sm pr-10 focus-visible:ring-emerald-500"
              />

              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 cursor-pointer" />
            </div>

            {errors.password && (
              <p className="text-xs text-red-500">{errors.password[0]}</p>
            )}
          </div>

          <SubmitButton />

          {/* divider */}
          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-neutral-200 flex-1" />
            <span className="text-sm text-neutral-400">or join with</span>
            <div className="h-px bg-neutral-200 flex-1" />
          </div>

          {/* google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-neutral-200 bg-white rounded-xl py-3 hover:bg-gray-100 transition text-neutral-800 font-medium"
          >
            <Image src="/search.png" alt="google" width={20} height={20} />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}
