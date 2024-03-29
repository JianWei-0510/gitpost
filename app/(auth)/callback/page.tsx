"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { login } from "@/actions/login";
import { Loader2 } from "lucide-react";

const CallbackLoading = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    login(code);
  }, [code]);

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader2 className='w-10 h-10 animate-spin' />
    </div>
  );
};

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackLoading />
    </Suspense>
  );
}
