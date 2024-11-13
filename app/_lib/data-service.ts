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
    .select("id,name,faculty,president,techLead,image")
    .order("name");

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
    .select("id,name,description,contact,link,points,image,isCompleted,date")
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
  newPoints: number
) {
  const { data, error } = await supabase
    .from("Student")
    .update({ points: newPoints })
    .eq("id", studentId);

  if (error) {
    console.error("Error updating student points:", error);
    return null;
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
