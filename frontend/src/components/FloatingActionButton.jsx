import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <DropdownMenu className="w-full">
      <DropdownMenuTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg">
          <FaPlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem onClick={() => navigate("/events/create")}>
          🎉 Create Event
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/help-request/create")}>
          🤝 Post Help Request
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
