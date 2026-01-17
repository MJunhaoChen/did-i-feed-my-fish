import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl w-full bg-card text-card-foreground rounded-lg shadow-lg p-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Did I feed my fish today?</h1>
          <p className="text-muted-foreground">Simple fish feed reminder</p>
        </header>

        <section className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>When was the last time I fed my fish?</p>

          <p>
            I don&apos;t care about tracking each inhabitant. I don&apos;t care about the statistics. I just want a simple user interface that clearly tells me if I did the job of feeding my fishes.
          </p>

          <p>
            Many apps are too complicated or require too many steps. No hate — they built something useful — but compared to tools like Aquarium Logger and Aquarium Tracker, I found I just needed one thing: to know when I last fed the fish. Pressing through multiple screens feels unnecessary.
          </p>

          <p>
            So I created this free app as a minimal idea for myself and maybe others who feel the same. It focuses on the one task that matters here: a quick record of when you fed your fish.
          </p>
        </section>

        <div>
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">Open the app</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
