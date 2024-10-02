import { Centered } from "@/components/helperComponent/Centered";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Centered>
      <SignIn />;
    </Centered>
  );
}
