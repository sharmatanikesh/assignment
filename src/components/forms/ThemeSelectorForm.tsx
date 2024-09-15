'use client';

import React, { useState } from 'react';
import { ColorPicker } from '../../lib/ColorPicker';

type ThemeProperty = 'Background' | 'Cards' | 'Accent';

interface ThemeColors {
  Background: string;
  Cards: string;
  Accent: string;
}


export default function ThemeSelector() {
  const [theme, setTheme] = useState<ThemeColors>({
    Background: '#FFFFFF',
    Cards: '#000000',
    Accent: '#FFA500',
  });

  const handleColorChange = (property: ThemeProperty, color: string) => {
    setTheme(prev => ({ ...prev, [property]: color }));
    
  };

  const colorOptions: Record<ThemeProperty, string[]> = {
    Background: ['#FFFFFF', '#F3F3F3', '#E5E5E5', '#000000'],
    Cards: ['#FFFFFF', '#000000'],
    Accent: ['#FFA500'],
  };

  return (
    <div className="  flex items-center justify-center ">
      <div className="bg-white rounded-lg  p-6 w-full max-w-sm">
       
        <div className="space-y-4">
          {(Object.keys(theme) as ThemeProperty[]).map((property) => (
            <div key={property} className="flex items-center justify-between">
              <span className="text-gray-700">{property}</span>
              <div className="flex space-x-2">
                {colorOptions[property].map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 ${
                      theme[property] === color ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(property, color)}
                  />
                ))}
                <ColorPicker
                  className="w-6 h-6 rounded-full border-2 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 border-gray-300"
                  value={theme[property]}
                  onChange={(color) => handleColorChange(property, color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}