import NextAuthProvider from "./components/next-auth-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <NextAuthProvider>{children}</NextAuthProvider>
    </>
  );
}
