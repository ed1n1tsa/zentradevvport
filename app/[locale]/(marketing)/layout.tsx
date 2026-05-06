import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlockNavigator } from "@/components/BlockNavigator";

export const revalidate = 300;

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mesh-bg relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(31,91,255,0.22),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[24rem] bg-[radial-gradient(ellipse_at_bottom,rgba(31,91,255,0.12),transparent_65%)]" />
      </div>
      <Header />
      <main className="relative flex-1">{children}</main>
      <BlockNavigator />
      <Footer />
    </div>
  );
}
