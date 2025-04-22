import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

/**
 * BreadcrumbNav Component
 * 
 * A reusable breadcrumb navigation component that automatically
 * generates breadcrumb items based on the current route path or
 * from provided custom items.
 * 
 * @param {Object} props
 * @param {Array} props.items - Custom breadcrumb items to display instead of automatic ones
 *                             Each item should have a label and path (optional for current page)
 * @param {Object} props.styling - Custom styling options for the breadcrumb
 */
function BreadcrumbNav({ items, styling = {} }) {
  const location = useLocation();
  
  // Determine breadcrumb items (either provided or generated from path)
  const breadcrumbItems = items || generateBreadcrumbItems(location.pathname);
  
  return (
    <Breadcrumb
      spacing="8px"
      separator={<FiChevronRight color="gray.500" />}
      mb={6}
      {...styling}
    >
      {/* Home/Dashboard is always the first item */}
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/dashboard">
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      
      {/* Render other items based on the path or provided items */}
      {breadcrumbItems.map((item, index) => (
        <BreadcrumbItem 
          key={index} 
          isCurrentPage={index === breadcrumbItems.length - 1}
        >
          {item.path && index !== breadcrumbItems.length - 1 ? (
            <BreadcrumbLink as={Link} to={item.path}>
              {item.label}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink>{item.label}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

/**
 * Helper function to generate breadcrumb items from a route path
 * 
 * @param {string} path - Current route path
 * @returns {Array} Array of breadcrumb items with label and path
 */
function generateBreadcrumbItems(path) {
  // Remove leading slash and split by '/'
  const pathSegments = path.replace(/^\/+/, '').split('/');
  const breadcrumbItems = [];
  
  // Skip the first segment if it's 'dashboard' (already added as default first item)
  const startIndex = pathSegments[0] === 'dashboard' ? 1 : 0;
  
  // Build breadcrumb items based on path segments
  for (let i = startIndex; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    
    // Skip if segment is empty
    if (!segment) continue;
    
    // Create path for this breadcrumb item
    const itemPath = i === pathSegments.length - 1 
      ? null 
      : '/' + pathSegments.slice(0, i + 1).join('/');
    
    // Format label (capitalize and replace hyphens with spaces)
    let label = segment.replace(/-/g, ' ');
    
    // Special case for 'view' or 'edit' with ID
    if ((segment === 'view' || segment === 'edit') && i < pathSegments.length - 1) {
      const nextSegment = pathSegments[i + 1];
      label = `${segment.charAt(0).toUpperCase() + segment.slice(1)} Details`;
      // Skip the ID segment in the next iteration
      i++;
    } else {
      // Handle specific routes with custom labels
      switch(segment) {
        case 'users':
          label = 'Users';
          break;
        case 'company-return-filing':
          label = 'Company Return Filing';
          break;
        case 'sole-proprietor':
          label = 'Sole Proprietor';
          break;
        case 'ntn-modification':
          label = 'Addition / deletion of Business to NTN';
          break;
        case 'private-limited':
          label = 'Private Limited';
          break;
        case 'business':
          label = 'Business Registration';
          break;
        default:
          // Capitalize the first letter of each word
          label = label
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }
    }
    
    breadcrumbItems.push({ label, path: itemPath });
  }
  
  return breadcrumbItems;
}

export default BreadcrumbNav; 