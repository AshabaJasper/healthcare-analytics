import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Healthcare Analytics" },
    { name: "description", content: "Healthcare data analytics platform" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Healthcare Analytics Platform
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            View your healthcare data and generate valuable insights.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/dashboard"
              className="btn btn-primary"
            >
              View Dashboard
            </Link>
            <Link
              to="/data"
              className="btn btn-secondary"
            >
              View Data
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="card text-center">
              <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-md bg-primary-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">View Analytics</h2>
              <p className="mt-2 text-sm text-gray-500">
                View comprehensive analytics and metrics from your healthcare data.
              </p>
            </div>

            <div className="card text-center">
              <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-md bg-primary-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">View Data</h2>
              <p className="mt-2 text-sm text-gray-500">
                Browse, filter, and export your healthcare data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}