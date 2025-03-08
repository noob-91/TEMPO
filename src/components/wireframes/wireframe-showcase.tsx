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

export default function WireframeShowcase() {
  const [activeWireframe, setActiveWireframe] = useState("dashboard");

  const wireframes = {
    login: { component: <LoginWireframe />, title: "Login Screen" },
    register: {
      component: <RegisterWireframe />,
      title: "Registration Screen",
    },
    forgotPassword: {
      component: <ForgotPasswordWireframe />,
      title: "Forgot Password Screen",
    },
    dashboard: { component: <DashboardWireframe />, title: "Dashboard" },
    textSearch: { component: <TextSearchWireframe />, title: "Text Search" },
    textViewer: { component: <TextViewerWireframe />, title: "Text Viewer" },
    annotationInterface: {
      component: <AnnotationInterfaceWireframe />,
      title: "Annotation Interface",
    },
    comparison: {
      component: <ComparisonWireframe />,
      title: "Side-by-Side Comparison",
    },
    profile: { component: <ProfileWireframe />, title: "Scholar Profile" },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Roman Legal Texts Platform Wireframes
      </h1>
      <p className="text-gray-600 mb-8">
        These wireframes illustrate the key screens and functionality of the
        Roman Legal Texts Research Platform based on the PRD and mermaid
        diagram. Click on the buttons below to view different wireframes.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
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

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {wireframes[activeWireframe].title}
        </h2>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {wireframes[activeWireframe].component}
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Wireframe Notes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Key Interactive Elements:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>
                Navigation between screens is indicated by buttons and links
              </li>
              <li>Form inputs for data entry</li>
              <li>Selection mechanisms for text passages</li>
              <li>Filtering and sorting controls</li>
              <li>Annotation type and confidence level selectors</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Data Display:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>Text content with visual indicators for annotations</li>
              <li>Scholar attribution for annotations</li>
              <li>Confidence levels with visual differentiation</li>
              <li>Search results with relevance indicators</li>
              <li>Side-by-side comparison of original and annotated text</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">User Actions:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>Text selection for annotation</li>
              <li>
                Annotation creation with type, confidence, and justification
              </li>
              <li>Filtering annotations by type and confidence</li>
              <li>Searching texts with keyword and semantic options</li>
              <li>Profile management and credential updates</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Navigation Paths:</h4>
            <ul className="list-disc pl-5 mt-2">
              <li>
                Authentication flow: Login → Dashboard or Register → Login →
                Dashboard
              </li>
              <li>Text exploration: Dashboard → Text Search → Text Viewer</li>
              <li>
                Annotation workflow: Text Viewer → Annotation Interface → Save →
                Text Viewer
              </li>
              <li>Profile management: Dashboard → Profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
