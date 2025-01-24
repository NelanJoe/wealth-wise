import EmergencyFundForm from "./emergency-fund-form";
import EmergencyFundTable from "./emergency-fund-table";

export default function EmergencyFund() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <EmergencyFundForm />
      </div>
      <div>
        <EmergencyFundTable />
      </div>
    </div>
  );
}
