
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";
import Loading from "../loading";

const LoginPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#FAF8F5] dark:bg-[#111827] px-4 py-12">
      <Suspense fallback={<div><Loading/></div>}>
            <LoginForm />
        </Suspense>
    </main>
  );
};

export default LoginPage;
