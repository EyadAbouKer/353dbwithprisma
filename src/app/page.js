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
import Primaryfamilyrelationships from "@/components/Primaryfamilyrelationships";
import Locations from "@/components/Locations";
import Payments from "@/components/Payments";
import Personnel from "@/components/Personnel";
import PersonnelRoles from "@/components/PersonnelRoles";
import PlayerList from "@/components/PlayerList";
import SecondaryFamilyMembers from "@/components/SecondaryFamilyMembers";
import Secondaryfamilyrelationships from "@/components/Secondaryfamilyrelationships";
import Session from "@/components/Session";
import TeamInformation from "@/components/TeamInformation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmailLog from "@/components/EmailLog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <Carousel className="w-full">
          <div className="flex justify-end gap-2 mb-4">
            <CarouselPrevious className="relative static translate-y-0 mr-2" />
            <CarouselNext className="relative static translate-y-0" />
          </div>
          <CarouselContent>
            <CarouselItem>
              <div className="p-4">
                <h1>Club Members</h1>
                <ClubMembers />
                <Link href="/addfamilymember" passHref>
                  <Button asChild>
                    <span>Add</span>
                  </Button>
                </Link>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Family Members</h1>
                <FamilyMembers />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Family Relationships</h1>
                <Primaryfamilyrelationships />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Locations</h1>
                <Locations />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Payments</h1>
                <Payments />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Personnel</h1>
                <Personnel />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Personnel Roles</h1>
                <PersonnelRoles />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Player List</h1>
                <PlayerList />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Secondary Family Members</h1>
                <SecondaryFamilyMembers />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Secondary Family Relationships</h1>
                <Secondaryfamilyrelationships />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Session</h1>
                <Session />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>Team Information</h1>
                <TeamInformation />
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-4">
                <h1>EmailLog</h1>
                <EmailLog />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
