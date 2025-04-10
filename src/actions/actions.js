"use server";

import ClubMembers from "@/components/ClubMembers";
import { PrismaClient } from "@prisma/client";
import { parse } from "date-fns";
const prisma = new PrismaClient();

// __________________________________________LOCATION__________________________________________________
export async function addLocation(formData) {
  try {
    const result = await prisma.locations
      .create({
        data: {
          Name: formData.Name,
          MaxCapacity: parseInt(formData.MaxCapacity),
          Phone: formData.Phone,
          Address: formData.Adress,
          City: formData.City,
          Province: formData.Province,
          PostalCode: formData.PostalCode,
          WebAddress: formData.WebAdress,
          Type: formData.Type,
        },
      })
      .then((response) => {
        console.log("Location added to the database", response);
        return response;
      });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding location:", error);
    return { success: false, error: error.message };
  }
}

// __________________________________________FAMILYMEMBERS__________________________________________________
//need to show error if operation get rejected by the db to the UI
export async function addFamilyMember(formData) {
  try {
    // Check if the club member exists
    const clubMember = await prisma.clubmembers.findUnique({
      where: { ClubMemberID: parseInt(formData.ClubMemberID) },
    });

    if (!clubMember) {
      console.log("Club member ID not found");
      return { success: false, error: "Club member ID not found" };
    }

    // Create a new family member
    const result = await prisma.familymembers.create({
      data: {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        MedicareNumber: formData.MedicareNumber,
        SIN: formData.SIN,
        Email: formData.Email,
        Address: formData.Address,
        City: formData.City,
        Province: formData.Province,
        Postalcode: formData.PostalCode,
        Phone: formData.Phone,
        DOB: formData.DOB,
      },
    });

    console.log("Family member added to the database:", result);
    if (result) {
      update_ClubMember_FamilyMember_Relationship(
        result.FamilyMemberID,
        formData.ClubMemberID,
        formData.Relationship
      );
    }
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding family member:", error);
    return { success: false, error: error.message };
  }
}

async function update_ClubMember_FamilyMember_Relationship(
  familyMemberID,
  ClubMemberID,
  Realtionship
) {
  try {
    const result = await prisma.primaryfamilyrelationships.create({
      data: {
        FamilyMemberID: parseInt(familyMemberID),
        ClubMemberID: parseInt(ClubMemberID),
        Relationship: Realtionship,
      },
    });
    console.log("Family relationship added to the database", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding family relationship:", error);
    return { success: false, error: error.message };
  }
}

// __________________________________________PAYMENTS__________________________________________________
// someone come to pay --> check ID if valid (can it be checked without going to the db?)
// check age if over 18 on payment date --> if yes --> set status to inactive (not very important)
// if sum of all payments for a given id is over 100, mark it as excess donation.
// ATTENTION: need to add logic for Date here
export async function addPayment(formData) {
  try {
    // Check if the family member exists
    const id = await prisma.clubmembers.findUnique({
      where: { ClubMemberID: parseInt(formData.ClubMemberID) },
    });

    if (!id) {
      console.log("club member ID not found");
      return { success: false, error: "club member ID not found" };
    }

    // Create a new payment
    const result = await prisma.payments.create({
      data: {
        Amount: parseFloat(formData.Amount),
        PaymentDate: formData.PaymentDate,
        Method: formData.Method,
        ClubMemberID: parseInt(formData.ClubMemberID),
        InstallmentNumber: parseInt(formData.InstallmentNumber),
      },
    });

    console.log("Payment added to the database:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error: error.message };
  }
}

// __________________________________________EMAILS__________________________________________________
// to send a weekly email to each club member associated with that game
// look at the current date of when it is Sunday
// start the trigger --> get incoming games or sessions
// get players associated with that game or session
// get emails of those players
// fetch other data from the team formations and personnel tables
// structure data into a readable format
// send email to each player with the game details (show them in txt file)
// save output to emails table

export async function generate_and_send_emails_on_sunday() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const session = await prisma.sessions.findMany({
      where: {
        DateTime: {
          gte: today,
          lt: nextWeek,
        },
      },
      include: {
        locations: true,
        teaminformation_sessions_Team1IDToteaminformation: true,
        teaminformation_sessions_Team2IDToteaminformation: true,
      },
    });

    if (session.length === 0) {
      return { success: false, message: "No session found for today." };
    }

    const emails = await assembleEmail(session);
    return emails;
  } catch (error) {
    console.error("Error generating and sending emails:", error);
    return { success: false, error: error.message };
  }
}

