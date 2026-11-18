"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const usuario =
      localStorage.getItem("usuarioLogueado");

    if (!usuario) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
