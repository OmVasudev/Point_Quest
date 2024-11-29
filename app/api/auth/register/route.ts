import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addStudent } from "@/app/_lib/data-service";

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      branch,
      usn,

      passingYear,
    } = await request.json();
    //validate email and password
    console.log({
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      branch,
      usn,
      passingYear,
    });
    const hashedPassword = await hash(password, 10);

    const studentData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      phoneNo: phoneNo,
      branch: branch,
      USN: usn,
      passingYear: passingYear,
    };

    const response = await addStudent(studentData);
    console.log("Student added: ", response);
  } catch (error) {
    console.log({ error });
  }

  return NextResponse.json({ message: "success" });
}
