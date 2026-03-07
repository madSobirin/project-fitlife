"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-primary text-background-dark hover:bg-primary-hover font-bold"
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : "Buat Akun"}
    </Button>
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
    <div className="flex min-h-screen justify-center items-center bg-background-base p-4">
      <Card className="w-full max-w-sm border-card-border bg-card-dark text-text-light">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Daftar Akun</CardTitle>
            <Link href="/login">
              <Button variant="link" className="text-primary p-0">
                Sign In
              </Button>
            </Link>
          </div>
          <CardDescription className="text-text-muted">
            Mulai perjalanan sehatmu bersama FitLife.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                name="name"
                id="name"
                placeholder="John Doe"
                className="bg-background-dark border-card-border"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                className="bg-background-dark border-card-border"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                className="bg-background-dark border-card-border"
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password[0]}</p>
              )}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
