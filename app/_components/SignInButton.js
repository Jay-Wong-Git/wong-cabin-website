import Image from "next/image";
import { signInViaGithubAction, signInViaGoogleAction } from "../_lib/actions";

const providers = [
  {
    name: "Google",
    image: "https://authjs.dev/img/providers/google.svg",
    action: signInViaGoogleAction,
  },
  {
    name: "Github",
    image: "https://authjs.dev/img/providers/github.svg",
    action: signInViaGithubAction,
  },
];

function SignInButton() {
  return (
    <div className="flex flex-col gap-5">
      {providers.map((provider) => (
        <form action={provider.action} key={provider.name}>
          <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
            <Image
              src={provider.image}
              alt={`${provider.name} logo`}
              height="24"
              width="24"
            />
            <span>{`Continue with ${provider.name}`}</span>
          </button>
        </form>
      ))}
    </div>
  );
}

export default SignInButton;
