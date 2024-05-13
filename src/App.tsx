import "./App.css";
import { useGetEvent } from "./hooks";
import { SeatingCard } from "./components/SeatingCard";
import { EventInfo } from "./components/EventInfo";
import { Topbar } from "./components/Topbar";

function App() {
  const { data } = useGetEvent();

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col grow">
      {/* Application Topbar*/}
      <Topbar />

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-xl m-auto flex items-center justify-evenly grow gap-3 w-full">
          {/* seating card */}

          <SeatingCard seats={data.seatings} event={data.event} />

          {/* event info */}
          <div className="max-w-md">
            <EventInfo event={data.event} />
          </div>
        </div>
      </main>

      {/*  <nav className="sticky bottom-0 left-0 right-0 bg-white border-t text-red-500 border-zinc-200 flex justify-center">
      
        <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        
          <div className="flex flex-col">
            <span>Total for [?] tickets</span>
            <span className="text-2xl font-semibold">[?] CZK</span>
          </div>

          <Button disabled variant="default">
            Checkout now
          </Button>
        </div>
      </nav> */}
    </div>
  );
}

export default App;
