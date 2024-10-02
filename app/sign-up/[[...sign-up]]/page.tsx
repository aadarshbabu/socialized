import { Centered } from "@/components/helperComponent/Centered";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Centered>
      <SignUp />
    </Centered>
  );
}
