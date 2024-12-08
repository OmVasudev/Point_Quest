import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StudentProfileContent from "./proFrom";

const page = async () => {
  const session = await getServerSession(authOptions);
  const studentId = Number(session?.user.id);
  return (
    <div>
      <StudentProfileContent userId={studentId} />
    </div>
  );
};

export default page;
