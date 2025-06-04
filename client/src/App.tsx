
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import type { SpeedTestExecution } from '../../server/src/schema';

function App() {
  const [currentTest, setCurrentTest] = useState<SpeedTestExecution | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunSpeedTest = async () => {
    setIsRunning(true);
    try {
      const result = await trpc.runSpeedTest.mutate();
      setCurrentTest(result);
    } catch (error) {
      console.error('Failed to run speed test:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">🚀 Speed Test</h1>
          <p className="text-gray-600">Test your internet connection speed</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Internet Speed Test</CardTitle>
            <CardDescription>
              Click the button below to test your connection speed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleRunSpeedTest} 
              disabled={isRunning}
              className="w-full text-lg py-3"
            >
              {isRunning ? '⏳ Testing...' : '🎯 Run Speed Test'}
            </Button>

            {currentTest && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-center text-gray-800">Current Results</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-2xl">⬇️</span>
                      <span className="text-sm font-medium text-gray-600">Download</span>
                      <span className="text-2xl font-bold text-green-600">
                        {currentTest.download_speed.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500">Mbps</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-2xl">⬆️</span>
                      <span className="text-sm font-medium text-gray-600">Upload</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {currentTest.upload_speed.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500">Mbps</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!currentTest && !isRunning && (
              <div className="text-center text-gray-500 py-8">
                <span className="text-4xl mb-2 block">📶</span>
                <p>No test results yet</p>
                <p className="text-sm">Run a speed test to see your results</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>Speed test results are simulated for demonstration purposes</p>
        </div>
      </div>
    </div>
  );
}

export default App;
