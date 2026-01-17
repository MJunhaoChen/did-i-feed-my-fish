"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { format } from "date-fns";

const MAX_HISTORY_ENTRIES = 10; // Limit the number of history entries

const FishFeeder = () => {
  const [fedToday, setFedToday] = useState(false);
  const [lastFedTimestamp, setLastFedTimestamp] = useState<string | null>(null);
  const [feedingHistory, setFeedingHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("fishFeedingHistory");
    let history: string[] = [];
    if (storedHistory) {
      try {
        history = JSON.parse(storedHistory);
        // Ensure history is sorted from most recent to oldest
        history.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      } catch (e) {
        console.error("Failed to parse fish feeding history from localStorage", e);
        history = [];
      }
    }

    setFeedingHistory(history);

    const todayDateString = format(new Date(), "yyyy-MM-dd");
    const fedTodayStatus = history.some(timestamp => 
      format(new Date(timestamp), "yyyy-MM-dd") === todayDateString
    );
    setFedToday(fedTodayStatus);

    if (history.length > 0) {
      setLastFedTimestamp(history[0]); // Most recent entry
    } else {
      setLastFedTimestamp(null);
    }
  }, []);

  const handleFeedFish = () => {
    const currentTimestamp = new Date().toISOString();
    const updatedHistory = [currentTimestamp, ...feedingHistory].slice(0, MAX_HISTORY_ENTRIES);
    
    localStorage.setItem("fishFeedingHistory", JSON.stringify(updatedHistory));
    setFeedingHistory(updatedHistory);
    setFedToday(true);
    setLastFedTimestamp(currentTimestamp);
    showSuccess("Fish fed! Good job!");
  };

  const isFedForToday = fedToday;

  const formattedLastFedDate = lastFedTimestamp
    ? format(new Date(lastFedTimestamp), "dd MMMM yyyy, HH:mm a")
    : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md text-center shadow-lg mb-6">
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

      {feedingHistory.length > 0 && (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Feeding History</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48 w-full rounded-md border p-4">
              <ul className="space-y-2 text-left">
                {feedingHistory.map((timestamp, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {format(new Date(timestamp), "dd MMMM yyyy, HH:mm a")}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      <MadeWithDyad />
    </div>
  );
};

export default FishFeeder;