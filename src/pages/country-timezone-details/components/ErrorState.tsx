import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/world-clock-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16 lg:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mx-auto mb-6">
            <Icon name="AlertTriangle" size={32} className="text-error" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Unable to Load Timezone Data
          </h1>
          
          <p className="text-muted-foreground mb-2">
            We encountered an error while fetching the timezone information:
          </p>
          
          <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-error font-medium">
              {error}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                onClick={onRetry}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Try Again
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBackToDashboard}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Dashboard
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Troubleshooting Tips:
              </h3>
              <div className="text-left space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <Icon name="Wifi" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Check your internet connection</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="RefreshCw" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Refresh the page or try again in a few moments</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="WifiOff" size={16} className="mt-0.5 flex-shrink-0" />
                  <span>If offline, cached data may be limited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;