import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ClubMembers from "@/components/ClubMembers";
import ClubMembersV2 from "@/components/ClubMembersV2";
import FamilyMembers from "@/components/Familymembers";
import FamilyRelationships from "@/components/FamilyRelationships";
import Locations from "@/components/Locations";
import Payments from "@/components/Payments";
import Personnel from "@/components/Personnel";
import PersonnelRoles from "@/components/PersonnelRoles";
import PlayerList from "@/components/PlayerList";
import SecondaryFamilyMembers from "@/components/SecondaryFamilyMembers";
import Session from "@/components/Session";
import TeamInformation from "@/components/TeamInformation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  //example Data
  //---------------------------------
  const colName = ["attr1", "attr2", "attr3", "attr4", "attr5", "attr6"];
  const cols = colName.map((item) => <TableHead key={item}>{item}</TableHead>);
  // const colData = [1, 2, 3, 4, 5, 6];
  const colData = Array(6)
    .fill(null)
    .map(() =>
      Array(6)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    ); // Example data

  const rowData = colData.map((row, rowIndex) => (
    <TableRow key={rowIndex}>
      {row.map((item, colIndex) => (
        <TableCell key={colIndex}>{item}</TableCell>
      ))}
    </TableRow>
  ));
  //---------------------------------

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1>Club Members</h1>
          <ClubMembers />

          <Link href="/addfamilymember" passHref>
            <Button asChild>
              <span>Add</span>
            </Button>
          </Link>
        </div>
        <div>
          <h1>Family Members</h1>
          <FamilyMembers />
        </div>
        <div>
          <h1>Family Relationships</h1>
          <FamilyRelationships />
        </div>
        <div>
          <h1>Locations</h1>
          <Locations />
        </div>
        <div>
          <h1>Payments</h1>
          <Payments />
        </div>
        <div>
          <h1>Personnel</h1>
          <Personnel />
        </div>
        <div>
          <h1>Personnel Roles</h1>
          <PersonnelRoles />
        </div>
        <div>
          <h1>Player List</h1>
          <PlayerList />
        </div>
        <div>
          <h1>Secondary Family Members</h1>
          <SecondaryFamilyMembers />
        </div>
        <div>
          <h1>Session</h1>
          <Session />
        </div>
        <div>
          <h1>Team Information</h1>
          <TeamInformation />
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
