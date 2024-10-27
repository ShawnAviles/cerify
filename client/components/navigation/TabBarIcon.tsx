import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

type IconFamilies = 'FontAwesome5' | 'Ionicons';

interface TabBarIconProps {
  name: ComponentProps<typeof FontAwesome5>['name'] | ComponentProps<typeof Ionicons>['name'];
  iconFamily: IconFamilies;
  color?: string;
  size?: number;
  style?: any;
}

export function TabBarIcon({ iconFamily, name, color, size = 28, style }: TabBarIconProps) {
  if (iconFamily === 'FontAwesome5') {
    return <FontAwesome5 name={name as ComponentProps<typeof FontAwesome5>['name']} size={size} color={color} style={style} />;
  } else if (iconFamily === 'Ionicons') {
    return <Ionicons name={name as ComponentProps<typeof Ionicons>['name']} size={size} color={color} style={style} />;
  }
  
  return null;
}
