import React from 'react';
import { Theme } from '../types';
import { THEME_CONFIGS } from '../config/theme.config';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
        style={{ color: 'var(--color-text)' }}
        title="Change Theme"
      >
        <Palette size={20} />
        <span className="hidden sm:inline text-sm font-medium">
          {THEME_CONFIGS[currentTheme].displayName}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 overflow-hidden"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-textDark)'
              }}
            >
              <p className="text-sm font-semibold">Select Color Theme</p>
            </div>

            <div className="py-2">
              {Object.values(Theme).map((theme) => {
                const config = THEME_CONFIGS[theme];
                const isSelected = currentTheme === theme;

                return (
                  <button
                    key={theme}
                    onClick={() => {
                      onThemeChange(theme);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors"
                    style={{
                      backgroundColor: isSelected ? 'var(--color-primaryLight)' : 'transparent',
                      color: 'var(--color-text)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--color-backgroundAlt)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {/* Color Preview */}
                    <div className="flex gap-1">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{
                          backgroundColor: config.colors.primary,
                          borderColor: config.colors.border
                        }}
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{
                          backgroundColor: config.colors.accent,
                          borderColor: config.colors.border
                        }}
                      />
                    </div>

                    {/* Theme Name */}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{config.displayName}</p>
                      <p
                        className="text-xs"
                        style={{ color: 'var(--color-textLight)' }}
                      >
                        {theme === Theme.WARM_BEIGE && 'Warm & Cozy'}
                        {theme === Theme.LIGHT_SAND && 'Natural & Earthy'}
                        {theme === Theme.OFF_WHITE && 'Clean & Minimal'}
                      </p>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className="px-4 py-3 border-t text-xs"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-textLight)',
                backgroundColor: 'var(--color-backgroundAlt)'
              }}
            >
              <p>Theme preference is saved automatically</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
