import MultiColorBar from "@/components/ui/layout/multiColorBar";
import Background from "@/components/login/layout/background";
import Login from "@/components/login/login/login";
import FooterInfo from "@/components/layout/footer/footerInfo";

export default function Home() {
  return (
    <>
      <div className="flex gap-2 w-full h-full md:h-screen">
        <Login />
        <Background />
      </div>
      <MultiColorBar />
      <FooterInfo />
    </>
  );
}