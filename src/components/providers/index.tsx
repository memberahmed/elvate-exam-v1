import ForgotPasswordProvider from "./components/forgot-password-provider";
import NextAuthProvider from "./components/next-auth-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <NextAuthProvider>
        <ForgotPasswordProvider>{children}</ForgotPasswordProvider>
      </NextAuthProvider>
    </>
  );
}
