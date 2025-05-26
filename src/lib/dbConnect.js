// import the mongose
import mongoose from "mongoose";

const MONGODB_URL=process.env.MONGODB_URL || 'mongodb://localhost:27017/vgpDB';

const connectDB=async()=>{
    if(mongoose.connections[0].readyState)return;

    try{
        await mongoose.connect(MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,


        });
         console.log("✅ MongoDB connected");


       
    }catch(error){
        console.error("❌ MongoDB connection error:",error)
    }
};
export default connectDB;