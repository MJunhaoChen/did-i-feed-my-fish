# Did I Feed My Fish Today?

A tiny, practical app for anyone who just wants to know **if they fed their fish today** 🐟—quick, simple, no extra clutter.

## Demo

![Demo](./public/demo.gif)

## Features

* Check if your fish have been fed today
* Record when you last fed your fish
* Undo the last feed if needed
* Clear feed history for a fresh start
* Set a preferred feeding time for reminders
* Toggle between light and dark mode
* **Times are based on your browser’s language/locale**
* **Keyboard shortcuts:** `F` = Feed, `U` = Undo

## Tech Stack

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)

## Application Architecture

```mermaid
flowchart TD

subgraph group_app["App shell"]
  node_entry["React entry<br/>[main.tsx]"]
  node_router["App routing<br/>[App.tsx]"]
  node_header["Navigation header<br/>[Header.tsx]"]
  node_about["About page<br/>[About.tsx]"]
  node_notfound["Not found page<br/>[NotFound.tsx]"]
end

subgraph group_feeding["Feeding workflow"]
  node_feeder["Fish feeder<br/>[FishFeeder.tsx]"]
  node_feedhistory[("Feed history")]
  node_browser["Browser APIs"]
end

subgraph group_presentation["Shared presentation"]
  node_toastutil["Toast helper<br/>[toast.ts]"]
  node_sonner["Toast renderer<br/>[sonner.tsx]"]
  node_controls["UI primitives"]
end

subgraph group_appearance["Appearance"]
  node_themeprovider["Theme provider<br/>[ThemeProvider.tsx]"]
  node_modetoggle["Theme selector<br/>[ModeToggle.tsx]"]
end

node_user(("User"))

node_user -->|"opens app"| node_entry
node_entry -->|"renders"| node_themeprovider
node_themeprovider -->|"wraps"| node_router
node_router -->|"renders"| node_header
node_router -->|"routes home"| node_feeder
node_router -->|"routes about"| node_about
node_router -->|"routes fallback"| node_notfound
node_user -->|"feeds or manages"| node_feeder
node_feeder -->|"reads and writes"| node_feedhistory
node_feeder -->|"uses time and locale"| node_browser
node_feeder -->|"reports actions"| node_toastutil
node_router -->|"renders"| node_sonner
node_toastutil -->|"dispatches toast"| node_sonner
node_feeder -->|"uses controls"| node_controls
node_header -->|"uses controls"| node_controls
node_header -->|"renders"| node_modetoggle
node_modetoggle -->|"sets theme"| node_themeprovider

click node_entry "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/main.tsx"
click node_router "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/App.tsx"
click node_header "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/components/Header.tsx"
click node_about "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/pages/About.tsx"
click node_notfound "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/pages/NotFound.tsx"
click node_feeder "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/pages/FishFeeder.tsx"
click node_toastutil "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/utils/toast.ts"
click node_sonner "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/components/ui/sonner.tsx"
click node_controls "https://github.com/mjunhaochen/did-i-feed-my-fish/tree/main/src/components/ui"
click node_themeprovider "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/components/ThemeProvider.tsx"
click node_modetoggle "https://github.com/mjunhaochen/did-i-feed-my-fish/blob/main/src/components/ModeToggle.tsx"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_entry,node_router,node_header,node_about,node_notfound,node_user toneBlue
class node_feeder,node_feedhistory,node_browser toneAmber
class node_toastutil,node_sonner,node_controls toneMint
class node_themeprovider,node_modetoggle toneRose
```

## Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/MJunhaoChen/did-i-feed-my-fish-today.git
   cd did-i-feed-my-fish-today
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Run the app:**

   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:8080](http://localhost:8080)

## Usage

* Tap the feed button or press **F** to mark a feed
* Undo last feed with the button or **U**
* Clear feed history for a fresh start
* Use preferred feeding time to get reminders
