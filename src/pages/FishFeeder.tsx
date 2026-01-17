"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { format } from "date-fns"; // Import format from date-fns

const FishFeeder = () => {
  const [fedToday, setFedToday] = useState(false);
  const [lastFedTimestamp, setLastFedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("fishFedTimestamp");
    const todayDateString = format(new Date(), "yyyy-MM-dd"); // Get today's date part for comparison

    if (storedTimestamp) {
      const storedDateString = format(new Date(storedTimestamp), "yyyy-MM-dd"); // Get stored date part
      if (storedDateString === todayDateString) {
        setFedToday(true);
      } else {
        setFedToday(false);
      }
      setLastFedTimestamp(storedTimestamp);
    } else {
      setFedToday(false);
      setLastFedTimestamp(null);
    }
  }, []);

  const handleFeedFish = () => {
    const currentTimestamp = new Date().toISOString(); // Store full ISO timestamp
    localStorage.setItem("fishFedTimestamp", currentTimestamp);
    setFedToday(true);
    setLastFedTimestamp(currentTimestamp);
    showSuccess("Fish fed! Good job!");
  };

  // `fedToday` state already correctly indicates if fish were fed today
  const isFedForToday = fedToday;

  // Format the last fed timestamp for display
  const formattedLastFedDate = lastFedTimestamp
    ? format(new Date(lastFedTimestamp), "dd MMMM yyyy, HH:mm a") // Example: 25 October 2023, 10:30 AM
    : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Fish Feeder App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isFedForToday ? (
            <p className="text-2xl text-green-600 dark:text-green-400">
              Your fish have been fed today! 🎉
            </p>
          ) : (
            <p className="text-2xl text-red-600 dark:text-red-400">
              Your fish are hungry! 🐟
            </p>
          )}
          <Button
            onClick={handleFeedFish}
            disabled={isFedForToday}
            className="w-full py-3 text-lg"
          >
            {isFedForToday ? "Already Fed" : "Feed Fish Now"}
          </Button>
          {formattedLastFedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last fed on: {formattedLastFedDate}
            </p>
          )}
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default FishFeeder;