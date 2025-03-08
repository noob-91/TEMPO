"use client";

import React, { useState } from "react";
import {
  LoginWireframe,
  RegisterWireframe,
  ForgotPasswordWireframe,
} from "./auth-wireframes";
import { DashboardWireframe } from "./dashboard-wireframe";
import { TextSearchWireframe } from "./text-search-wireframe";
import { TextViewerWireframe } from "./text-viewer-wireframe";
import { AnnotationInterfaceWireframe } from "./annotation-interface-wireframe";
import { ComparisonWireframe } from "./comparison-wireframe";
import { ProfileWireframe } from "./profile-wireframe";

export default function WireframeFlow() {
  const [activeWireframe, setActiveWireframe] = useState("all");

  // Define wireframe nodes with positions
  const wireframes = {
    login: {
      component: <LoginWireframe />,
      title: "Login Screen",
      x: 100,
      y: 100,
      width: 300,
      height: 400,
      connections: ["dashboard", "register", "forgotPassword"],
    },
    register: {
      component: <RegisterWireframe />,
      title: "Registration Screen",
      x: 500,
      y: 100,
      width: 300,
      height: 400,
      connections: ["login"],
    },
    forgotPassword: {
      component: <ForgotPasswordWireframe />,
      title: "Forgot Password Screen",
      x: 100,
      y: 600,
      width: 300,
      height: 300,
      connections: ["login"],
    },
    dashboard: {
      component: <DashboardWireframe />,
      title: "Dashboard",
      x: 900,
      y: 100,
      width: 500,
      height: 400,
      connections: ["textSearch", "profile"],
    },
    textSearch: {
      component: <TextSearchWireframe />,
      title: "Text Search",
      x: 900,
      y: 600,
      width: 500,
      height: 400,
      connections: ["textViewer"],
    },
    textViewer: {
      component: <TextViewerWireframe />,
      title: "Text Viewer",
      x: 1500,
      y: 600,
      width: 500,
      height: 400,
      connections: ["annotationInterface", "comparison"],
    },
    annotationInterface: {
      component: <AnnotationInterfaceWireframe />,
      title: "Annotation Interface",
      x: 1500,
      y: 1100,
      width: 500,
      height: 400,
      connections: ["textViewer"],
    },
    comparison: {
      component: <ComparisonWireframe />,
      title: "Side-by-Side Comparison",
      x: 2100,
      y: 600,
      width: 500,
      height: 400,
      connections: [],
    },
    profile: {
      component: <ProfileWireframe />,
      title: "Scholar Profile",
      x: 1500,
      y: 100,
      width: 500,
      height: 400,
      connections: [],
    },
  };

  // Function to draw connection lines between wireframes
  const renderConnections = () => {
    const connections = [];

    Object.entries(wireframes).forEach(([key, wireframe]) => {
      const { x, y, width, height, connections: targets } = wireframe;

      targets.forEach((targetKey) => {
        const target = wireframes[targetKey];
        if (!target) return;

        // Calculate start and end points
        const startX = x + width / 2;
        const startY = y + height / 2;
        const endX = target.x + target.width / 2;
        const endY = target.y + target.height / 2;

        // Create a unique key for this connection
        const connectionKey = `${key}-${targetKey}`;

        connections.push(
          <svg
            key={connectionKey}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
              </marker>
            </defs>
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="#4b5563"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </svg>,
        );
      });
    });

    return connections;
  };

  // Render wireframes as scaled-down versions
  const renderWireframes = () => {
    return Object.entries(wireframes).map(([key, wireframe]) => {
      const { x, y, width, height, title, component } = wireframe;

      return (
        <div
          key={key}
          className="absolute border-2 border-gray-300 bg-white rounded-lg overflow-hidden shadow-md"
          style={{
            left: x,
            top: y,
            width,
            height,
          }}
        >
          <div className="p-2 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
            <h3 className="text-sm font-medium">{title}</h3>
            <button
              className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded"
              onClick={() => setActiveWireframe(key)}
            >
              View
            </button>
          </div>
          <div
            className="p-2 overflow-hidden"
            style={{
              transform: "scale(0.3)",
              transformOrigin: "top left",
              width: `${width * 3.33}px`,
              height: `${height * 3}px`,
            }}
          >
            {component}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Roman Legal Texts Platform - User Flow
      </h1>
      <p className="text-gray-600 mb-4">
        This diagram shows the connections between different screens in the
        application based on the PRD and mermaid diagram.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${activeWireframe === "all" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => setActiveWireframe("all")}
        >
          Show All
        </button>
        {Object.entries(wireframes).map(([key, { title }]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${activeWireframe === key ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setActiveWireframe(key)}
          >
            {title}
          </button>
        ))}
      </div>

      {activeWireframe === "all" ? (
        <div
          className="relative border border-gray-300 rounded-lg bg-gray-50"
          style={{ height: "1600px" }}
        >
          {renderConnections()}
          {renderWireframes()}
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-xl font-semibold">
              {wireframes[activeWireframe].title}
            </h2>
          </div>
          <div className="p-4">{wireframes[activeWireframe].component}</div>
        </div>
      )}

      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">User Flow Notes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Authentication Flow:</h4>
            <p className="text-gray-600 mt-1">
              Users start at the Login screen, with options to register or reset
              password. After successful authentication, they are directed to
              the Dashboard.
            </p>
          </div>

          <div>
            <h4 className="font-medium">Text Exploration Flow:</h4>
            <p className="text-gray-600 mt-1">
              From the Dashboard, users can navigate to Text Search, then to
              Text Viewer to read specific texts. From there, they can either
              annotate texts or view side-by-side comparisons.
            </p>
          </div>

          <div>
            <h4 className="font-medium">Annotation Workflow:</h4>
            <p className="text-gray-600 mt-1">
              The Text Viewer connects to the Annotation Interface, where users
              can mark passages as interpolations with different confidence
              levels and return to the Text Viewer.
            </p>
          </div>

          <div>
            <h4 className="font-medium">Profile Management:</h4>
            <p className="text-gray-600 mt-1">
              Users can access their Scholar Profile from the Dashboard to
              update personal information and credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
