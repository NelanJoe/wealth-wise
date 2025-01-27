import { useCurrentUser } from "@/hooks";
import PensionFundForm from "./pension-fund-form";
import PensionFundTable from "./pension-fund-table";

export default function PensionFund() {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <PensionFundForm />
      </div>
      {currentUser ? (
        <div>
          <PensionFundTable />
        </div>
      ) : null}
    </div>
  );
}
