import Navigation from "../components/Navigation";
import Search from "../components/Search";
import Selector from "../components/Selector";

export default function Home() {
  return (
    <div
      className=" flex justify-between flex-col gap-24 desktop:gap-0
    desktop:flex-row desktop:py-32  desktop:justify-start"
    >
      <div className="desktop:pl-32">
        <Navigation />
      </div>
      <div className="px-16 desktop:px-32 desktop:pt-24">
        <div className="flex justify-between">
          <Search />
          <Selector />
        </div>
      </div>
    </div>
  );
}
