import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const HelmetComponent = () => {
  const location = useLocation();

  const titles = {
    "/": "Welcome to HandsOn – A Community-Driven Social Volunteering Platform",
    "/events": "Discover & Join Volunteer Events",
    "/help-request": "Community Help Requests",
    "/events/create": "Create Volunteer Event by Filling the Form",
    "/help-request/create": "Post Help Request by Filling the Form",
    "/login": "Join HandsOn"
  };

  const pageTitle = titles[location.pathname] || "HandsOn"; // Default title if route not found

  useEffect(() => {
    document.title = pageTitle; // Manually set title (fallback)
  }, [pageTitle]);

  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
};

export default HelmetComponent;
