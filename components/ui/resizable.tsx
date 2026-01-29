"use client";

// Placeholder for resizable components - not currently used
export function ResizablePanelGroup({ children, ...props }: { children?: React.ReactNode;[key: string]: unknown }) {
  return <div {...props}>{children}</div>;
}

export function ResizablePanel({ children, ...props }: { children?: React.ReactNode;[key: string]: unknown }) {
  return <div {...props}>{children}</div>;
}

export function ResizableHandle(props: React.ComponentProps<"div">) {
  return <div {...props} />;
}
