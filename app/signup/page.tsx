import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";
import { getBranches } from "../_lib/data-service";
export default async function SignupPage() {
  const session = await getServerSession();
  const branches = await getBranches();
  if (session) {
    redirect("/");
  }
  return <Form branches={branches} />;
}
