import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { getUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className='h-full relative'>
      <Sidebar user={user} />
      <Header user={user} />
      <main className='w-full h-full pt-[72px] md:pl-64 md:pt-0'>
        {children}
      </main>
    </div>
  );
}
