import Icon from 'components/AppIcon';
import { PermissionToggleProps } from '../types';

const permissionConfig = [
  {
    key: 'location' as const,
    icon: 'MapPin',
    title: 'Location Access',
    description: 'Automatically detect your timezone and show local time',
    warningText: 'Required for automatic timezone detection',
  },
  {
    key: 'notifications' as const,
    icon: 'Bell',
    title: 'Notifications',
    description: 'Receive alerts for timezone changes and updates',
    warningText: 'Enable to receive important time zone notifications',
  },
  {
    key: 'offlineStorage' as const,
    icon: 'HardDrive',
    title: 'Offline Storage',
    description: 'Store timezone data locally for offline access',
    warningText: 'Required for offline functionality',
  },
];

const PermissionsPanel = ({ permissions, onPermissionChange }: PermissionToggleProps) => {
  const handlePermissionRequest = async (permission: keyof typeof permissions) => {
    try {
      if (permission === 'location') {
        const result = await navigator.geolocation.getCurrentPosition(
          () => onPermissionChange(permission, true),
          () => onPermissionChange(permission, false)
        );
      } else if (permission === 'notifications') {
        const result = await Notification.requestPermission();
        onPermissionChange(permission, result === 'granted');
      } else {
        onPermissionChange(permission, !permissions[permission]);
      }
    } catch (error) {
      console.error(`Error requesting ${permission} permission:`, error);
      onPermissionChange(permission, false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Shield" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Manage app permissions for enhanced functionality
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {permissionConfig.map((config) => {
          const isEnabled = permissions[config.key];
          
          return (
            <div
              key={config.key}
              className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    isEnabled ? 'bg-success/10' : 'bg-muted'
                  }`}
                >
                  <Icon
                    name={config.icon as any}
                    size={20}
                    className={isEnabled ? 'text-success' : 'text-muted-foreground'}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{config.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                  {!isEnabled && (
                    <p className="text-xs text-warning mt-1">
                      {config.warningText}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handlePermissionRequest(config.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isEnabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsPanel;