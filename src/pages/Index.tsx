import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle"; // Import ModeToggle

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-red-900 p-4"> {/* Changed dark:bg-gray-900 to dark:bg-red-900 */}
      <div className="absolute top-4 right-4">
        <ModeToggle /> {/* Add ModeToggle here */}
      </div>
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Welcome to Your Blank App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Start building your amazing project here!
        </p>
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