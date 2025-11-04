import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
}

interface BreadcrumbNavigationProps {
  customItems?: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation = ({ customItems, className = '' }: BreadcrumbNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getDefaultBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/world-clock-dashboard', icon: 'Home' }
    ];

    switch (location.pathname) {
      case '/country-timezone-details':
        items.push({ 
          label: 'Country Details', 
          path: '/country-timezone-details',
          icon: 'MapPin'
        });
        break;
      case '/offline-mode':
        items.push({ 
          label: 'Offline Mode', 
          path: '/offline-mode',
          icon: 'WifiOff'
        });
        break;
    }

    return items;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();
  
  // Don't show breadcrumbs on dashboard
  if (location.pathname === '/world-clock-dashboard' && !customItems) {
    return null;
  }

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isClickable = !isLast && item.path !== location.pathname;

        return (
          <React.Fragment key={item.path}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground/60" 
              />
            )}
            
            <div className="flex items-center space-x-1.5">
              {item.icon && (
                <Icon 
                  name={item.icon} 
                  size={14} 
                  className={isLast ? 'text-foreground' : 'text-muted-foreground'} 
                />
              )}
              
              {isClickable ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleItemClick(item.path)}
                  className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {item.label}
                </Button>
              ) : (
                <span 
                  className={`${
                    isLast 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BreadcrumbNavigation;