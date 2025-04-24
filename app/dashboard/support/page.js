import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Support</h1>
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700">Get Help</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Contact us at <a href="mailto:support@merchantHub.com" className="text-blue-500 hover:underline">support@merchantHub.com</a>
          </p>
          <p className="text-gray-700 mt-2">
            Visit our <a href="https://docs.merchantHub.com" target="_blank" className="text-blue-500 hover:underline">Documentation</a> for more details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}