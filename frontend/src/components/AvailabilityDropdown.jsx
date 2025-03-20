import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  const AvailabilityDropdown = ({ filters, handleFilterChange }) => {
    return (
      <Select
        name="availability"
        value={filters.availability}
        onValueChange={(value) => handleFilterChange({ target: { name: "availability", value } })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Availability</SelectItem> {/* Use "all" instead of "" */}
          <SelectItem value="available">Available Spots</SelectItem>
          <SelectItem value="full">Full Events</SelectItem>
        </SelectContent>
      </Select>
    );
  };
  
  export default AvailabilityDropdown;