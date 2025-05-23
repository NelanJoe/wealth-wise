import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import type { Category } from "@/schemas/category.schema";
import { cn } from "@/libs/utils";

type CategoriesProps = {
  categories: Category[];
};

export default function Categories({ categories }: CategoriesProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Sync selectedCategories with URL search params
  useEffect(() => {
    const categoryParam = searchParams.get("categories") ?? "";
    setSelectedCategories(categoryParam.split(",").filter(Boolean));
  }, [searchParams]);

  const toggleCategory = (categoryName: string) => {
    const updatedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((category) => category !== categoryName) // Deselect category
      : [...selectedCategories, categoryName]; // Select category

    // Update URL with the new category list or remove if empty
    setSearchParams(
      updatedCategories.length
        ? { categories: updatedCategories.join(",") }
        : {}
    );
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      <Button
        size="sm"
        className="rounded-full bg-blue-500 hover:bg-blue-500/80"
        onClick={() => setSearchParams({})}
      >
        Semua
      </Button>
      {categories.map((category) => (
        <Button
          size="sm"
          key={category.uid}
          className={cn(
            `rounded-full bg-blue-500 hover:bg-blue-500/80 capitalize`,
            selectedCategories.includes(category.name) && "bg-blue-500/60"
          )}
          onClick={() => toggleCategory(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