async function assembleEmail(sessions) {
  let emails = [];
  for (const session of sessions) {
    let date = session.DateTime.toString().split("T")[0];
    let time = session.DateTime.toString().split("T")[1].split(".")[0];
    let coach1Name =
      session.teaminformation_sessions_Team1IDToteaminformation.CaptainName;
    let coach1Email = coach1Name + "@gmail.com";
    let coach2Name =
      session.teaminformation_sessions_Team2IDToteaminformation.CaptainName;
    let coach2Email = coach2Name + "@gmail.com";
    let sessionType = session.Type;

    let team1Name =
      session.teaminformation_sessions_Team1IDToteaminformation.TeamName;
    let team1ID = session.Team1ID;

    let team2Name =
      session.teaminformation_sessions_Team2IDToteaminformation.TeamName;
    let team2ID = session.Team2ID;

    let locationID = session.LocationID;
    let location = await prisma.locations.findUnique({
      where: { LocationID: locationID },
    });

    let playersTeam1 = await prisma.playerslist.findMany({
      where: { TeamID: team1ID },
    });
    let playersTeam2 = await prisma.playerslist.findMany({
      where: { TeamID: team2ID },
    });

    let Header1 = `${team1Name} on ${date} ${time}) type: ${sessionType}`;
    for (const player of playersTeam1) {
      let playerID = player.ClubMemberID;
      let PlayerInfo = await prisma.clubmembers.findUnique({
        where: { ClubMemberID: playerID },
      });
      let firstName = PlayerInfo.FirstName;
      let lastName = PlayerInfo.LastName;
      let role = player.Role;
      let playerEmail = firstName + "." + lastName + "@gmail.com";
      let emailDate = new Date();
      let senderEmail = "admin@vollyballclub.ca";
      let Body1 = `${firstName} ${lastName}, playing ${role}
                    lead by ${coach1Name}, you can reach him out at ${coach1Email}
                    Type: ${sessionType}
                    Location: ${location.Name}
                    Address: ${location.Address}
                    City: ${location.City}
                    Province: ${location.Province}
                    PostalCode: ${location.PostalCode}
                    Phone: ${location.Phone}
                    WebAddress: ${location.WebAddress}`;
      let output = {
        emailDate,
        senderEmail,
        playerEmail,
        header: Header1,
        body: Body1,
      };
      emails.push(output);
    }

    let Header2 = `${team2Name} on ${date} ${time}) type: ${sessionType}`;
    for (const player of playersTeam2) {
      let playerID = player.ClubMemberID;
      let PlayerInfo = await prisma.clubmembers.findUnique({
        where: { ClubMemberID: playerID },
      });
      let firstName = PlayerInfo.FirstName;
      let lastName = PlayerInfo.LastName;
      let role = player.Role;
      let playerEmail = firstName + "." + lastName + "@gmail.com";
      let emailDate = new Date();
      let senderEmail = "admin@vollyballclub.ca";
      let Body2 = `${firstName} ${lastName}, playing ${role}
                    lead by ${coach2Name}, you can reach him out at ${coach2Email}
                    Type: ${sessionType}
                    Location: ${location.Name}
                    Address: ${location.Address}
                    City: ${location.City}
                    Province: ${location.Province}
                    PostalCode: ${location.PostalCode}
                    Phone: ${location.Phone}
                    WebAddress: ${location.WebAddress}`;
      let output = {
        emailDate,
        senderEmail,
        playerEmail,
        header: Header2,
        body: Body2,
      };
      emails.push(output);
    }
    // console.log(Body1, Body2);
  }
  // console.log("emails", emails);
  return emails;
}

export async function saveEmailsToDatabase(emails) {
  try {
    const results = [];
    for (const email of emails) {
      // Handle both weekly and monthly email formats
      const emailData = {
        EmailDate: email.emailDate || email.EmailDate,
        SenderEmail: email.senderEmail || email.SenderEmail,
        RecipientEmail: email.playerEmail || email.RecipientEmail,
        EmailSubject: email.header || email.EmailSubject,
        BodyPreview: (email.body || email.BodyPreview || "").substring(0, 99),
      };

      const result = await prisma.emaillog.create({
        data: emailData,
      });
      results.push(result);
    }
    console.log("Emails saved to the database:", results);
    return { success: true, data: results };
  } catch (error) {
    console.error("Error saving emails to database:", error);
    return { success: false, error: error.message };
  }
}

export async function generate_and_send_emails_Monthly() {
  try {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    const clubMembers = await prisma.clubmembers.findMany({
      where: {
        DOB: {
          lte: eighteenYearsAgo,
        },
        Status: "Active",
      },
    });
    // console.log("clubMembers", await assembleMonthlyEmail(clubMembers));
    if (clubMembers[0].length === 0) {
      return { success: false, message: "No club members found." };
    }
    const emails = await assembleMonthlyEmail(clubMembers);
    console.log("emails", emails);
    return emails;
  } catch (error) {
    console.error("Error generating and sending emails:", error);
    return { success: false, error: error.message };
  }
}

async function assembleMonthlyEmail(clubMembers) {
  const emails = [];
  for (const clubMember of clubMembers) {
    const email =
      clubMember.FirstName + "." + clubMember.LastName + "@gmail.com";
    const emailDate = new Date();
    const senderEmail = "admin@gvolleyballclub.ca";
    const Header = `Congrate you are turning 18 this month`;
    const Body = `Dear ${clubMember.firstName} ${clubMember.lastName}, you are turning 18 this month, according to our policy, the age requierment is up till 18 years old, so you are not eligible to play in our club anymore. We wish you all the best in your future endeavors.
    your account is decativated, please contact us if you have any questions`;
    const output = {
      EmailDate: emailDate,
      SenderEmail: senderEmail,
      RecipientEmail: email,
      EmailSubject: Header,
      BodyPreview: Body.substring(0, 99), // Preview of the body (first 100 characters)
    };
    emails.push(output);
  }
  return emails;
}


// __________________________________________Queries____________________________________________
export async function passQuerytoPrisma(query) {
  try {
    const result = await prisma.$queryRawUnsafe(query);
    console.log("Query result:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
}