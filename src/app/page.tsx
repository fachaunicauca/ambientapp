import LoginForm from "@/components/login/loginForm";
import InfoSection from "@/components/login/infoSection";

export default function Home() {
  return (
    <div className="flex gap-2 w-full h-screen p-2">
      <LoginForm />
      <InfoSection />
    </div>
  );
}