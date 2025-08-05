import { Calendar } from "lucide-react";
import Placeholder from "./Placeholder";

export default function Appointments() {
  return (
    <Placeholder 
      title="Appointment Booking"
      description="Schedule consultations with healthcare providers using AI-powered matching and smart scheduling."
      icon={Calendar}
    />
  );
}
