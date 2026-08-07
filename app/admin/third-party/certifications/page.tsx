"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CertificationsAdminRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/third-party");
  }, [router]);
  return null;
}
