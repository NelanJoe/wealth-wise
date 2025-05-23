import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";

export default function SearchThread() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") ?? ""
  );

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchParams({
      search: e.target.value,
    });
  };

  return (
    <Input
      type="text"
      className="w-full ring-primary-blue focus:ring-primary-blue"
      placeholder="Cari judul diskusi..."
      value={searchTerm}
      onChange={handleSearchTerm}
    />
  );
}
