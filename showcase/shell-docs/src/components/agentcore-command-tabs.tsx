"use client";

// <AgentCoreCommandTabs> — framework-aware code-block tabs for AgentCore
// quickstart commands. Ported from the upstream `docs/components/content/`
// version, but rewritten on top of shell-docs's own <Tabs>/<Tab> primitives
// (the upstream component depends on fumadocs-ui, which shell-docs doesn't
// install).
//
// Usage in MDX:
//     <AgentCoreCommandTabs
//       lgCommand="npx copilotkit@latest create -f agentcore-langgraph"
//       stCommand="npx copilotkit@latest create -f agentcore-strands"
//     />
//
// With no `framework` prop the component shows both LangGraph and Strands
// tabs (the canonical shell-docs page lets the user pick). Passing
// `framework="langgraph"` or `framework="strands"` collapses to a single
// tab; we keep that prop for parity with the upstream API even though
// the canonical shell-docs page doesn't use it.

import React from "react";
import { Tabs, Tab } from "@/components/docs-tabs";

interface AgentCoreCommandTabsProps {
  framework?: "langgraph" | "strands";
  lgCommand: string;
  stCommand: string;
}

function CommandBlock({ command }: { command: string }) {
  // Plain styled <pre><code> — shell-docs has no global syntax highlighter
  // for one-off inline blocks, but the bash commands here are short and
  // don't need highlighting to be readable. Background/border match the
  // surrounding <Tabs> chrome.
  return (
    <pre
      style={{
        margin: 0,
        padding: "0.75rem 1rem",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "0.375rem",
        fontSize: "0.8125rem",
        lineHeight: 1.5,
        overflowX: "auto",
        color: "var(--text)",
      }}
    >
      <code className="language-bash">{command}</code>
    </pre>
  );
}

export function AgentCoreCommandTabs({
  framework,
  lgCommand,
  stCommand,
}: AgentCoreCommandTabsProps) {
  const items =
    framework === "langgraph"
      ? ["LangGraph"]
      : framework === "strands"
        ? ["Strands"]
        : ["LangGraph", "Strands"];

  return (
    <Tabs groupId="agentcore-framework" items={items}>
      {(framework === "langgraph" || !framework) && (
        <Tab value="LangGraph">
          <CommandBlock command={lgCommand} />
        </Tab>
      )}
      {(framework === "strands" || !framework) && (
        <Tab value="Strands">
          <CommandBlock command={stCommand} />
        </Tab>
      )}
    </Tabs>
  );
}
