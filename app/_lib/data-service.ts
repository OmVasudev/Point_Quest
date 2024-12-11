import { supabase } from "./supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getClub(id: number) {
  const { data, error } = await supabase
    .from("Club")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getClubs() {
  const { data, error } = await supabase
    .from("Club")
    .select("id,name,faculty,president,techLead,image,category")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Clubs could not be loaded");
  }

  return data;
}
export async function getClubNames() {
  const { data, error } = await supabase
    .from("Club")
    .select("id,name")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Clubs could not be loaded");
  }

  return data;
}

export async function getEvent(id: number) {
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getEvents() {
  const { data, error } = await supabase
    .from("Event")
    .select(
      "id,name,clubId,description,contact,link,points,image,isCompleted,date",
    )
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Events could not be loaded");
  }

  return data;
}

export async function getStudent(id: number) {
  const { data, error } = await supabase
    .from("Student")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getBod(id: number) {
  const { data, error } = await supabase
    .from("BOD")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getAdmin(id: number) {
  const { data, error } = await supabase
    .from("Admin")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getParticipatedStudent(studentId: number) {
  const { data, error } = await supabase
    .from("Participated")
    .select("eventId")
    .eq("studentId", studentId);

  if (error) {
    console.error("Error fetching participation data:", error);
    return null;
  }

  return data;
}

export async function getParticipatedBod(BodId: number) {
  const { data, error } = await supabase
    .from("Participated")
    .select("eventId")
    .eq("bodId", BodId);

  if (error) {
    console.error("Error fetching participation data:", error);
    return null;
  }

  return data;
}

export async function getParticipatedAdmin(adminId: number) {
  const { data, error } = await supabase
    .from("Participated")
    .select("eventId")
    .eq("adminId", adminId);

  if (error) {
    console.error("Error fetching participation data:", error);
    return null;
  }

  return data;
}

export async function getParticipatedEvent(eventId: number) {
  const { data, error } = await supabase
    .from("Event")
    .select("name, date, points, link, clubId")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error fetching event data:", error);
    return null;
  }

  return data;
}

export async function getParticipatedClub(clubId: number) {
  const { data, error } = await supabase
    .from("Club")
    .select("name")
    .eq("id", clubId)
    .single();

  if (error) {
    console.error("Error fetching club data:", error);
    return null;
  }

  return data;
}

export async function updateStudentPoints(
  studentId: number,
  newPoints: number,
) {
  const { data, error } = await supabase
    .from("Student")
    .update({ points: newPoints })
    .eq("id", studentId);

  if (error) {
    console.error("Error updating student points:", error);
    return "getting error while updating";
  }

  return data;
}

export async function updateBodPoints(bodId: number, newPoints: number) {
  const { data, error } = await supabase
    .from("BOD")
    .update({ points: newPoints })
    .eq("id", bodId);

  if (error) {
    console.error("Error updating bod points:", error);
    return "getting error while updating";
  }

  return data;
}

export async function updateAdminPoints(adminId: number, newPoints: number) {
  const { data, error } = await supabase
    .from("Admin")
    .update({ points: newPoints })
    .eq("id", adminId);

  if (error) {
    console.error("Error updating admin points:", error);
    return "getting error while updating";
  }

  return data;
}

export async function calculateTotalPoints(studentId: number) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  let participations;
  if (role === "student") {
    participations = await getParticipatedStudent(studentId);
  } else if (role === "bod") {
    participations = await getParticipatedBod(studentId);
  } else {
    participations = await getParticipatedAdmin(studentId);
  }

  if (!participations || participations.length === 0) {
    console.log("No events found for this student.");
    return 0;
  }

  let totalPoints = 0;
  for (const participation of participations) {
    const event = await getParticipatedEvent(participation.eventId);
    if (event && event.points) {
      totalPoints += event.points;
    }
  }

  return totalPoints;
}

export async function updateStudentTotalPoints(studentId: number) {
  const totalPoints = await calculateTotalPoints(studentId);
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  let result;
  if (role === "student")
    result = await updateStudentPoints(studentId, totalPoints);
  else if (role === "bod")
    result = await updateBodPoints(studentId, totalPoints);
  else result = await updateAdminPoints(studentId, totalPoints);

  if (result) {
    console.log(`points updated successfully to ${totalPoints}`);
  } else {
    console.error("Failed to update points.");
  }
}

export async function updateStudent(
  id: number,
  updatedData: {
    firstName?: string;
    lastName?: string;
    phoneNo?: string;
  },
) {
  const { data, error } = await supabase
    .from("Student")
    .update(updatedData)
    .eq("id", id);

  if (error) console.error(error);
  return data;
}
export async function updatePoints(
  id: number,
  updatedData: {
    points?: number;
  },
) {
  const { data, error } = await supabase
    .from("Student")
    .update(updatedData)
    .eq("id", id);

  if (error) console.error(error);
  return data;
}

export async function getStudentByMail(email: string) {
  const { data, error } = await supabase
    .from("Student")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching student data:", error);
    return null;
  }

  return data;
}

