import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  UserCircle,
  Search,
  BookOpen,
  BookMarked,
  Clock,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/sign-out-button";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "annotation",
      text: "Marked passage in Digest 41.3.4 as interpolation",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "search",
      text: "Searched for 'usucapio' in Justinian's Institutes",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "comment",
      text: "Commented on annotation by Prof. Smith",
      time: "3 days ago",
    },
  ];

  // Mock data for recommended texts
  const recommendedTexts = [
    {
      id: "digest-41-3-4",
      title: "Digest 41.3: On Usucaption",
      annotations: 24,
    },
    {
      id: "institutes-2-6",
      title: "Institutes 2.6: On Usucaption and Long Possession",
      annotations: 18,
    },
    {
      id: "codex-7-33",
      title: "Codex 7.33: On Prescriptions",
      annotations: 12,
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Scholar Dashboard
            </h1>
            <div className="bg-sky-50 text-sm p-3 px-4 rounded-lg text-blue-700 flex gap-2 items-center border border-sky-200">
              <InfoIcon size="14" />
              <span>
                Welcome to the Roman Legal Texts Research Platform. Start
                exploring texts or continue your research.
              </span>
            </div>
          </header>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <h2 className="font-semibold text-xl mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link href="/dashboard/search">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50"
                    >
                      <Search className="h-6 w-6 text-blue-600" />
                      <span>Search Texts</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/texts">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50"
                    >
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      <span>Browse Texts</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50"
                  >
                    <BookMarked className="h-6 w-6 text-blue-600" />
                    <span>My Annotations</span>
                  </Button>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <h2 className="font-semibold text-xl mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b border-gray-100"
                    >
                      <div className="bg-sky-100 p-2 rounded-full">
                        {activity.type === "annotation" && (
                          <BookMarked className="h-4 w-4 text-blue-600" />
                        )}
                        {activity.type === "search" && (
                          <Search className="h-4 w-4 text-blue-600" />
                        )}
                        {activity.type === "comment" && (
                          <Users className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all activity
                  </Link>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* User Profile Section */}
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  {user.user_metadata?.avatar_url ? (
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={`${user.user_metadata.avatar_url.split("?")[0]}?t=${Date.now()}`}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <UserCircle size={48} className="text-blue-600" />
                  )}
                  <div>
                    <h2 className="font-semibold text-xl">
                      {user.user_metadata?.full_name || "Scholar Profile"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Annotations</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Contributions</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Scholar Level</span>
                    <span className="font-medium">Researcher</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/dashboard/profile">
                    <Button
                      variant="outline"
                      className="w-full border-sky-200 text-blue-700 hover:bg-sky-50"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                  <SignOutButton />
                </div>
              </section>

              {/* Recommended Texts */}
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <h2 className="font-semibold text-xl mb-6">
                  Recommended Texts
                </h2>
                <div className="space-y-4">
                  {recommendedTexts.map((text) => (
                    <Link
                      href={`/dashboard/texts/${text.id}`}
                      key={text.id}
                      className="block p-3 rounded-lg border border-gray-100 hover:border-sky-200 hover:bg-sky-50"
                    >
                      <h3 className="font-medium text-gray-900">
                        {text.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {text.annotations} annotations
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href="/dashboard/texts"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all texts
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
