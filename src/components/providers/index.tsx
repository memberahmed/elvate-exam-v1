import ForgotPasswordProvider from "./components/forgot-password-provider";
import NextAuthProvider from "./components/next-auth-provider";
import QusetionsProvider from "./components/question-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <NextAuthProvider>
        <ForgotPasswordProvider>
          <QusetionsProvider>{children}</QusetionsProvider>
        </ForgotPasswordProvider>
      </NextAuthProvider>
    </>
  );
}
