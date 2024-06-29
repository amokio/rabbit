"use client";
import CodeEditor from "@/components/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Toolbar from "./_components/Toolbar";

const Page = () => {
  const [response, setResponse] = React.useState({
    content: "",
    fileType: "",
  });

  return (
    <Tabs aria-label="Options" defaultValue="Untitled">
      <TabsList>
        <TabsTrigger value="Untitled">Untitled</TabsTrigger>
      </TabsList>
      <TabsContent value="Untitled" className="space-y-2">
        <Tabs defaultValue="Pretty">
          <Toolbar setResponse={setResponse} />
          <div className="h-4" />
          <TabsList>
            <TabsTrigger value="Pretty">Pretty</TabsTrigger>
          </TabsList>
          <TabsContent value="Pretty">
            <CodeEditor {...response} isPretty />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default Page;
