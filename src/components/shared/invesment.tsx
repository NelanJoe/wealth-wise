import InvesmentForm from "./investment-form";

export default function Invesment() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <InvesmentForm />
      </div>
      <div>
        <p>Investment Table</p>
      </div>
    </div>
  );
}
