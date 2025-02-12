import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";


async function applyTheme() {
  try {
    const response = await fetch("/theme.json");
    const theme = await response.json();

    // Apply dark mode based on theme.json
    if (theme.appearance === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply other theme variables (e.g., primary color)
    document.documentElement.style.setProperty("--background", theme.primary);
  } catch (error) {
    console.error("Failed to load theme:", error);
  }
}

// Run on page load
applyTheme();


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
