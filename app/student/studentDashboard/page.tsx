import React from "react";
import {
  getParticipated,
  getParticipatedEvent,
  getParticipatedClub,
  updateStudentPoints,
} from "../../_lib/data-service";

export default async function Page() {
  const studentId = 1;

  const participations = await getParticipated(studentId);

  if (!participations || participations.length === 0) {
    return <div>No events found for this student.</div>;
  }

  let totalPoints = 0;
  const eventsWithClubs = await Promise.all(
    participations.map(async ({ eventId }) => {
      const event = await getParticipatedEvent(eventId);

      if (!event) return null;

      totalPoints += event.points;
      const club = await getParticipatedClub(event.clubId);
      return { event, club };
    })
  );

  await updateStudentPoints(studentId, totalPoints);

  return (
    <div>
      <h2>Students Updated Points: {totalPoints}</h2>
      <h3>Participated Events:</h3>
      {eventsWithClubs.map((item, index) =>
        item && item.event ? (
          <div key={index}>
            <p>
              <strong>Event Name:</strong> {item.event.name}
            </p>
            <p>
              <strong>Date:</strong> {item.event.date}
            </p>
            <p>
              <strong>Points:</strong> {item.event.points}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a href={item.event.link}>{item.event.link}</a>
            </p>
            {item.club ? (
              <p>
                <strong>Club:</strong> {item.club.name}
              </p>
            ) : (
              <p>Club information not found</p>
            )}
          </div>
        ) : (
          <p key={index}>Event data not found</p>
        )
      )}
    </div>
  );
}
