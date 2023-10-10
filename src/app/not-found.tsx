import { useTimeout } from "usehooks-ts";
import { redirect } from "next/navigation";

export default function PostNotFound() {
  console.log(`ooga booga boobayss`);
  const goAway = async () => {
    console.log(`ooga booga redirecting`);
    return new Promise((_resolve) => redirect("/"));
  };

  useTimeout(goAway, 5000);
}
