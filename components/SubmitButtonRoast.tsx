"use client";
import { Button } from "./ui/button";

export default function SubmitButton({
  loading,
  action,
}: {
  loading: boolean;
  action: () => void;
}) {
  return (
    <Button className="mt-12" type="submit" disabled={loading} onClick={action}>
      {loading ? "Loading....." : "Roast"}
    </Button>
  );
}
