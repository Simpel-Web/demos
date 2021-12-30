import * as React from "react";

import FormComponent from "../components/form";

// markup
const IndexPage = () => {
  return (
    <main className="bg-slate-900 min-h-screen">
      <section className="container mx-auto p-40 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-purple-500 mb-6">
          Demo Project for E2E-Tests of Netlify Forms
        </h1>
        <FormComponent />
      </section>
    </main>
  );
};

export default IndexPage;
