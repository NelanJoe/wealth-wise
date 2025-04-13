import { useCurrentUser } from "@/hooks";

import InvesmentForm from "./investment-form";
import InvestmentTable from "./investment-table";

export default function Investment() {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <InvesmentForm />
      </div>
      {currentUser ? (
        <div>
          <InvestmentTable />
        </div>
      ) : null}
    </div>
  );
}
