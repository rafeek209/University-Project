import { useState } from "react";
import {
  LayoutDashboard,
  QrCode,
  Wallet,
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Car,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Filter,
  CalendarDays,
  Trophy,
  Code,
  Music,
  Dumbbell,
  BookOpen,
  Star,
} from "lucide-react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmergencyButton } from "@/components/dashboard/EmergencyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Digital ID", href: "/student/id", icon: QrCode },
  { label: "Academics", href: "/student/academics", icon: GraduationCap },
  { label: "Wallet", href: "/student/wallet", icon: Wallet },
  { label: "Requests", href: "/student/requests", icon: FileText },
  { label: "Events", href: "/student/events", icon: Calendar, badge: 3 },
  { label: "Car Permits", href: "/student/permits", icon: Car },
  { label: "AI Assistant", href: "/student/assistant", icon: MessageSquare },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  spots: number;
  registered: number;
  isRegistered: boolean;
  points: number;
  image?: string;
}

const categoryIcons: Record<string, typeof Trophy> = {
  tech: Code,
  sports: Dumbbell,
  academic: BookOpen,
  music: Music,
  competitions: Trophy,
};

const categoryColors: Record<string, string> = {
  tech: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  sports: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  academic: "bg-green-500/20 text-green-400 border-green-500/30",
  music: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  competitions: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const events: Event[] = [
  {
    id: "1",
    title: "Tech Hackathon 2024",
    description: "48-hour coding challenge to build innovative solutions. Win prizes and networking opportunities.",
    date: "Jan 15, 2024",
    time: "9:00 AM - 9:00 PM",
    location: "Engineering Building, Lab 301",
    category: "tech",
    spots: 100,
    registered: 78,
    isRegistered: true,
    points: 50,
  },
  {
    id: "2",
    title: "Basketball Tournament",
    description: "Inter-faculty basketball championship. Form your team and compete for the trophy!",
    date: "Jan 20, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Sports Complex",
    category: "sports",
    spots: 60,
    registered: 45,
    isRegistered: false,
    points: 30,
  },
  {
    id: "3",
    title: "Career Fair 2024",
    description: "Meet top employers and explore internship opportunities. Bring your resume!",
    date: "Jan 25, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Student Center, Main Hall",
    category: "academic",
    spots: 500,
    registered: 320,
    isRegistered: true,
    points: 25,
  },
  {
    id: "4",
    title: "Open Mic Night",
    description: "Showcase your musical talent or just enjoy the performances.",
    date: "Jan 18, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Arts Building, Auditorium",
    category: "music",
    spots: 200,
    registered: 156,
    isRegistered: false,
    points: 15,
  },
  {
    id: "5",
    title: "AI Innovation Challenge",
    description: "Present your AI/ML projects and compete for research funding.",
    date: "Feb 1, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Science Block, Room 201",
    category: "competitions",
    spots: 50,
    registered: 42,
    isRegistered: false,
    points: 75,
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(
    events.filter(e => e.isRegistered).map(e => e.id)
  );

  const toggleRegistration = (eventId: string) => {
    setRegisteredEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const filteredEvents = events.filter((event) => {
    if (activeTab === "registered" && !registeredEvents.includes(event.id)) return false;
    if (activeTab !== "all" && activeTab !== "registered" && event.category !== activeTab) return false;
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav items={navItems} />

      <div className="ml-64">
        <DashboardHeader
          userName="Youssef Mostafa"
          userRole="Computer Science, Year 3"
          notificationCount={3}
        />

        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Campus Events</h1>
              <p className="text-muted-foreground">Discover and register for university events</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="glass" className="gap-1.5">
                <Star className="h-3 w-3 text-yellow-400" />
                Earn points by attending!
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="glass" className="p-4 text-center">
              <CalendarDays className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming Events</p>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold">{registeredEvents.length}</p>
              <p className="text-xs text-muted-foreground">Registered</p>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold">125</p>
              <p className="text-xs text-muted-foreground">Points Earned</p>
            </Card>
            <Card variant="glass" className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Events Attended</p>
            </Card>
          </div>

          {/* Search & Filter */}
          <Card variant="glass" className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-2 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="registered">My Events</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="competitions">Competitions</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => {
                    const CategoryIcon = categoryIcons[event.category] || Calendar;
                    const isRegistered = registeredEvents.includes(event.id);
                    const spotsLeft = event.spots - event.registered;
                    const isFull = spotsLeft <= 0;

                    return (
                      <Card 
                        key={event.id}
                        variant="glass" 
                        className="overflow-hidden hover:shadow-glow-sm transition-all duration-300"
                      >
                        {/* Event Header */}
                        <div className="p-6 pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <CategoryIcon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <Badge className={`mt-1 border ${categoryColors[event.category]}`}>
                                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Trophy className="h-4 w-4" />
                              <span className="font-bold text-sm">+{event.points}</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CalendarDays className="h-4 w-4" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{event.registered}/{event.spots} registered</span>
                              {spotsLeft <= 10 && spotsLeft > 0 && (
                                <Badge variant="glass" className="text-warning">
                                  Only {spotsLeft} spots left!
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="px-6 pb-4">
                          <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isFull ? "bg-warning" : "bg-primary"
                              }`}
                              style={{ width: `${(event.registered / event.spots) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Action */}
                        <div className="px-6 pb-6">
                          {isRegistered ? (
                            <div className="flex items-center justify-between">
                              <Badge variant="verified" className="gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Registered
                              </Badge>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleRegistration(event.id)}
                              >
                                Cancel Registration
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              variant="default" 
                              className="w-full"
                              disabled={isFull}
                              onClick={() => toggleRegistration(event.id)}
                            >
                              {isFull ? "Event Full" : "Register Now"}
                            </Button>
                          )}
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <Card variant="glass" className="col-span-2 p-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="font-semibold mb-2">No Events Found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? "Try a different search term" : "Check back later for new events"}
                    </p>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <EmergencyButton />
    </div>
  );
}
