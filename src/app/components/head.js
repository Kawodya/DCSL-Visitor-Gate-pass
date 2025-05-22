//import the image
import Image from "next/image";
// import the roboto font using google fonts
import { Roboto } from "next/font/google";

// Load the wigets and styles
const roboto=Roboto({
    subsets:["Latin"],
    weight:["400","700"],
    variable:"--font-roboto"

});

 // create the head component image
 export default function HeadComponent(){
    return(
        <div className="flex flex-col items-center justify-center h-50 ">
            <Image
            src="/DBL-Logo-PNG-1.png"
            alt="company Logo"
            width={60}
            height={60}
               priority        // ← add this
            
            />
            <h1 className={`${roboto.className}text-lg font-semibold`}>
                Visitor Gate Pass
            </h1>
          
           
        </div>
        
    );
 }
