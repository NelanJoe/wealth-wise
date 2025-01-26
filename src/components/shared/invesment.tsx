import InvesmentForm from "./investment-form";
import InvestmentTable from "./investment-table";

export default function Invesment() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <InvesmentForm />
      </div>
      <div>
        <InvestmentTable />
      </div>
    </div>
  );
}
