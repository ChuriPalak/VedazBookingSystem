import { useState } from "react";

export default function FilterSidebar() {
  const [open, setOpen] = useState({
    rating: true,
    price: true,
    availability: true,
    language: true,
    skills: true,
  });

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="sidebar">
      <h3>Filters</h3>

      {/* Rating */}
      <FilterBlock
        title="Rating"
        isOpen={open.rating}
        onToggle={() => toggle("rating")}
      >
        <label><input type="checkbox" /> 4★ & above</label>
        <label><input type="checkbox" /> 3★ & above</label>
      </FilterBlock>

      {/* Price */}
      <FilterBlock
        title="Price"
        isOpen={open.price}
        onToggle={() => toggle("price")}
      >
        <label><input type="checkbox" /> Low to High</label>
        <label><input type="checkbox" /> High to Low</label>
      </FilterBlock>

      {/* Availability */}
      <FilterBlock
        title="Availability"
        isOpen={open.availability}
        onToggle={() => toggle("availability")}
      >
        <label><input type="checkbox" /> Available Today</label>
        <label><input type="checkbox" /> Available This Week</label>
        <label><input type="checkbox" /> Available This Month</label>
      </FilterBlock>

      {/* Language */}
      <FilterBlock
        title="Language"
        isOpen={open.language}
        onToggle={() => toggle("language")}
      >
        <label><input type="checkbox" /> English</label>
        <label><input type="checkbox" /> Hindi</label>
        <label><input type="checkbox" /> Gujarati</label>
        <label><input type="checkbox" /> Tamil</label>
        <label><input type="checkbox" /> Kannada</label>
      </FilterBlock>

      {/* Skills */}
      <FilterBlock
        title="Skills"
        isOpen={open.skills}
        onToggle={() => toggle("skills")}
      >
        <label><input type="checkbox" /> Vedic Astrology</label>
        <label><input type="checkbox" /> Tarot Reading</label>
        <label><input type="checkbox" /> Numerology</label>
        <label><input type="checkbox" /> Palmistry</label>
        <label><input type="checkbox" /> Face Reading</label>
        <label><input type="checkbox" /> KP Astrology</label>
      </FilterBlock>

      <button className="apply-btn">Apply Filters</button>
    </div>
  );
}

/* reusable block */
function FilterBlock({ title, isOpen, onToggle, children }) {
  return (
    <div className="filter-block">
      <div className="filter-header" onClick={onToggle}>
        <span>{title}</span>
        <span>{isOpen ? "▾" : "▸"}</span>
      </div>

      {isOpen && <div className="filter-body">{children}</div>}
    </div>
  );
}
