import React, { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectClasses {
  container?: string;
  label?: string;
  trigger?: string;
  triggerText?: string;
  icon?: string;
  dropdown?: string;
  searchWrapper?: string;
  searchInput?: string;
  option?: string;
  optionSelected?: string;
  optionDisabled?: string;
  description?: string;
  error?: string;
}

export interface SelectProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "onChange" | "defaultValue"
  > {
  options?: SelectOption[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  description?: string;
  error?: string;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  name?: string;
  onChange?: (value: any) => void;
  onOpenChange?: (open: boolean) => void;
  classes?: SelectClasses;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      options = [],
      value,
      defaultValue,
      placeholder = "Select an option",
      multiple = false,
      disabled = false,
      required = false,
      label,
      description,
      error,
      searchable = false,
      clearable = false,
      loading = false,
      id,
      name,
      onChange,
      onOpenChange,
      classes = {},
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;

    const filteredOptions =
      searchable && searchTerm
        ? options.filter(
            (opt) =>
              opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (opt.value &&
                opt.value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
          )
        : options;

    const getSelectedDisplay = (): string => {
      if (!value) return placeholder;
      if (multiple) {
        const arr = Array.isArray(value) ? value : [value];
        const selected = options.filter((opt) => arr.includes(opt.value));
        if (selected.length === 0) return placeholder;
        if (selected.length === 1) return selected[0].label;
        return `${selected.length} items selected`;
      }
      const selected = options.find((opt) => opt.value === value);
      return selected ? selected.label : placeholder;
    };

    const handleToggle = () => {
      if (disabled) return;
      const next = !isOpen;
      setIsOpen(next);
      onOpenChange?.(next);
      if (!next) setSearchTerm("");
    };

    const handleOptionSelect = (option: SelectOption) => {
      if (multiple) {
        const current = Array.isArray(value) ? value : [];
        const updated = current.includes(option.value)
          ? current.filter((v) => v !== option.value)
          : [...current, option.value];
        onChange?.(updated);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : "");
    };

    const isSelected = (optionValue: string | number) =>
      multiple
        ? Array.isArray(value) && value.includes(optionValue)
        : value === optionValue;

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : !!value;

    return (
      <div className={cn("relative w-full", classes.container, className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block mb-1 text-sm font-medium text-foreground",
              error && "text-destructive",
              classes.label
            )}
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        {/* Trigger Button */}
        <button
          ref={ref}
          id={selectId}
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn(
            "relative flex w-full items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-sm transition-all duration-150 hover:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-destructive focus:ring-destructive",
            classes.trigger
          )}
          {...props}
        >
          <span
            className={cn(
              "truncate text-left",
              !hasValue && "text-muted-foreground",
              classes.triggerText
            )}
          >
            {getSelectedDisplay()}
          </span>

          <div className="flex items-center gap-1">
            {clearable && hasValue && !loading && (
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
                onClick={handleClear}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
            {loading ? (
              <svg
                className={cn("animate-spin h-4 w-4 text-muted-foreground")}
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                />
              </svg>
            ) : (
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-150",
                  isOpen && "rotate-180",
                  classes.icon
                )}
              />
            )}
          </div>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover shadow-lg animate-in fade-in slide-in-from-top-1",
              classes.dropdown
            )}
          >
            {searchable && (
              <div
                className={cn(
                  "p-2 border-b border-border bg-surface/50 backdrop-blur-sm",
                  classes.searchWrapper
                )}
              >
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn("pl-8", classes.searchInput)}
                  />
                </div>
              </div>
            )}

            <div className="p-1 max-h-60 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  {searchTerm ? "No results found" : "No options available"}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => !option.disabled && handleOptionSelect(option)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-md transition-colors",
                      option.disabled
                        ? cn("opacity-50 cursor-not-allowed", classes.optionDisabled)
                        : cn(
                            "hover:bg-accent hover:text-accent-foreground",
                            isSelected(option.value)
                              ? cn("bg-primary text-primary-foreground", classes.optionSelected)
                              : cn("text-foreground", classes.option)
                          )
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="truncate">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {isSelected(option.value) && <Check className="h-4 w-4" />}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {description && !error && (
          <p className={cn("text-xs text-muted-foreground mt-1", classes.description)}>
            {description}
          </p>
        )}
        {error && (
          <p className={cn("text-xs text-destructive mt-1", classes.error)}>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
