import Link from "next/link";

export default function WireframeIndexPage() {
  const wireframes = [
    { name: "Wireframe Showcase", path: "/wireframes" },
    { name: "Wireframe Flow Diagram", path: "/wireframes/flow" },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Roman Legal Texts Platform - Wireframes
      </h1>
      <p className="text-gray-600 mb-8">
        This page provides links to all wireframe views available in the
        application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wireframes.map((wireframe, index) => (
          <Link
            href={wireframe.path}
            key={index}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{wireframe.name}</h2>
            <p className="text-gray-500 mb-4">
              {wireframe.name === "Wireframe Showcase"
                ? "View individual wireframes for each screen in the application"
                : "See how screens connect in the user flow diagram"}
            </p>
            <div className="text-blue-600 font-medium">View →</div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Wireframe Documentation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Wireframe Showcase</h3>
            <p className="text-gray-600 mt-1">
              The Wireframe Showcase provides individual views of each screen in
              the application. You can select different screens from the
              navigation to see detailed wireframes for authentication,
              dashboard, text search, annotation, and more.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Wireframe Flow Diagram</h3>
            <p className="text-gray-600 mt-1">
              The Flow Diagram shows how different screens connect to each
              other, visualizing the user journey through the application. This
              helps understand the navigation paths and overall application
              structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
