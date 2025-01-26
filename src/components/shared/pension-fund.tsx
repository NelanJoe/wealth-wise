import PensionFundForm from "./pension-fund-form";
import PensionFundTable from "./pension-fund-table";

export default function PensionFund() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <PensionFundForm />
      </div>
      <div>
        <PensionFundTable />
      </div>
    </div>
  );
}