export async function getStudentByUsn(USN: string) {
  const { data, error } = await supabase
    .from("Student")
    .select("*")
    .eq("USN", USN)
    .single();

  if (error) {
    console.error("Error fetching student data:", error);
    return null;
  }

  return data;
}
//om work space start here

export async function addEvent(eventData: {
  name: string;
  description: string;
  contact: string;
  link: string;
  points: number;
  image: string;
  clubId: number;
  isCompleted: boolean;
  date: string;
}) {
  const { data, error } = await supabase.from("Event").insert([eventData]);

  if (error) {
    console.error("Error adding new event:", error.message, error.details);
    throw new Error("Failed to add new event");
  }

  return data;
}

// Function to update an existing event
export async function updateEvent(
  eventId: number,
  updatedData: {
    name?: string;
    description?: string;
    contact?: string;
    link?: string;
    points?: number;
    image?: string;
    clubId?: number;
    isCompleted?: boolean;
    date?: string;
  },
) {
  const { data, error } = await supabase
    .from("Event")
    .update(updatedData)
    .eq("id", eventId);

  if (error) {
    console.log("Failed to update event", error);
    return null;
  }
  return data;
}

export async function addClub(clubData: {
  id: number;
  name: string;
  faculty: string;
  president: string;
  techLead: string;
  image: string;
  category: string; // New field
}) {
  const { data, error } = await supabase.from("Club").insert([clubData]);

  if (error) {
    console.error("Error adding new club:", error.message, error.details);
    throw new Error("Failed to add new club");
  }

  return data;
}

//update clubs info
export async function updateClub(
  clubId: number,
  updatedData: {
    name?: string;
    faculty?: string;
    president?: string;
    techLead?: string;
    image?: string;
    category?: string;
  },
) {
  const { data, error } = await supabase
    .from("Club")
    .update(updatedData)
    .eq("id", clubId);

  if (error) {
    console.error("Error updating club information:", error);
    return null;
  }

  return data;
}

export async function addBod(bodData) {
  const { data, error } = await supabase.from("BOD").insert([bodData]);

  if (error) {
    console.error("Error adding new BOD:", error.message, error.details);
    throw new Error("Failed to add new BOD");
  }

  return data;
}

// Function to update BOD information
export async function updateBod(id: number, bodData: any) {
  const { data, error } = await supabase
    .from("BOD") // Ensure your Supabase table name is "BOD"
    .update(bodData) // `bodData` should only contain fields you want to update
    .eq("id", id); // Match the record by the "id" field

  if (error) {
    console.error("Error updating BOD:", error);
    throw new Error(error.message);
  }

  return data; // Return the updated data
}

// Function to get all BODs
export async function getBods() {
  const { data, error } = await supabase.from("BOD").select("*");

  if (error) {
    console.error("Error fetching BODs:", error.message, error.details);
    throw new Error("Failed to fetch BODs");
  }

  return data;
}

export async function addStudent(studentData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: number;
  branch: string;
  USN: string;
  passingYear: number;
}) {
  const { data, error } = await supabase.from("Student").insert([studentData]);

  if (error) {
    console.error("Error adding student:", error.message);
    throw new Error("Failed to add student record.");
  }
  return data;
}

export async function findStudent(usn: string) {
  const { data, error } = await supabase
    .from("Student")
    .select("*")
    .eq("USN", usn)
    .single();

  if (error) {
    console.log("Failed to find student.");
  }

  return data;
}

export async function findBod(usn: string) {
  const { data, error } = await supabase
    .from("BOD")
    .select("*")
    .eq("USN", usn)
    .single();

  if (error) {
    console.log("Failed to find student.");
  }

  return data;
}

export async function findAdmin(usn: string) {
  const { data, error } = await supabase
    .from("Admin")
    .select("*")
    .eq("USN", usn)
    .single();

  if (error) {
    console.log("Failed to find student.");
  }

  return data;
}

export async function addFeedBack(feedback: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await supabase.from("Feedback").insert([feedback]);

  if (error) {
    console.error(
      "Error in adding feedback to database:",
      error.message,
      error.details,
    );
    return false;
  }

  console.log("Feedback saved successfully");
  return true; // Return true on success
}

export async function getBranches() {
  const { data, error } = await supabase
    .from("Branches")
    .select("id,name")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Branches could not be loaded");
  }

  return data;
}

export async function getClubName(id: number) {
  const { data, error } = await supabase
    .from("Club")
    .select("name")
    .eq("id", id);
  if (error) {
    console.log("club name not found");
  }
  return data;
}
