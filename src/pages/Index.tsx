import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// ModeToggle is now handled globally in App.tsx
// import { ModeToggle } from "@/components/ModeToggle"; 

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      {/* ModeToggle is now rendered in App.tsx */}
      {/* <div className="absolute top-4 right-4">
        <ModeToggle />
      </div> */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Welcome to Your Blank App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Start building your amazing project here!
        </p>
        {/* Dark Mode Test Element */}
        
        <Link to="/fish-feeder">
          <Button className="mt-6 px-8 py-4 text-lg">
            Go to Fish Feeder App
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;