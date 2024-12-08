import { supabase } from "./supabase";

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

export async function getParticipated(studentId: number) {
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

export async function calculateTotalPoints(studentId: number) {
  const participations = await getParticipated(studentId);

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

  const result = await updateStudentPoints(studentId, totalPoints);

  if (result) {
    console.log(`Student points updated successfully to ${totalPoints}`);
  } else {
    console.error("Failed to update student points.");
  }
}

// export async function updateStudent(
//   email: string,
//   updatedData: {
//     name?: string;
//     email?: string;
//     USN?: string;
//     phone?: string;
//     branch?: string;
//     points?: number;
//   },
// ) {
//   const { data, error } = await supabase
//     .from("Student")
//     .update(updatedData)
//     .eq("email", email);

//   if (error) console.error(error);
//   return data;
// }

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

export async function addBod(bodData: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Add the password field
  phoneNo: string;
  branch: string;
  usn: string;
  clubId: number;
}) {
  const { data, error } = await supabase.from("BOD").insert([bodData]);

  if (error) {
    console.error("Error adding new BOD:", error.message, error.details);
    throw new Error("Failed to add new BOD");
  }

  return data;
}

// Function to update BOD information
export async function updateBod(
  bodId: number,
  updatedData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string; // Add the password field (optional)
    phoneNo?: string;
    branch?: string;
    usn?: string;
    clubId?: number;
  },
) {
  const { data, error } = await supabase
    .from("BOD")
    .update(updatedData)
    .eq("id", bodId);

  if (error) {
    console.error("Error updating BOD information:", error);
    return null;
  }

  return data;
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

// export async function isBOD(usn:string) {
//   const {data,error}=await supabase.from("BOD").select("*").eq("USN",usn);

//   if(error) {
//     console.log("No BOD found");
//     return null;
//   }

//   return data;
// }

export async function addFeedBack(feedback: {
  name: string;
  email: string;
  message: string;
}) {
  const { data, error } = await supabase.from("Feedback").insert([feedback]);

  if (error) {
    console.log(
      "Error in adding feedback to database:",
      error.message,
      error.details,
    );
    return null; // Return null in case of error
  }

  // Check if data is valid and not empty
  if (!data) {
    console.log("No data returned after insert, something went wrong.");
    return null;
  }

  console.log("Feedback saved successfully:", data);
  return data; // Return the inserted data if successful
}
