import { useCurrentUser } from "@/hooks";

import EmergencyFundForm from "./emergency-fund-form";
import EmergencyFundTable from "./emergency-fund-table";

export default function EmergencyFund() {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <EmergencyFundForm />
      </div>
      {currentUser ? (
        <div>
          <EmergencyFundTable />
        </div>
      ) : null}
    </div>
  );
}
