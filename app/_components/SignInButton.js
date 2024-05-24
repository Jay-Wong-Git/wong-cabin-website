import Image from "next/image";
import { signInViaGithubAction, signInViaGoogleAction } from "../_lib/actions";

function SignInButton() {
  return (
    <div className="flex flex-col gap-5">
      <form action={signInViaGoogleAction}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
      <form action={signInViaGithubAction}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
          <Image
            src="https://authjs.dev/img/providers/github.svg"
            alt="Github logo"
            height="24"
            width="24"
          />
          <span>Continue with Github</span>
        </button>
      </form>
    </div>
  );
}

export default SignInButton;
