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
          <p>When did I last feed my fish?</p>

          <p>
            I don&apos;t care about tracking each fish. I don&apos;t care about statistics. I just want a simple interface that clearly tells me whether I fed my fish today.
          </p>

          <p>
            Many apps are more complicated or require too many steps. No hate — they're useful — but compared to tools like Aquarium Logger and Aquarium Tracker, I realized I only needed one thing: knowing when I last fed my fish. Tapping through multiple screens feels unnecessary.
          </p>

          <p>
            So I built this free app as a small, minimal solution for myself — and maybe for others who feel the same. It focuses on one thing only: a quick record of when you fed your fish.
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
