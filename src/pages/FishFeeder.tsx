"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showSuccess } from "@/utils/toast";
import { isPast, setHours, setMinutes } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";

const MAX_HISTORY_ENTRIES = 10;

const FishFeeder = () => {
  const [fedToday, setFedToday] = useState(false);
  const [lastFedTimestamp, setLastFedTimestamp] = useState<string | null>(null);
  const [feedingHistory, setFeedingHistory] = useState<string[]>([]);
  const [preferredFeedingTime, setPreferredFeedingTime] = useState<string | null>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("fishFeedingHistory");
    let history: string[] = [];
    if (storedHistory) {
      try {
        history = JSON.parse(storedHistory);
        history.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      } catch (e) {
        console.error("Failed to parse fish feeding history from localStorage", e);
        history = [];
      }
    }

    setFeedingHistory(history);
    updateFedTodayStatus(history);

    if (history.length > 0) {
      setLastFedTimestamp(history[0]);
    } else {
      setLastFedTimestamp(null);
    }

    const storedPreferredTime = localStorage.getItem("preferredFeedingTime");
    if (storedPreferredTime) {
      setPreferredFeedingTime(storedPreferredTime);
    }
  }, []);

  const updateFedTodayStatus = (history: string[]) => {
  const todayDateString = new Date().toISOString().slice(0, 10);
  const fedTodayStatus = history.some((timestamp) =>
  new Date(timestamp).toISOString().slice(0, 10) === todayDateString
  );
  setFedToday(fedTodayStatus);
  };

  const handleFeedFish = () => {
    const currentTimestamp = new Date().toISOString();
    const updatedHistory = [currentTimestamp, ...feedingHistory].slice(0, MAX_HISTORY_ENTRIES);

    localStorage.setItem("fishFeedingHistory", JSON.stringify(updatedHistory));
    setFeedingHistory(updatedHistory);
    updateFedTodayStatus(updatedHistory);
    setLastFedTimestamp(currentTimestamp);
    showSuccess("Fish fed! Good job!");
  };

  const handleUndoLastFeed = () => {
    if (feedingHistory.length === 0) return;

    const updatedHistory = feedingHistory.slice(1);
    localStorage.setItem("fishFeedingHistory", JSON.stringify(updatedHistory));
    setFeedingHistory(updatedHistory);
    updateFedTodayStatus(updatedHistory);
    setLastFedTimestamp(updatedHistory.length > 0 ? updatedHistory[0] : null);
    showSuccess("Last feeding undone!");
  };

  const handleClearHistory = () => {
    localStorage.removeItem("fishFeedingHistory");
    setFeedingHistory([]);
    setFedToday(false);
    setLastFedTimestamp(null);
    showSuccess("Feeding history cleared!");
  };

  const handlePreferredTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setPreferredFeedingTime(newTime);
    localStorage.setItem("preferredFeedingTime", newTime);
  };

  const isPastPreferredTime = () => {
    if (!preferredFeedingTime) return false;

    const [hours, minutes] = preferredFeedingTime.split(':').map(Number);
    const now = new Date();
    let preferredTimeDate = setHours(now, hours);
    preferredTimeDate = setMinutes(preferredTimeDate, minutes);

    return isPast(preferredTimeDate);
  };


  const isFedForToday = fedToday;

  const dateTimeFormatter = useMemo(
    () => new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }),
    []
  );
  const timeFormatter = useMemo(
    () => new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }),
    []
  );

  // Update document title based on status
  useEffect(() => {
    const overdue = !isFedForToday && !!preferredFeedingTime && isPastPreferredTime();
    document.title = overdue ? "Hungry 🐟 – Fish Feeder" : "Fed ✅ – Fish Feeder";
  }, [isFedForToday, preferredFeedingTime]);


  // Keyboard shortcuts: F to feed, U to undo
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || (target as any).isContentEditable)) {
        return;
      }
      const k = e.key.toLowerCase();
      if (k === 'f' && !isFedForToday) {
        e.preventDefault();
        handleFeedFish();
      }
      if (k === 'u' && feedingHistory.length > 0) {
        e.preventDefault();
        handleUndoLastFeed();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFedForToday, feedingHistory]);

  // One-time discoverability toast for shortcuts
  useEffect(() => {
    const key = "fishShortcutsHintShown";
    try {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, "1");
        showSuccess("Shortcuts: F to feed, U to undo.");
      }
    } catch { }
  }, []);

  const formattedLastFedDate = lastFedTimestamp
    ? dateTimeFormatter.format(new Date(lastFedTimestamp))
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleFeedFish}
                disabled={isFedForToday}
                className="w-full py-3 text-lg"
              >
                {isFedForToday ? "Already Fed" : "Feed Fish Now"}
              </Button>
            </TooltipTrigger>
            {!isFedForToday && (
              <TooltipContent side="top" align="end" sideOffset={12} className="hidden md:block">
                Shortcut: F
              </TooltipContent>
            )}
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleUndoLastFeed}
                disabled={feedingHistory.length === 0}
                variant="outline"
                className="w-full py-3 text-lg"
              >
                Undo Last Feed
              </Button>
            </TooltipTrigger>
            {feedingHistory.length > 0 && (
              <TooltipContent side="top" align="end" sideOffset={12} className="hidden md:block">
                Shortcut: U
              </TooltipContent>
            )}
          </Tooltip>
          {formattedLastFedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last fed on: {formattedLastFedDate}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-md text-center shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Set Daily Feeding Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Label htmlFor="feeding-time" className="text-lg">Preferred Time:</Label>
            <Input
              id="feeding-time"
              type="time"
              value={preferredFeedingTime || ""}
              onChange={handlePreferredTimeChange}
              className="w-32"
            />
          </div>
          {preferredFeedingTime && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your preferred feeding time is {timeFormatter.format(new Date(`2000-01-01T${preferredFeedingTime}`))}.
            </p>
          )}
          {!isFedForToday && preferredFeedingTime && isPastPreferredTime() && (
            <p className="text-red-500 dark:text-red-400 font-medium">
              It's past your preferred feeding time!
            </p>
          )}
        </CardContent>
      </Card>

      {feedingHistory.length > 0 && (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Feeding History</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  Clear History
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your fish feeding history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48 w-full rounded-md border p-4">
              <ul className="space-y-2 text-left">
                {feedingHistory.map((timestamp, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {dateTimeFormatter.format(new Date(timestamp))}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FishFeeder;