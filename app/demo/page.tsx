import { DemoApp } from "@/components/demo/DemoApp";

export const metadata = {
  title: "Demo — FlowGuard",
  description:
    "Interactive demo of FlowGuard's workflow error monitoring, auto-retry, and alert system.",
};

export default function DemoPage() {
  return <DemoApp />;
}
