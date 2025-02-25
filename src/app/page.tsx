import LoginForm from "@/components/auth/loginForm/loginForm";
import InfoSection from "@/components/auth/infoSection/infoSection";
import MultiColorBar from "@/components/ui/multiColorBar";
import Footer from "@/components/footer/topFooter/topFooter";

export default function Home() {
  return (
    <>
      <div className="flex gap-2 w-full h-full md:h-screen">
        <LoginForm />
        <InfoSection />
      </div>
      <MultiColorBar />
      <Footer />
    </>
  );
}