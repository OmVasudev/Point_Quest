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
