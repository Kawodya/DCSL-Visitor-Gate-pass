//import the head component
import Detailtable from "./components/detailtable";
import HeadComponent from "./components/head";


// create the export default function
export default function Home(){
  return(
    <div>
      <HeadComponent/>
      <Detailtable/>
  
    </div>
  );
}