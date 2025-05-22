//import the head component
import Detailtable from "./components/detailtable";
import HeadComponent from "./components/head";
import AddButton from "./components/operateicons";

// create the export default function
export default function Home(){
  return(
    <div>
      <HeadComponent/>
      <Detailtable/>
      <AddButton/>
    </div>
  );
}