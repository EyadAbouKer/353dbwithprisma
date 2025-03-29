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
          <Table>
            <TableCaption>Club Members</TableCaption>
            <TableHeader>
              <TableRow>{cols}</TableRow>
            </TableHeader>
            <TableBody>{rowData}</TableBody>
          </Table>
        </div>
        <div>
          <ClubMembers />
        </div>
        {/* <div>
          <ClubMembersV2 />
          <ClubMembersV2 />

        </div> */}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
