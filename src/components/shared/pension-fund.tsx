import PensionFundForm from "./pension-fund-form";

export default function PensionFund() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <PensionFundForm />
      </div>
      <div>
        <p>Pension Fund Table</p>
      </div>
    </div>
  );
}
