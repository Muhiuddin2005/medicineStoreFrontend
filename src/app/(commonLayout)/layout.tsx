import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSessionAction } from "../../../actions/auth";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionAction();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar initialUser={session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}