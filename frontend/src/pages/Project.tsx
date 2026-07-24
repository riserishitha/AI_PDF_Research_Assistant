import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";

import UploadSection from "../project/UploadSection";
import DocumentList from "../project/DocumentList";
import ChatBox from "../project/ChatBox";
import ChatInput from "../project/ChatInput";

export default function Project() {
  return (
    <Layout>
      <Header />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          AI Project Workspace
        </h1>

        <p className="text-slate-500 mt-2">
          Upload PDFs and ask questions about them.
        </p>

        <div className="grid grid-cols-3 gap-8 mt-10">

          <div className="space-y-6">

            <UploadSection />

            <DocumentList />

          </div>

          <div className="col-span-2">

            <ChatBox />

            <ChatInput />

          </div>

        </div>

      </div>

    </Layout>
  );
}