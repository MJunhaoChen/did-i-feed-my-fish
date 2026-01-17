"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const getTodayDateString = () => {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
};

const FishFeeder = () => {
  const [fedToday, setFedToday] = useState(false);
  const [lastFedDate, setLastFedDate] = useState<string | null>(null);

  useEffect(() => {
    const storedFedDate = localStorage.getItem("fishFedDate");
    const today = getTodayDateString();

    if (storedFedDate === today) {
      setFedToday(true);
      setLastFedDate(storedFedDate);
    } else {
      setFedToday(false);
      setLastFedDate(storedFedDate);
    }
  }, []);

  const handleFeedFish = () => {
    const today = getTodayDateString();
    localStorage.setItem("fishFedDate", today);
    setFedToday(true);
    setLastFedDate(today);
    showSuccess("Fish fed! Good job!");
  };

  const today = getTodayDateString();
  const isFedForToday = fedToday && lastFedDate === today;

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
          {lastFedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last fed on: {lastFedDate}
            </p>
          )}
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default FishFeeder;