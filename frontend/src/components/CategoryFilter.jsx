import React from "react";
import { 
  Building2, 
  Layers, 
  Flame, 
  Mountain, 
  Paintbrush, 
  Wrench, 
  Grid, 
  Pipette
} from "lucide-react";

export default function CategoryFilter({ categories = [], selectedCategory = "All", onSelectCategory }) {
  const getCategoryIcon = (name) => {
    switch (name) {
      case "Cement & Concrete":
        return <Building2 size={16} />;
      case "Steel & Structural":
        return <Layers size={16} />;
      case "Bricks & Masonry":
        return <Flame size={16} />;
      case "Aggregates & Sand":
        return <Mountain size={16} />;
      case "Paints & Waterproofing":
        return <Paintbrush size={16} />;
      case "Tools & Equipment":
        return <Wrench size={16} />;
      case "Tiles & Flooring":
        return <Grid size={16} />;
      case "Pipes & Plumbing":
        return <Pipette size={16} />;
      default:
        return <Grid size={16} />;
    }
  };

  return (
    <div className="category-filter-wrapper">
      <div className="category-scroll-container">
        <button
          className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => onSelectCategory("All")}
        >
          <Grid size={16} />
          <span>All Materials</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-pill ${selectedCategory === cat.name ? "active" : ""}`}
            onClick={() => onSelectCategory(cat.name)}
          >
            {getCategoryIcon(cat.name)}
            <span>{cat.name}</span>
            {cat.count !== undefined && (
              <span className="category-count">{cat.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
