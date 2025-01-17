import Breadcrumb from "@/components/clients/BreadCrumb";
import Footer from "@/components/clients/Footer";
import Header from "@/components/clients/Header";
import Loading from "@/components/server/Loading";
import { SessionProvider } from "@/libs/NextAuthProvider";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import "../styles/globals.css";

export const metadata = {
  title: "laksmitawidya-mini-porto",
  description: "developed by @laksmitawidya",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <ThemeRegistry>
          <body className="flex flex-col h-screen">
            <Suspense fallback={<Loading />}>
              {session && (
                <>
                  <Header userSession={session.user} />
                  <Breadcrumb />
                </>
              )}

              <main className="flex-1 bg-slate-100">{children}</main>
              {session && <Footer userSession={session.user} />}
            </Suspense>
          </body>
        </ThemeRegistry>
      </SessionProvider>
    </html>
  );
}
