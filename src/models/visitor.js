// models/Visitor.js
import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  visitorNames: [String],
  visitorNICs: [String],
  visitCompany: String,
  department: String,
  reason: String,
  dateOfVisit: String,
  endVisit: String,
  vehicleNumber: String,
  hodPerson: String,
}, { timestamps: true });

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
